"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function () {
  const { data: session } = useSession();
  console.log(session);
  return (
    <main className="min-h-screen font-robotoMono mt-20">
    <h1 className="text-4xl font-semibold text-gray-800 font-robotoMono text-center">
      YOUR PROFILE
    </h1>
    <div className="flex justify-between justify-center items-center mt-[10vh] mx-[30vh]">
      <Image
        src="/img/user.svg" alt="user"
        width={400} height={400}
        className="items-center"
      />
      <div className="bg-white p-6 py-[6vh] rounded-lg shadow-md space-y-4">
          <div className="grid grid-cols-2 gap-[6vh] text-gray-800">
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
    </main>
  );
}