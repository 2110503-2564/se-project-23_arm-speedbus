"use client";
import deleteRent from "@/libs/deleteRent";
import getRents from "@/libs/getRents";
import { BookingItem, BookingJson } from "interfaces";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function RentPage() {
  const { data: session } = useSession();
  const [rentJson, setRentJson] = useState<BookingJson>({
    success: false,
    count: 0,
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [refresh, setRefresh] = useState(0);
  if (!session?.user.token) {
    return;
  }
  useEffect(() => {
    const fetchRents = async () => {
      try {
        const response = await getRents(session?.user.token);
        setRentJson(response);
      } catch (err) {
        setError("Could not fetch rents.");
      } finally {
        setLoading(false);
      }
    };

    fetchRents();
  }, [refresh]);
  const handleDelete = async (rentId: string) => {
    if (!session.user.token) return;
    const res = await deleteRent(session.user.token, rentId);
    if (res.success) {
      alert("Deleted Booking Successfully");
      setRefresh((prev) => prev + 1);
    } else {
      setDeleteError(res.message);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  return (
    <main className="p-6 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        {session.user.User_info.role === "admin" ? (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2 font-poppins">
              All Rent History
            </h1>
            <h2 className="text-lg text-gray-600 font-open-sans">
              Manage and modify rental bookings for all users.
            </h2>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2 font-poppins">
              Your Rent History
            </h1>
            <h2 className="text-lg text-gray-600 font-open-sans">
              Manage your rental bookings and modify dates.
            </h2>
            <h2 className="text-lg text-gray-600 font-open-sans">
              A user can have up to 3 active bookings.
            </h2>
            <h2 className="text-sm text-gray-500 font-open-sans">
              (Finished bookings are not included.)
            </h2>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          {rentJson?.data?.length === 0 ? (
            <div className="p-6 text-center text-gray-500 font-open-sans">
              No rental history found.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {rentJson?.data?.map((rentItem) => (
                <div key={rentItem._id} className="p-6 font-open-sans">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-lg font-semibold text-gray-700 font-poppins">
                        Renting ID: {rentItem._id}
                      </div>
                      <div className="text-gray-600">
                        Car: {rentItem.car_info?.name}
                      </div>
                      <div className="text-gray-600">
                        User: {rentItem.user_info?.name}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-600">
                        Start Date: {rentItem.startDate?.substring(0, 10)}
                      </div>
                      <div className="text-gray-600">
                        End Date: {rentItem.endDate?.substring(0, 10)}
                      </div>
                      <div className="text-gray-600">
                        Status: {rentItem.status}
                      </div>
                      <div className="text-gray-600">
                        Confirmation Date: {rentItem.iDate}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => handleDelete(rentItem._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                    >
                      Delete
                    </button>
                  </div>
                  {deleteError && (
                    <div className="text-red-500 mt-2">{deleteError}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
