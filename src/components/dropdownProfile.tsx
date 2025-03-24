"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaShoppingCart,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

export default function DropDownProfile({
  isLoggedIn,
  Text,
}: {
  isLoggedIn: boolean;
  Text: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative mt-4 font font-custom"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span className="w-[50px] h-[30px] text-center text-[13px] text-white font-semibold cursor-pointer hover:text-gray-300 transition flex items-center justify-center">
        {Text}
      </span>
      {!isLoggedIn && isOpen && (
        <ul className="absolute top-10 right-0 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-2 transition-all duration-300 ease-in-out opacity-100 scale-100">
          <Link href="/api/auth/signin">
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition flex items-center">
              <FaSignInAlt className="mr-2" /> Sign in
            </li>
          </Link>
          <Link href="/register">
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition flex items-center">
              <FaUserPlus className="mr-2" /> Register
            </li>
          </Link>
        </ul>
      )}
      {isLoggedIn && isOpen && (
        <ul className="absolute top-10 right-0 w-44 bg-white border border-gray-200 rounded-xl shadow-lg p-2 transition-all duration-300 ease-in-out opacity-100 scale-100">
          <Link href="/profile">
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition flex items-center">
              <FaUser className="mr-2" /> Profile
            </li>
          </Link>
          <Link href="/booking">
            <li className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer transition flex items-center">
              <FaShoppingCart className="mr-2" /> Bookings
            </li>
          </Link>
          <Link href="/api/auth/signout">
            <li className="px-4 py-2 text-red-600 hover:bg-red-100 rounded-lg cursor-pointer transition flex items-center">
              <FaSignOutAlt className="mr-2" /> Logout
            </li>
          </Link>
        </ul>
      )}
    </div>
  );
}
