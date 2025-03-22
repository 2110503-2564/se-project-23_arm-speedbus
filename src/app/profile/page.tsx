"use client";
import { useSession } from "next-auth/react";

export default function () {
  const { data: session } = useSession();
  console.log(session);
  return <div className="py-10">Hi {session?.user.User_info.name}</div>;
}
