"use client";
import { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { useSession } from "next-auth/react";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";
import Link from "next/link";
import getCar from "@/libs/getCar"; // Assuming this is a function to fetch car details
import getRentsForCar from "@/libs/getRentsForCar"; // Assuming this is a function to fetch rent data for a car
import { CarItem, BookingItem } from "interfaces";
import DateReserve from "@/components/DateReserve";
import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import createRent from "@/libs/createRent";
import { useRouter } from "next/navigation";

export default function CarDetailPage({ params }: { params: { cid: string } }) {
  const router = useRouter();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [rentedDates, setRentedDates] = useState<Date[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
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
        const rentJson = await getRentsForCar(session?.user.token, params.cid); // Fetch rents for the car
        const unavailableDates = rentJson.data
          .map((rentItem: BookingItem) => {
            const startDate = new Date(rentItem.startDate);
            const endDate = new Date(rentItem.endDate);
            let currentDate = startDate;
            const dates = [];

            while (currentDate <= endDate) {
              dates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1); // Increment day by day
            }

            return dates;
          })
          .flat();

        setRentedDates(unavailableDates);
      } catch (error) {
        console.error("Failed to fetch rents:", error);
      }
    };

    fetchCar();
    fetchRentsForCar();
  }, [params.cid]);

  const isDateUnavailable = (date: Date) => {
    return rentedDates.some(
      (rentedDate) => rentedDate.toDateString() === date.toDateString()
    );
  };

  async function handleCreateRent(startDate: string, endDate: string) {
    if (!session) return;
    const res = await createRent(
      session.user.token,
      params.cid,
      session.user.User_info._id,
      startDate,
      endDate
    );
    if (res.success) {
      alert("Create Booking Successfully");
      router.push("/booking");
    } else {
      setErrorMessage(res.message);
    }
  }

  if (loading) return <p className="text-center p-8">Loading...</p>;
  if (!carItem)
    return <p className="text-center p-8 text-red-500">Car not found.</p>;

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {carItem.name}
          </h1>
          <p className="text-gray-600 mb-1">Model: {carItem.model}</p>
          <p className="text-gray-600 mb-1">Seats: {carItem.capacity}</p>
          <p className="text-gray-600 mb-1">
            Provider: {carItem.provider_info.name}
          </p>
          <p className="text-xl font-semibold text-blue-600 mt-3">
            ${carItem.pricePerDay}/day
          </p>
        </div>
      </div>
      {session ? (
        <div className="bg-white shadow-md rounded-xl p-2 w-full max-w-2xl">
          <h2 className="text-4xl font-bold my-4 text-[#2d336b] text-center">
            Choose Rental Dates
          </h2>
          <h2 className="text-sm font-semibold mb-4 text-gray-800 text-center">
            Check The Calendar For This Car's Available Date. (Underlined Date
            Means Occupied)
          </h2>
          <div className="flex justify-center">
            {" "}
            <ReactCalendar
              className={`text-black`}
              tileClassName={({ date }) => {
                return isDateUnavailable(date) ? "red-border " : "";
              }}
              tileContent={({ date }) => {
                if (isDateUnavailable(date)) {
                  return <div style={{ border: "2px solid red" }}></div>;
                }
              }}
            />
          </div>

          <div className="text-md text-left text-gray-800 m-3">
            Enter Renting Start Date
          </div>
          <DateReserve
            onDateChange={(value: Dayjs) => {
              setStartDate(value);
            }}
          />
          <div className="text-md text-left text-gray-800 m-3">
            Enter Renting End Date
          </div>
          <DateReserve
            onDateChange={(value: Dayjs) => {
              setEndDate(value);
            }}
          />
          <button
            onClick={() => {
              handleCreateRent(
                dayjs(startDate)
                  .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                  .toString(),
                dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss[+00:00]").toString()
              );
            }}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Reserve Now
          </button>
          {errorMessage && (
            <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
          )}
        </div>
      ) : null}
    </main>
  );
}
