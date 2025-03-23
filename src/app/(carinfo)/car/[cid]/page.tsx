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
import LocationDateReserve from "@/components/DateReserve";
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

  async function handleCreateBooking(startDate: string, endDate: string) {
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
    <main className="text-center p-8 min-h-screen flex flex-col items-center font-[Verdana,Geneva,Tahoma,sans-serif]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {carItem.name}
      </h1>
      <div className="flex flex-col md:flex-row bg-[#A9B5DF] shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <Image
          src={carItem.picture}
          alt="Car Image"
          width={500}
          height={300}
          className="rounded-lg w-full md:w-1/2 object-cover"
        />
        <div className="md:ml-6 mt-4 md:mt-0 flex flex-col justify-between w-full">
          <div>
            <div className="text-lg font-medium text-left text-[#161179]">
              {carItem.model}
            </div>
            <div className="text-md text-gray-600 text-left">
              VIN: {carItem.vin_plate}
            </div>
            <div className="text-md text-gray-600 text-left">
              Provider: {carItem.provider_info.name}
            </div>
            <div className="text-md text-gray-600 text-left">
              Capacity: {carItem.capacity} seats
            </div>
            <div className="text-md text-gray-600 text-left font-semibold">
              Daily Rental Rate: ${carItem.pricePerDay}
            </div>
          </div>
        </div>
      </div>
      {session ? (
        <>
          <div className="mt-6 w-full max-w-md mx-auto">
            <ReactCalendar
              tileClassName={({ date }) => {
                return isDateUnavailable(date) ? "red-border" : "";
              }}
              tileContent={({ date }) => {
                if (isDateUnavailable(date)) {
                  return <div style={{ border: "2px solid red" }}></div>;
                }
              }}
            />
          </div>
          <div className="text-md text-left text-gray-600">
            Renting Start Date
          </div>
          <LocationDateReserve
            onDateChange={(value: Dayjs) => {
              setStartDate(value);
              console.log(
                dayjs(value).format("YYYY-MM-DDTHH:mm:ss[+00:00]").toString()
              );
            }}
          />
          <div className="text-md text-left text-gray-600">
            Renting End Date
          </div>
          <LocationDateReserve
            onDateChange={(value: Dayjs) => {
              setEndDate(value);
            }}
          />
          <button
            onClick={() => {
              handleCreateBooking(
                dayjs(startDate)
                  .format("YYYY-MM-DDTHH:mm:ss[+00:00]")
                  .toString(),
                dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss[+00:00]").toString()
              );
            }}
            className="relative inline-block p-px font-semibold leading-6 text-white shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
            <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1">
                  Reserve This Car
                </span>
                <svg
                  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                  data-slot="icon"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </span>
          </button>
          {errorMessage && <div>{errorMessage}</div>}
        </>
      ) : null}
    </main>
  );
}
