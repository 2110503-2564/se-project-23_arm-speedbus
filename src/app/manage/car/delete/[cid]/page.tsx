'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import getCar from "@/libs/getCar";
import deleteCar from "@/libs/deleteCar"; // Import the deleteCar function
import Link from "next/link";
import { CarItem } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { revalidateTag } from "next/cache";

export default function CarCidDeletePage({
  params,
}: {
  params: { cid: string };
}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [carItem, setCarItem] = useState<CarItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null); // Error state for deletion
  if(!session||session.user.User_info.role!=='admin'){
    return (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
          You are not an administrator. Access denied.
        </div>
    )
  }
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const carDetail = await getCar(params.cid);
        setCarItem(carDetail.data);
      } catch (err) {
        setError("Failed to fetch car details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [params.cid]);

  const handleDeleteCar = async () => {
    try {
        if (!session?.user.token) {
            return;
        }
      await deleteCar(session.user.token,params.cid);  // Call the deleteCar function
      alert("Deleted car successfully")
      router.push("/car");
    } catch (err) {
      setDeleteError("Failed to delete the car.");  // Handle deletion error
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!carItem) {
    return <div>No car details found.</div>;
  }
  return (
    <main className="text-center p-8 min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{carItem.name}</h1>
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
            <div className="text-lg font-medium text-gray-700 text-left">{carItem.model}</div>
            <div className="text-md text-gray-600 text-left">VIN: {carItem.vin_plate}</div>
            <div className="text-md text-gray-600 text-left">Provider: {carItem.provider_info.name}</div>
            <div className="text-md text-gray-600 text-left">Capacity: {carItem.capacity} seats</div>
            <div className="text-md text-gray-600 text-left font-semibold">
              Daily Rental Rate: ${carItem.pricePerDay}
            </div>
          </div>
          {deleteError && <div className="text-red-600">{deleteError}</div>}  {/* Show error if deletion fails */}
          <button
            onClick={handleDeleteCar}
            className="mt-4 relative inline-block p-px font-semibold leading-6 text-white shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

            <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
              <div className="relative z-10 flex items-center space-x-2">
                <span className="transition-all duration-500 group-hover:translate-x-1">
                  Delete Car
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
        </div>
      </div>
    </main>
  );
}
