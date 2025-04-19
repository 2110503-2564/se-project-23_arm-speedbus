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
import "./calendar.css"

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

  if (loading)
    return (
      <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Loading...
      </div>
    );
  if (!carItem)
    return (
      <div className="text-center text-xl text-black-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Car not found
      </div>
    );

  return (
    /* layout ใหม่ตามภาพ UI */

    <main className="min-h-screen px-[5vw] py-10 font-robotoMono text-black flex flex-col gap-12 mt-10">
      {/* Section: Title and Main Content */}
      <div className="flex flex-row items-center gap-20">
        {/* รูป + ชื่อรถ */}
        <div className="flex flex-col items-start ml-20">
          <h1 className="text-[45px] tracking-wider mb-4">{carItem.name}</h1>
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

        {/* Calendar */}
        <div className="flex items-center justify-center mt-12 mx-auto" style={{ height: "468px" }}>
          <ReactCalendar
            className="text-black react-calendar"
            tileClassName={({ date }) =>
              isDateUnavailable(date) ? "red-underline" : ""
            }
          />
        </div>
      </div>
            

      <hr className="border-t border-black/40" />
        
      
      {/* Description and Form */}
      <div className="flex flex-row ml-20 gap-12 min-h-[320px]">
        {/* Description: ครึ่งซ้าย */}
        <div className="w-1/2 max-w-md h-full ">
          <h2 className="text-[45px] font-bold tracking-wide mb-2 font-robotoMono">DESCRIPTION</h2>
          <p className="text-sm leading-5 text-black/80 whitespace-pre-line font-robotoMono">
            {carItem.description}
          </p>
          <p className="mt-4 text-md font-bold font-robotoMono">
            Total: <span className="text-black text-xl font-robotoMono">${carItem.pricePerDay}</span>
          </p>
        </div>

        {/* Form: ครึ่งขวา */}
        <div className="w-1/2 flex items-center justify-center h-full mx-auto">
          {session ? (
            <div className="flex flex-col items-center w-full max-w-sm font-robotoMono">
              <DateReserve
                value={startDate}
                onDateChange={(value: Dayjs | null) => setStartDate(value)}
                label="Check-In Date"
              />
              <DateReserve
                value={endDate}
                onDateChange={(value: Dayjs | null) => setEndDate(value)}
                label="Check-Out Date"
              />
              <button
                onClick={() => {
                  handleCreateRent(
                    dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss[+00:00]").toString(),
                    dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss[+00:00]").toString()
                  );
                }}
                className="mt-3 border border-black rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition font-robotoMono"
              >
                Book
              </button>
              {errorMessage && (
                <p className="text-red-500 mt-2 text-sm text-center">{errorMessage}</p>
              )}
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-xl p-2 w-full max-w-2xl font-robotoMono">
              <Link href="/api/auth/signin">
                <h2 className="text-xl my-4 text-[#2d336b] text-center hover:text-[#7886c7] transition font-robotoMono">
                  Sign in to book your rent
                </h2>
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>

  );
}
