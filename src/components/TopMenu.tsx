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
    <div className="h-[121px]  bg-[#ffffff] fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 ">
      <div className="flex items-center gap-5 mx-1 left-6 ">
        <TopMenuItem title="PROVIDER" pageRef="/provider"></TopMenuItem>
        <TopMenuItem title="SELECT CAR" pageRef="/car"></TopMenuItem>
      </div>
      <div className="flex gap-6 absolute left-1/2 -translate-x-1/2">
        <div className="text-[45px] text-[#000000] font-[Roboto Mono] ">
          Arm Speed Bus
        </div>
        {session?.user.User_info.role === "admin" ? (
          <>
            <TopMenuItem title="Manage" pageRef="/manage" />
            <TopMenuItem title="Audit Logs" pageRef="/auditlog" />
          </>
        ) : null}
      </div>
      <div className="flex gap-6 absolute right-6 ">
        {session ? (
          <>
            <TopMenuItem title="COUPON" pageRef="/coupon" />
            <DropDownProfile isLoggedIn={true} Text="PROFILE" />
          </>
        ) : (
          <DropDownProfile isLoggedIn={false} Text="LOGIN" />
        )}
      </div>
    </div>
  );
}
