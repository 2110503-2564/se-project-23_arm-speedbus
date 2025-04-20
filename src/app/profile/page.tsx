"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const user = session?.user.User_info;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-white  py-16 font-robotoMono">
      {" "}
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12 transition duration-500 ease-in-out">
        Your Profile
      </h1>
      <div className="flex justify-center items-center bg-[#FFFACD] w-full   hover:shadow-2xl transition-shadow duration-300 p-10 mx-auto">
        <div className="grid grid-cols-2 gap-y-8 gap-x-6 text-gray-700 text-[17px]">
          <div className="font-robotoMono font-bold">Name:</div>
          <div className="text-gray-500 font-robotoMono font-robotoMono transition duration-300 hover:text-[#808000]">
            {user?.name}
          </div>

          <div className="font-robotoMono font-bold">Email:</div>
          <div className="text-gray-500 font-robotoMono transition duration-300 hover:text-black">
            {user?.email}
          </div>

          <div className="font-robotoMono font-bold">Telephone:</div>
          <div className="text-gray-500 font-robotoMono transition duration-300 hover:text-black">
            {user?.tel}
          </div>

          <div className="font-robotoMono font-bold ">Created At:</div>
          <div className="text-gray-500 font-robotoMono transition duration-300 hover:text-black">
            {user?.createdAt.split("T")[0]}
          </div>
        </div>
      </div>
    </main>
  );
}
