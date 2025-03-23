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
      <div className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4 my-5">
        <div className='text-3xl font-bold text-purple-900 text-center'>
          Your Profile
        </div>
        <table className='table-auto border-separate border-spacing-2 text-black'>
          <tbody>
            <tr>
              <td>User ID</td>
              <td>{session?.user.User_info._id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>{session?.user.User_info.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{session?.user.User_info.email}</td>
            </tr>
            <tr>
              <td>Tel</td>
              <td>{session?.user.User_info.tel}</td>
            </tr>
            <tr>
              <td>Member Since</td>
              <td>{session?.user.User_info.createdAt.split('T')[0]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}