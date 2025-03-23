"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import createProvider from "@/libs/createProvider";

export default function AddProviderPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name:"",
    address:"",
    tel:"",
    email:"",
    picture:"",
    openTime:"",
    closeTime:""
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setErrorMessage("");

    try {
      if (!session?.user.token) {
        setError(true);
        setErrorMessage("You must be logged in as an admin to add a provider.");
        return;
      }
      console.log(formData);
      const response = await createProvider(
        session.user.token,
        formData.name,
        formData.address,
        formData.tel,
        formData.email,
        formData.picture,
        formData.openTime,
        formData.closeTime
      );

      if (response.success) {
        alert("Created provider successfully");
        router.push("/provider");
      } else {
        setError(true);
        setErrorMessage(response.message || "Failed to add provider.");
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
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md font-[BlinkMacSystemFont] mt-5">
          <h2 className="text-4xl font-semibold mb-6 text-indigo-600 text-center">
            Add New Provider
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="name"
              >
                Provider Name
              </label>
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter provider name"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                required
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter Address"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="tel"
              >
                Tel.
              </label>
              <input
                type="text"
                required
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                placeholder="Enter provider's Telephone Number"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="email"
              >
                Provider Email
              </label>
              <input
                type="text"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Provider Email"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="picture"
              >
                Provider Picture
              </label>
              <input
                type="text"
                required
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                placeholder="Enter picture URL"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="openTime"
              >
                Provider Open Time
              </label>
              <input
                type="text"
                required
                name="openTime"
                value={formData.openTime}
                onChange={handleChange}
                placeholder="Enter Provider Open Time (must be in HH:MM:SS format)"
                min={1}
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <div className="flex flex-col">
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="closeTime"
              >
                Provider Close Time
              </label>
              <input
                type="text"
                required
                name="closeTime"
                value={formData.closeTime}
                onChange={handleChange}
                placeholder="Enter Provider Close Time (must be in HH:MM:SS format)"
                className="mt-1 p-2 border rounded-md w-full focus:ring focus:ring-indigo-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md transition-colors duration-300"
            >
              Add New Provider
            </button>
            {error && (
              <p className="text-red-500 mt-2 text-center">{errorMessage}</p>
            )}
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
