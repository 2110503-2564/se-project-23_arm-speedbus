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
      <div className="flex items-center gap-4">
        <a href="/">
          <Image
            src={"/img/logo2.png"}
            className="h-12 w-auto"
            alt="logo"
            width={0}
            height={0}
            sizes="100vh"
          />
        </a>

        <TopMenuItem title="Home" pageRef="/"></TopMenuItem>
      </div>
      <div className="flex gap-6 absolute left-1/2 -translate-x-1/2">
        <TopMenuItem title="Select Car" pageRef="/car" />
        <TopMenuItem title="Reservations" pageRef="/reservations" />
        <TopMenuItem title="Provider" pageRef="/about" />
      </div>
      <div className="flex flex-row absolute right-2 h-full ">
        {session ? (
          <DropDownProfile></DropDownProfile>
        ) : (
          <Link href="/api/auth/signin">
            <div className="relative mt-4 font font-custom w-[120px] text-center text-[13px] text-white font-semibold cursor-pointer hover:text-gray-300 transition">
              Sign in
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
