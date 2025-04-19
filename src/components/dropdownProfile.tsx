"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function DropDownProfile({
  isLoggedIn,
  Text,
}: {
  isLoggedIn: boolean;
  Text: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onClick={() => setIsOpen((prevState) => !prevState)}
    >
      <div className="flex flex-row bg-white py-1 px-2 rounded-xl text-[#000000] cursor-pointer hover:text-gray-500 hover:scale-105 transition items-center justify-center text-[13px]">
        {Text}
      </div>

      {!isLoggedIn && isOpen && (
        <div className="fixed top-0 right-0 w-[500px] h-full bg-[#800000] bg-opacity-50 backdrop-blur-sm shadow-lg z-40 transition-transform">
          <div className="flex flex-col h-full p-6 font-[Roboto Mono] pr-20 pt-20">
            <div className="flex flex-col justify-start items-end flex-1">
              <Link href="/register">
                <h2 className="text-[25px] group hover:underline transition-all duration-300 ease-in-out">
                  REGISTER
                </h2>
              </Link>
              <Link href="/api/auth/signin" className="pt-10">
                <h2 className="text-[25px] group hover:underline transition-all duration-300 ease-in-out">
                  LOGIN
                </h2>
              </Link>
            </div>
          </div>
        </div>
      )}

      {isLoggedIn && isOpen && (
        <div className="fixed top-0 right-0 w-[500px] h-full bg-[#800000] bg-opacity-50 backdrop-blur-sm shadow-lg z-40 transition-transform font-[Roboto Mono]">
          <div className="flex flex-col h-full p-6 font-[Roboto Mono] pr-20 pt-20">
            <div className="flex flex-col justify-start items-end flex-1">
              <Link href="/profile">
                <h2 className="text-[25px] group hover:underline transition-all duration-300 ease-in-out">
                  PROFILE
                </h2>
              </Link>
              <div className="mt-2 text-[15px] text-right">
                <Link href="/booking">
                  <h3 className="pt-5 group hover:underline transition-all duration-300 ease-in-out">
                    BOOKING
                  </h3>
                </Link>
                <h3 className="pt-2 text-right group hover:underline transition-all duration-300 ease-in-out">
                  IDK
                </h3>
              </div>
              <Link href="/coupon" className="pt-10">
                <h2 className="text-[25px] group hover:underline transition-all duration-300 ease-in-out">
                  COUPON
                </h2>
              </Link>
              <div className="mt-2 text-[15px] text-right">
                <Link className="pt-5 group hover:underline transition-all duration-300 ease-in-out" href="/mycoupon">
                  MY COUPON
                </Link>
                <h3 className="pt-2 group hover:underline transition-all duration-300 ease-in-out">
                  REDEEM COUPON
                </h3>
              </div>
              <div className="text-right mt-auto">
                <Link href="/api/auth/signout">
                  <button className="text-[15px] text-white hover:underline transition-all duration-300 ease-in-out">
                    LOGOUT
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
