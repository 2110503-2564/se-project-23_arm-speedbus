import Image from "next/image";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { Link } from "@mui/material";

import DropDownProfile from "./dropdownProfile";
export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[60px] bg-[#2d336b] fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-4 shadow-md ">
      <div className="flex items-center gap-2 mx-1  ">
        <TopMenuItem title="Home" pageRef="/"></TopMenuItem>
      </div>
      <div className="flex gap-6 absolute left-1/2 -translate-x-1/2">
        <TopMenuItem title="Provider" pageRef="/provider" />
        <TopMenuItem title="Select Car" pageRef="/car" />
        <TopMenuItem title="Car Jumper" pageRef="/game" />
      </div>
      <div className="flex flex-row absolute right-2 h-full mx-5 ">
        {session ? (
          <DropDownProfile isLoggedIn={true} Text="Profile" />
        ) : (
          <DropDownProfile isLoggedIn={false} Text="Login" />
        )}
      </div>
    </div>
  );
}
