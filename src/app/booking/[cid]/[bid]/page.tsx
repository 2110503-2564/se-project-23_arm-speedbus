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
import "./calendar.css";
import { set } from "mongoose";
import { FaCheck } from "react-icons/fa";

export default function ChangeDatePage({
  params,
}: {
  params: { cid: string; bid: string };
}) {
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

  const [totalPrice, setTotalPrice] = useState<number>(0);

  const [rentItem, setRentItem] = useState<BookingItem | null>(null);

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
        setRentItem(rentData.data);
        console.log(rentData.success);
        if (!rentData.success || params.cid !== rentData.data.car_info._id) {
          setRenderErrorMessage("Incorrect URL/Access Denied");
          return;
        }
        if (rentData.data.status === "Finished") {
          setRenderErrorMessage("Do not Change Date of the Finished Renting");
          return;
        }
        if (
          session.user.User_info.role !== "admin" &&
          rentData.data.user_info._id !== session.user.User_info._id
        ) {
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

  
  useEffect(() => {
    if (formStartDate && formEndDate && carItem) {
      const days = formEndDate.diff(formStartDate, "day") + 1;
      const price = days * carItem.pricePerDay;
      setTotalPrice(price > 0 ? price : 0);
    } else {
      setTotalPrice(rentItem ? rentItem.totalPrice : 0);
    }
  }, [formStartDate, formEndDate, carItem]);

  const isDateUnavailable = (date: Date) => {
    return rentedDates.some(
      (rentedDate) => rentedDate.toDateString() === date.toDateString()
    );
  };

  const isPreviousRentDate = (date: Date) => {
    return previousRentDates.some(
      (prevDate) => prevDate.toDateString() === date.toDateString()
    );
  };

  async function handleUpdateRent(startDate: string, endDate: string) {
    if (!session) return;
    console.log(startDate);
    console.log(endDate);
    if (startDate === "Invalid Date" || endDate === "Invalid Date") {
      setErrorMessage("You must fill a value for start date and end date");
      console.log("should log");
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

  if (loading)
    return (
      <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Loading...
      </div>
    );
  if (!carItem)
    return (
      <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Car not found
      </div>
    );
  if (renderErrorMessage !== "")
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        {renderErrorMessage}
      </div>
    );

  return (
    <main className="min-h-screen px-[5vw] py-10 font-robotoMono text-black flex flex-col gap-12 mt-10">
      <div className="flex flex-row items-center gap-20">
        <div className="flex flex-col items-start ml-20">
            <h1 className="text-[45px] tracking-wider mb-4 font-robotoMono">{carItem.name}</h1>
            <div className="w-[457px] h-[468px] bg-gray-200 overflow-hidden">
              <Image
                src={carItem.picture}
                alt="Car"
                width={457}
                height={468}
                className="object-cover w-full h-full"
              />
            </div>
        </div>
        <div className="flex flex-col items-center justify-center mx-auto">
          <h2 className="text-4xl font-bold my-4 text-black text-center font-robotoMono">
            Choose Rental Dates
          </h2>
          <h2 className="text-sm font-semibold mb-4 text-gray-800 text-center font-robotoMono">
            Check The Calendar For This Car's Available Date. (Underlined Date
            Means Occupied, Green Means Previous Booking)
          </h2>
            <ReactCalendar
              className="text-black react-calendar"
              tileClassName={({ date }) => {
                if (isPreviousRentDate(date)) return "green-underline";
                if (isDateUnavailable(date)) return "red-underline";
                return "";
              }}
            />
        </div>
      </div>
      <div className="flex flex-row ml-20 gap-12 min-h-[320px]">
      <div className="w-1/2 max-w-md h-full ">
          <h2 className="text-[45px]  tracking-wide mb-2 font-robotoMono">
            DESCRIPTION
          </h2>
          <p className="text-sm leading-5 text-light text-black/80 whitespace-pre-line font-robotoMono">
            {carItem.description}
          </p>
          <p className="mt-4 text-md font-bold font-robotoMono">
            Total:&nbsp;
            { rentItem ? (
                <>
                  <span className="text-gray-500 line-through text-xl mr-2">
                    ${totalPrice}
                  </span>
                  <span className="text-black font-normal text-2xl">
                  ${Math.max(totalPrice * (100 - rentItem.discount) / 100, totalPrice - rentItem.maxDiscount)}
                  </span>
                  <span className="text-sm text-gray-600 font-normal ml-2">
                    (${Math.max(carItem.pricePerDay * (100 - rentItem.discount) / 100, (totalPrice - rentItem.maxDiscount) / dayjs(rentItem.endDate).diff(startDate, "day") + 1).toFixed(2)}/day)
                  </span> 
                </>
              ) : (
                <>
                  <span className="text-black font-normal text-2xl">
                    ${totalPrice}
                  </span>
                  <span className="text-sm text-gray-600 font-normal ml-2">
                    (${carItem.pricePerDay}/day)
                  </span>
                </>
              )
            }
          </p>
        </div>
        <div className="w-1/2 flex items-center justify-center h-full mx-auto">
          {session ? (
            <div className="flex flex-col items-center w-full max-w-sm font-robotoMono">
              
              <DateReserve
                onDateChange={(value: dayjs.Dayjs | null) => setFormStartDate(value)} label="Check-In Date"
              />
              <DateReserve
                onDateChange={(value: dayjs.Dayjs | null) => setFormEndDate(value)} label="Check-Out Date"
              />
              <div>
                {
                  rentItem?.couponName === "No coupon applied" ? (
                    <div className="mt-3 w-[250px] border border-black text-Black rounded-full py-1.5 px-6
                      text-center text-sm font-robotoMono flex flex-row items-center justify-center gap-4">
                      No coupon applied
                    </div>
                    ) : (
                    <div className="mt-3 w-[275px] border border-black text-Black rounded-full py-1.5 px-6
                      text-center text-sm font-robotoMono flex flex-row items-center justify-center gap-4">
                      using {rentItem?.couponName} <FaCheck className="text-sm"/>
                    </div>
                  )
                }
              </div>

              <button
                onClick={() => {
                  handleUpdateRent(
                    dayjs(formStartDate)
                      .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                      .toString(),
                    dayjs(formEndDate)
                      .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                      .toString()
                  );
                }}
                className="mt-3 border border-black rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition font-robotoMono"
              >
                Update Booking
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
