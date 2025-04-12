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
    <div className="h-[121px] bg-white fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6">
      <div className="flex gap-6">
        <TopMenuItem title="PROVIDER" pageRef="/provider" />
        <TopMenuItem title="SELECT CAR" pageRef="/car" />
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div className="text-[45px] text-black">
          Arm Speed Bus
        </div>
      </div>
      
      <div className="flex gap-6">
        <TopMenuItem title="COUPON" pageRef="/coupon" />
        <DropDownProfile isLoggedIn={true} Text="PROFILE" />
      </div>
    </div>
  );
}
