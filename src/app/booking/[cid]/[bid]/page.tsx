"use client";
import { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { useSession } from "next-auth/react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import { CarItem, BookingItem } from "interfaces";
import DateReserve from "@/components/DateReserve";
import dayjs from "dayjs";
import getCar from "@/libs/getCar"; // Function to fetch car details
import getRent from "@/libs/getRent"; // Function to fetch rent details
import getRentsForCar from "@/libs/getRentsForCar"; // Function to fetch rent data for a car
import { useRouter } from "next/navigation";
import changeRentDate from "@/libs/changeRentDate";

export default function ChangeDatePage({ params }: { params: { cid: string, bid: string } }) {
  const router = useRouter();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null);
  const [formStartDate, setFormStartDate] = useState<dayjs.Dayjs | null>(null);
  const [formEndDate, setFormEndDate] = useState<dayjs.Dayjs | null>(null);
  const [rentedDates, setRentedDates] = useState<Date[]>([]); // Occupied dates
  const [previousRentDates, setPreviousRentDates] = useState<Date[]>([]); // Previous rent dates
  const [errorMessage, setErrorMessage] = useState("");
  const [renderErrorMessage, setRenderErrorMessage] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carDetail = await getCar(params.cid);
        setCarItem(carDetail.data);
      } catch (error) {
        console.error("Failed to fetch car details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRentsForCar = async () => {
      try {
        if (!session?.user.token) return;
        const rentJson = await getRentsForCar(session?.user.token, params.cid);
        const unavailableDates = rentJson.data
          .map((rentItem: BookingItem) => {
            const startDate = new Date(rentItem.startDate);
            const endDate = new Date(rentItem.endDate);
            let currentDate = startDate;
            const dates = [];
            while (currentDate <= endDate) {
              dates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            return dates;
          })
          .flat();
        setRentedDates(unavailableDates);
      } catch (error) {
        console.error("Failed to fetch rents:", error);
      }
    };

    const fetchRentData = async () => {
      try {
        if (!session?.user.token) return;
        const rentData = await getRent(session.user.token, params.bid);
        console.log(rentData.success)
        if(!rentData.success||params.cid!==rentData.data.car_info._id){
          setRenderErrorMessage("Incorrect URL/Access Denied");
          return;
        }
        if(rentData.data.status==='finished'){
          setRenderErrorMessage("Do not Change Date of the Finished Renting");
          return;
        }
        if(session.user.User_info.role!=='admin'&&rentData.data.user_info._id!==session.user.User_info._id){
          setRenderErrorMessage("Access Denied, You cannot edit this renting");
          return;
        }
        if (rentData.success && rentData.data) {
          const start = new Date(rentData.data.startDate);
          const end = new Date(rentData.data.endDate);
          let currentDate = start;
          const previousDates = [];
          while (currentDate <= end) {
            previousDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
          setPreviousRentDates(previousDates);
          setStartDate(dayjs(rentData.data.startDate));
          setEndDate(dayjs(rentData.data.endDate));
        }
      } catch (error) {
        console.error("Failed to fetch rent data:", error);
      }
    };

    fetchCar();
    fetchRentsForCar();
    fetchRentData();
  }, [params.cid, params.bid, session?.user.token]);

  const isDateUnavailable = (date: Date) => {
    return rentedDates.some((rentedDate) => rentedDate.toDateString() === date.toDateString());
  };

  const isPreviousRentDate = (date: Date) => {
    return previousRentDates.some((prevDate) => prevDate.toDateString() === date.toDateString());
  };

  async function handleUpdateRent(startDate: string, endDate: string) {
    if (!session) return;
    console.log(startDate);
    console.log(endDate);
    if(startDate==='Invalid Date'||endDate==='Invalid Date'){
      setErrorMessage('You must fill a value for start date and end date');
      console.log("should log")
      return;
    }
    const res = await changeRentDate(
      session.user.token,
      params.bid,
      startDate,
      endDate
    );
    if (res.success) {
      alert("Booking successfully updated");
      router.push("/booking");
    } else {
      setErrorMessage(res.message);
    }
  }

  if (loading) return <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">Loading...</div>;
  if (!carItem) return <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">Car not found</div>;
  if (renderErrorMessage!=="") return <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">{renderErrorMessage}</div>;

  return (
    <main className="min-h-screen p-6 flex flex-row items-start gap-6">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-xl overflow-hidden">
        <Image
          src={carItem.picture}
          alt="Car"
          width={600}
          height={400}
          className="w-full object-cover rounded-t-xl"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{carItem.name}</h1>
          <p className="text-gray-600 mb-1">Model: {carItem.model}</p>
          <p className="text-gray-600 mb-1">Seats: {carItem.capacity}</p>
          <p className="text-gray-600 mb-1">Provider: {carItem.provider_info.name}</p>
          <p className="text-gray-600 mb-1">Car ID: {carItem._id}</p>
          <p className="text-xl font-semibold text-blue-600 mt-3">${carItem.pricePerDay}/day</p>
        </div>
      </div>

      {session ? (
        <div className="bg-white shadow-md rounded-xl p-2 w-full max-w-2xl">
          <h2 className="text-4xl font-bold my-4 text-[#2d336b] text-center">
            Choose Rental Dates
          </h2>
          <h2 className="text-sm font-semibold mb-4 text-gray-800 text-center">
            Check The Calendar For This Car's Available Date. (Underlined Date Means Occupied, Green Means Previous Booking)
          </h2>
          <div className="flex justify-center">
            <ReactCalendar
              className="text-black"
              tileClassName={({ date }) => {
                if (isPreviousRentDate(date)) return "green-border";
                if (isDateUnavailable(date)) return "red-border";
                return "";
              }}
              tileContent={({ date }) => {
                if (isPreviousRentDate(date)) {
                  return <div style={{ border: '2px solid green' }}></div>;
                }
                if (isDateUnavailable(date)) {
                  return <div style={{ border: '2px solid red' }}></div>;
                }
              }}
            />
          </div>

          <div className="text-md text-left text-gray-800 m-3">Enter Renting Start Date</div>
          <DateReserve onDateChange={(value: dayjs.Dayjs) => setFormStartDate(value)} />
          <div className="text-md text-left text-gray-800 m-3">Enter Renting End Date</div>
          <DateReserve onDateChange={(value: dayjs.Dayjs) => setFormEndDate(value)} />

          <button
            onClick={() => {
              handleUpdateRent(
                dayjs(formStartDate).format("YYYY-MM-DDTHH:mm:ss[+00:00]").toString(),
                dayjs(formEndDate).format("YYYY-MM-DDTHH:mm:ss[+00:00]").toString()
              );
            }}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Update Booking
          </button>
          {errorMessage && <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>}
        </div>
      ) : null}
    </main>
  );
}
