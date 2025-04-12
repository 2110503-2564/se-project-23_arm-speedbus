"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { ClassNames } from "@emotion/react";

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
    <div className="flex flex-col justify-start h-[100vh] py-16 px-4 snap-start">
      <div className="flex justify-center items-center w-full">
        <Image
          src="/img/carbe.png"
          alt="Rental Car FrontShot Logo"
          width={1221.2}
          height={387}
          className=" object-fit m-5 transition-opacity transition-transform duration-500 ease-in-out"
          quality={100}
          priority
        />
      </div>

      <div className=" flex flex-col justify-start px-[128.5px] text-right">
        <h1
          className={`text-[45px] text-left font-[Roboto Mono] text-[#000000] opacity-0 transition-all duration-1000 ease-in ${
            welcomeAnimation ? "opacity-100 translate-y-0" : ""
          }`}
        >
          Maroon
        </h1>

        <p
          className={`text-[13px] text-left font-[Roboto Mono] text-[#000000] opacity-0 transition-all duration-1000 ease-in ${
            headingAnimation ? "opacity-100 translate-y-0" : ""
          }`}
        >
          {session ? (
            `Welcome ${session?.user.User_info.name}`
          ) : (
            <div className="font-light">
              <span>
                The burgundy on my T-shirt when you splashed your wine into me
              </span>
              <br />
              <span>
                And how the blood rushed into my cheeks, so scarlet, it was
              </span>
              <br />
              <span>
                The mark you saw on my collarbone, the rust that grew between
                telephones
              </span>
              <br />
              <span>
                The lips I used to call home, so scarlet, it was maroon
              </span>
            </div>
          )}
        </p>
      </div>
    </div>
  );
}
