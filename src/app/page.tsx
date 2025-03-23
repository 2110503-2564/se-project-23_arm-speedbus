"use client";
import Image from "next/image";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import styles from "./page.module.css";
import CarPanel from "@/components/CarPanel";
import TravelCard from "@/components/TravelCard";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [headingAnimation, setHeadingAnimation] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);

  useEffect(() => {
    setHeadingAnimation(true);
    setTimeout(() => {
      setWelcomeAnimation(true);
    }, 200); // Delay for welcome message animation
  }, []);

  return (
    <main className="bg-[#7886C7] min-h-screen">
      <div className="text-center py-16 px-4">
        <h1
          className={`text-8xl font-extrabold font-jubilee text-[#FFF2F2] drop-shadow-lg tracking-wide mb-4 transition-all duration-1000 ${
            headingAnimation ? "scale-100 opacity-100" : "scale-80 opacity-0"
          }`}
        >
          Rental Car FrontShot
        </h1>
        <p
          className={`text-4xl font-jubilee text-[#FFF2F2] opacity-0 transition-opacity duration-800 ${
            welcomeAnimation ? "opacity-80" : ""
          }`}
        >
          {session
            ? `Welcome ${session?.user.User_info.name}`
            : "Welcome to Rental Car FrontShot!"}
        </p>
      </div>

      <div className="container mx-auto">
        <Banner />
      </div>
    </main>
  );
}
