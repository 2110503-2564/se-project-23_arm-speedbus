"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function () {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Image
        src="/img/user.svg" alt="user"
        width={200} height={200}
        className="items-center"
      />
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4 my-5">
        <div className='text-3xl font-bold text-[#2d336b] text-center'>
          Your Profile
        </div>
          <div className="grid grid-cols-2 gap-3 text-gray-800">
              <div className="text-md font-semibold">User Id:</div>
              <div className="text-md">{session?.user.User_info._id}</div>
              <div className="text-md font-semibold">Name:</div>
              <div className="text-md">{session?.user.User_info.name}</div>
              <div className="text-md font-semibold">Email:</div>
              <div className="text-md">{session?.user.User_info.email}</div>
              <div className="text-md font-semibold">Tel:</div>
              <div className="text-md">{session?.user.User_info.tel}</div>
              <div className="text-md font-semibold">Created At:</div>
              <div className="text-md">{session?.user.User_info.createdAt.split('T')[0]}</div>
          </div>
          
      </div>
    </div>
  );
}