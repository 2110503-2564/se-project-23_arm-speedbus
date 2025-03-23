import { redirect } from "next/navigation";
import { useState } from "react";
import createCar from "@/libs/createCar";
import { revalidateTag } from "next/cache";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export default async function AddCarPage() {
  const session = await getServerSession(authOptions);
  const addCar = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const vin = formData.get("vin_plate") as string;
    const providerID = formData.get("provider_info") as string;
    const picture = formData.get("picture") as string;
    const capacity = formData.get("capacity") as string;
    const model = formData.get("model") as string;
    const pricePerDay = formData.get("pricePerDay") as string;
    if (
      session &&
      name &&
      vin &&
      providerID &&
      picture &&
      capacity &&
      model &&
      pricePerDay
    ) {
      const res = await createCar(
        session.user.token,
        name,
        vin,
        providerID,
        picture,
        Number(capacity),
        model,
        Number(pricePerDay)
      );
      console.log(res.success);
      console.log("typeof res.success:", typeof res.success);
      if (res.success === false) {
        console.log("redirecting to fail page");
        redirect("/manage/car/add/fail");
      } else {
        revalidateTag("cars");
        console.log("redirecting to car page");
        redirect("/car");
      }
    }
  };
  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-5 font-[BlinkMacSystemFont]">
          <h2 className="text-4xl font-semibold mb-6 text-center text-indigo-600">
            Add New Car
          </h2>
          <form action={addCar} className="space-y-4">
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Car Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter car name"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="vin_plate"
              >
                VIN
              </label>
              <input
                type="text"
                name="vin_plate"
                placeholder="Enter VIN"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="provider_info"
              >
                Car Provider ID
              </label>
              <input
                type="tel"
                name="provider_info"
                placeholder="Enter provider's ID"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="picture"
              >
                Car Picture URL
              </label>
              <input
                type="text"
                name="picture"
                placeholder="Enter picture URL"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="capacity"
              >
                Car Capacity
              </label>
              <input
                type="number"
                name="capacity"
                placeholder="Enter capacity"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="model"
              >
                Car Model
              </label>
              <input
                type="text"
                name="model"
                placeholder="Enter model or description"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="pricePerday"
              >
                Daily Rental Rate
              </label>
              <input
                type="number"
                name="pricePerDay"
                placeholder="Enter daily rate"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-300"
            >
              Add New Car
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center text-xl text-red-500 p-4">
          You are not an admin. Access denied.
        </div>
      )}
    </>
  );
}
