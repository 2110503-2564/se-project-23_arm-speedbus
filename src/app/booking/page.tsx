"use client";
import deleteRent from "@/libs/deleteRent";
import finishRent from "@/libs/finishRent";
import redeemCoupon from "@/libs/redeemCoupon";
import getRents from "@/libs/getRents";
import dayjs from "dayjs";
import { BookingItem, BookingJson } from "interfaces";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RentPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [rentJson, setRentJson] = useState<BookingJson>({
    success: false,
    count: 0,
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
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
      setEditError(res.message);
    }
  };
  const handleCoupon = async (rentId: string) => {
    /*if (!session.user.token) return;
    const res = await redeemCoupon(session.user.token, rentId);
    if (res.success) {
      alert("Deleted Booking Successfully");
      setRefresh((prev) => prev + 1);
    } else {
      setEditError(res.message);
    }*/
   alert("Redeem coupon");
  };
  const handleFinish = async (rentId: string) => {
    if (!session.user.token) return;
    const res = await finishRent(session.user.token, rentId);
    if (res.success) {
      alert("Marked Renting as Finished Successfully");
      setRefresh((prev) => prev + 1);
    } else {
      setEditError(res.message);
    }
  };
  if (loading) return <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">Loading...</div>
  if (error) return <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">{error}</div>;
  return (
    <main className="p-6 min-h-screen font-robotoMono mt-10">
        <h1 className="text-4xl font-semibold text-gray-800 font-robotoMono text-center mb-6">
              All Rent Booking History
        </h1>
        {session.user.User_info.role === "admin" ? (
          <div className="mb-8 text-center">
            <h2 className="text-med text-black font-robotoMono mt-3">
              Manage and modify rental bookings for all users.
            </h2>
          </div>
        ) : (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2 font-robotoMono">
              Your Rent Booking History
            </h1>
            <h2 className="text-lg text-white font-robotoMono">
              Manage your rental bookings and modify dates.
            </h2>
            <h2 className="text-lg text-white font-robotoMono">
              A user can have up to 3 active bookings.
            </h2>
            <h2 className="text-sm text-white font-robotoMono">
              (Finished bookings are not included.)
            </h2>
          </div>
        )}
      <div className="max-w-4xl mx-auto font-robotoMono border border-black">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {/* booking section */}
          {rentJson?.data?.length === 0 ? (
            <div className="p-6 text-center text-gray-500 font-robotoMono">
              No rental history found.
            </div>
          ) : (
            <div className="divide-y divide-black">
              {rentJson?.data?.map((rentItem) => (
                <div key={rentItem._id} className="p-6 font-robotoMono">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-md font-semibold text-gray-700 font-robotoMono">
                        Renting ID: <span className="text-gray-700 font-extrabold font-robotoMono text-xl">{rentItem._id}</span>
                      </div>
                      <div className="text-md text-gray-600 font-robotoMono">
                        Car: <span className="text-gray-700 font-extrabold font-robotoMono text-xl">{rentItem.car_info?.name}</span>
                      </div>
                      <div className="text-md text-gray-600 font-robotoMono">
                        User: <span className="text-gray-700 font-extrabold font-robotoMono text-xl">{rentItem.user_info?.name}</span>
                      </div>
                      {
                        rentItem.status == "Confirmed" ? (
                          <div className="text-md text-blue-600 font-robotoMono">
                            Status: <span className="text-blue-600 font-extrabold font-robotoMono text-xl">Confirmed</span>
                          </div>
                        ):(
                          <div className="text-md text-green-600 font-robotoMono">
                            Status: <span className="text-green-600 font-extrabold font-robotoMono text-xl">Finished</span>
                          </div>
                        )
                      }
                    </div>
                    <div>
                      <div className="text-gray-600 font-robotoMono">
                        Start Date: <span className="text-black font-extrabold font-robotoMono"> {rentItem.startDate?.split('T')[0]}</span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        End Date: <span className="text-black font-extrabold font-robotoMono">{rentItem.endDate?.split('T')[0]} </span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        Status: <span className="text-black font-extrabold font-robotoMono">{rentItem.status}</span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        Daily Cost: <span className="text-black font-extrabold font-robotoMono">${rentItem.car_info.pricePerDay}</span>
                      </div>
                      <div className="text-gray-600 font-robotoMono">
                        Confirmation Date: <span className="text-black font-extrabold font-robotoMono">{rentItem.iDate}</span>
                      </div>
                      <br/>
                      <div className="text-gray-600 text-xl font-bold font-robotoMono">
                        Total Day: {rentItem.totalDays}
                      </div>
                      <div className="text-gray-600 text-xl font-bold text-green-600 font-robotoMono">
                        Total Cost: ${rentItem.totalPrice}
                      </div>
                    </div>
                  </div>

                  {/* button section */}
                  <div className="flex flex-row justify-between font-robotoMono">
                    <div className="flex flex-row justify-start font-robotoMono">
                      {" "}
                      {session.user.User_info.role === "admin" &&
                      rentItem.status === "Confirmed" ? (
                        <div className="mt-4 flex justify-start font-robotoMono">
                          <button
                            onClick={() => handleFinish(rentItem._id)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300
                            hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75 font-robotoMono"
                          >
                            Mark as Finished
                          </button>
                        </div>
                      ) : session.user.User_info.role === "user" &&
                        rentItem.status === "Finished" ? (
                        <div className="mt-4 flex justify-end text-green-600 font-robotoMono">
                          <p className="items-center font-robotoMono">Rent Finished</p>
                        </div>
                      ) : null}
                    </div>

                    <div className="mt-4 flex justify-end font-robotoMono">
                      {rentItem.status === "Confirmed" && (
                        <button
                          onClick={() =>
                            router.push(
                              `/booking/${rentItem.car_info._id}/${rentItem._id}`
                            )
                          }
                          className="m-2 px-4 py-2 bg-purple-500 text-white rounded-md transition duration-300 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 font-robotoMono"
                        >
                          Change Date
                        </button>
                      )}
                      <button
                        onClick={() => handleCoupon(rentItem._id)}
                        className="m-2 px-4 py-2 bg-green-500 text-white rounded-md transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 font-robotoMono"
                      >
                        Redeem Coupon
                      </button>
                      <button
                        onClick={() => handleDelete(rentItem._id)}
                        className="m-2 px-4 py-2 bg-red-500 text-white rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 font-robotoMono"
                      >
                        Delete
                      </button>
                    </div>
                    {editError && (
                      <div className="text-red-500 mt-2 font-robotoMono">{editError}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
