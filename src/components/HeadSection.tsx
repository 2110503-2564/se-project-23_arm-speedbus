"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function HeadSection() {
  const { data: session } = useSession();
  const [headingAnimation, setHeadingAnimation] = useState(false);
  const [welcomeAnimation, setWelcomeAnimation] = useState(false);
  const [logoAnimation, setLogoAnimation] = useState(false);
  console.log("HeroSection Mounted!"); // Debugging log

  useEffect(() => {
    setHeadingAnimation(true);
    setTimeout(() => setWelcomeAnimation(true), 200);
    setTimeout(() => setLogoAnimation(true), 200);
  }, []);

  return (
    <div className="text-center h-[100vh] py-16 px-4 items-center flex flex-col justify-center snap-start">
      <Image
        src="/img/logo2.png"
        alt="Rental Car FrontShot Logo"
        width={200}
        height={200}
        className="m-5 transition-opacity transition-transform duration-500 ease-in-out"
        style={{
          transform: logoAnimation
            ? "scale(1.0) rotate(360deg)"
            : "scale(0) rotate(0deg)",
          opacity: logoAnimation ? 1.0 : 0.0,
        }}
      />

      <h1
        className={`text-6xl font-extrabold font-jubilee text-[#000000] opacity-0 transition-all duration-1000 ease-in ${
          welcomeAnimation ? "opacity-100 translate-y-0" : ""
        }`}
      >
        Rental Car FrontShot
      </h1>

      <p
        className={`text-4xl font-jubilee text-[#000000] opacity-0 transition-all duration-1000 ease-in ${
          headingAnimation ? "opacity-100 translate-y-0" : ""
        }`}
      >
        {session
          ? `Welcome ${session?.user.User_info.name}`
          : "Welcome to Rental Car FrontShot!"}
      </p>
    </div>
  );
}
