"use client";
import { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import getCar from "@/libs/getCar";
import getRentsForCar from "@/libs/getRentsForCar";
import createBooking from "@/libs/createBooking";
import { CarItem, BookingItem } from "interfaces";
import dayjs, { Dayjs } from "dayjs";

export default function CarDetailPage({ params }: { params: { cid: string } }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [rentedDates, setRentedDates] = useState<Date[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const carDetail = await getCar(params.cid);
        setCarItem(carDetail.data);

        if (session?.user.token) {
          const rentJson = await getRentsForCar(session.user.token, params.cid);
          setRentedDates(
            rentJson.data.flatMap((rent: BookingItem) => {
              let current = new Date(rent.startDate);
              const end = new Date(rent.endDate);
              const dates = [];
              while (current <= end) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
              }
              return dates;
            })
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.cid, session]);

  const isDateUnavailable = (date: Date) =>
    rentedDates.some(
      (rentedDate) => rentedDate.toDateString() === date.toDateString()
    );

  async function handleCreateBooking() {
    if (!session || !startDate || !endDate) {
      setErrorMessage("Please select both start and end dates.");
      return;
    }

    if (dayjs(startDate).isAfter(dayjs(endDate))) {
      setErrorMessage("End date must be after start date.");
      return;
    }

    const res = await createBooking(
      session.user.token,
      params.cid,
      session.user.User_info._id,
      dayjs(startDate).toISOString(),
      dayjs(endDate).toISOString()
    );

    if (res.success) {
      alert("Booking Successful!");
      router.push("/booking");
    } else {
      setErrorMessage(res.message);
    }
  }

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (!carItem)
    return <p className="text-center py-8 text-red-500">Car not found.</p>;

  return (
    <main className="min-h-screen p-6 flex flex-row items-start bg-gray-100 gap-6">
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
          <p className="text-xl font-semibold text-blue-600 mt-3">
            ${carItem.pricePerDay}/day
          </p>
        </div>
      </div>

      {session && (
        <div className="bg-white shadow-md rounded-xl p-2 w-full max-w-2xl my-4 ">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Choose Rental Dates
          </h2>
          <div className="flex justify-center">
            {" "}
            <ReactCalendar
              tileClassName={({ date }) =>
                isDateUnavailable(date)
                  ? "bg-red-200 text-red-800 rounded-lg p-1"
                  : ""
              }
              className="border rounded-lg w-full max-w-md"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Start Date
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded-md text-sm"
              onChange={(e) => setStartDate(dayjs(e.target.value))}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              End Date
            </label>
            <input
              type="date"
              className="w-full border p-2 rounded-md text-sm"
              onChange={(e) => setEndDate(dayjs(e.target.value))}
            />
          </div>
          <button
            onClick={handleCreateBooking}
            className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            Reserve Now
          </button>
          {errorMessage && (
            <p className="text-red-500 mt-2 text-sm">{errorMessage}</p>
          )}
        </div>
      )}
    </main>
  );
}
