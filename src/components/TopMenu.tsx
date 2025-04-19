import Image from "next/image";
import styles from "./topmenu.module.css";
import TopMenuItem from "./TopMenuItem";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import Link from "next/link";

import DropDownProfile from "./dropdownProfile";
export default async function TopMenu() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-[104px] bg-white fixed top-0 left-0 right-0 z-30 flex items-center justify-between ">
      <div className="flex gap-6 px-[120px]">
        <TopMenuItem title="PROVIDER" pageRef="/provider" />
        <TopMenuItem title="SELECT CAR" pageRef="/car" />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href={"/"}>
          <div className="text-[32px] text-black font-medium">
            ARM SPEED BUS
          </div>
        </Link>
      </div>

      <div className="flex gap-6 px-[140px] hover:text-indigo-500">
        <TopMenuItem title="COUPON" pageRef="/coupon" />
        {session ? (
          <DropDownProfile isLoggedIn={true} Text="PROFILE" />
        ) : (
          <DropDownProfile isLoggedIn={false} Text="LOGIN" />
        )}
      </div>
    </div>
  );
}
