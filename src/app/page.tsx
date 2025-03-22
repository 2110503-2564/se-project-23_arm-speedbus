import Image from "next/image";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";
import CarPanel from "@/components/CarPanel";
import TravelCard from "@/components/TravelCard";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main className="bg-[#7886C7]">
      <div className="text-6xl text-center font-extrabold font-[Poppins] text-[#FFF2F2] py-10 drop-shadow-lg tracking-wide">
        Rental Car FrontShot
      </div>
      <Banner />
      <TravelCard />
    </main>
  );
}
