"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function DropDownProfile({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative mt-4 font font-custom"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="w-[120px] text-center text-[13px] text-white font-semibold cursor-pointer hover:text-gray-300 transition">
        Profile
      </span>
      {!isLoggedIn && isOpen && (
        <ul className="absolute top-10 right-0 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-2 transition-all duration-300 ease-in-out opacity-100 scale-100">
        <Link href="/api/auth/signin">
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            Sign in
          </li>
        </Link>
        <Link href="/api/auth/register">
          <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            Register
          </li>
        </Link>
      </ul>
      )}
      {isLoggedIn && isOpen && (
        <ul className="absolute top-10 right-0 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-2 transition-all duration-300 ease-in-out opacity-100 scale-100">
          <Link href="/profile">
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
              Profile
            </li>
          </Link>
          <Link href="/cart">
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition">
              My Booking
            </li>
          </Link>
          <Link href="/api/auth/signout">
            <li className="px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer transition">
              Logout
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
};