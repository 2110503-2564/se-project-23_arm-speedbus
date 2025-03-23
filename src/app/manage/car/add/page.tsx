"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import createCar from "@/libs/createCar";

export default function AddCarPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    vin_plate: "",
    provider_info: "",
    picture: "",
    capacity: 1,
    model: "",
    pricePerDay: 1,
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "capacity" || name === "pricePerDay" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      if (!session?.user.token) {
        setError(true);
        setErrorMessage("You must be logged in as an admin to add a car.");
        return;
      }
      console.log(formData.picture);
      const response = await createCar(
        session.user.token,
        formData.name,
        formData.vin_plate,
        formData.provider_info,
        formData.picture,
        formData.capacity,
        formData.model,
        formData.pricePerDay
      );

      if (response.success) {
        alert("Created car successfully");
        router.push("/car");
      } else {
        setError(true);
        setErrorMessage(response.message || "Failed to add car.");
      }
    } catch (error) {
      setError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    }
  };

  return (
    <>
      {session?.user.User_info.role === "admin" ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="name">
              Car Name
            </label>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Car's Name"
              className="border p-2 w-full"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label
              className="w-auto block text-gray-700 pr-4"
              htmlFor="vin_plate"
            >
              VIN
            </label>
            <input
              type="text"
              required
              name="vin_plate"
              value={formData.vin_plate}
              onChange={handleChange}
              placeholder="VIN"
              className="border p-2 w-full"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label
              className="w-auto block text-gray-700 pr-4"
              htmlFor="provider_info"
            >
              Car Provider ID
            </label>
            <input
              type="text"
              required
              name="provider_info"
              value={formData.provider_info}
              onChange={handleChange}
              placeholder="Provider's ID"
              className="border p-2 w-full"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label
              className="w-auto block text-gray-700 pr-4"
              htmlFor="picture"
            >
              Car Picture
            </label>
            <input
              type="text"
              required
              name="picture"
              value={formData.picture}
              onChange={handleChange}
              placeholder="Car's Picture URL"
              className="border p-2 w-full"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label
              className="w-auto block text-gray-700 pr-4"
              htmlFor="capacity"
            >
              Car Capacity
            </label>
            <input
              type="number"
              required
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              placeholder="Capacity"
              min={1}
              className="border p-2 w-full"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label className="w-auto block text-gray-700 pr-4" htmlFor="model">
              Car Model
            </label>
            <input
              type="text"
              required
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Model or Description"
              className="border p-2 w-full"
            />
          </div>
          <div className="flex items-center w-1/2 my-2">
            <label
              className="w-auto block text-gray-700 pr-4"
              htmlFor="pricePerDay"
            >
              Daily Rental Rate
            </label>
            <input
              type="number"
              required
              name="pricePerDay"
              value={formData.pricePerDay}
              onChange={handleChange}
              placeholder="Daily Rental Rate"
              min={1}
              className="border p-2 w-full"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
          >
            Add New Car
          </button>

          {error && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </form>
      ) : (
        <div className="text-xl">You are not admin. Don't even try.</div>
      )}
    </>
  );
}
