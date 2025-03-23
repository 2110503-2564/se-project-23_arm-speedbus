import Image from "next/image";
import getCar from "@/libs/getCar";
import Link from "next/link";
import { CarItem, CarJson } from "interfaces";
import { revalidateTag } from "next/cache";
export default async function CarDetailPage({
  params,
}: {
  params: { cid: string };
}) {
  const carDetail = await getCar(params.cid);
  const carItem: CarItem = carDetail.data;
  revalidateTag('car')
  return (
    <main className="text-center p-8  min-h-screen flex flex-col items-center font-[Verdana,Geneva,Tahoma,sans-serif]">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        {carDetail.data.name}
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
            <div className="text-lg font-medium  text-left text-[#161179]">
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
          <Link
            href={`/reservations?id=${params.cid}&model=${carDetail.data.model}`}
            className="mt-4"
          >
            <button className="relative inline-block p-px font-semibold leading-6 text-white  shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95">
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>

              <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                <div className="relative z-10 flex items-center space-x-2">
                  <span className="transition-all duration-500 group-hover:translate-x-1">
                    Reserve Now
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
          </Link>
        </div>
      </div>
    </main>
  );
}
