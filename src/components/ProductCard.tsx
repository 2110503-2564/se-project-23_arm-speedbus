"use client";

import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { FaStar } from "react-icons/fa";
import { CarItem, CarJson } from "interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductCard({
  Name,
  imgSrc,
  price = null,
  provider = null,
  onCompare,
}: {
  Name: string;
  imgSrc?: string;
  price?: string | number | null;
  provider?: string | null;
  onCompare?: Function;
}) {
  const router = useRouter();

  return (
    <InteractiveCard contentName={Name}>
      <div className="w-[300px] h-[230px] relative bg-gray-200">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="Product Picture"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="w-[300px] h-[142px] flex flex-col gap-2 items-start justify-start px-4 py-3 text-black">
        <div className=" -space-y-1">
          <div className="text-lg font-bold font-robotoMono tracking-wide ">
            {Name}
          </div>
          <div className="text-sm text-gray-500 font-robotoMono ">
            {provider}
          </div>
        </div>
        {price !== null && (
          <div className="text-[16px] font-bold font-robotoMono mt-2">
            ${price}
            <span className="text-[8px] font-normal">/Day</span>
          </div>
        )}
        {price === null && <div className="text-xl font-bold mt-2"></div>}
        <div className="flex items-center justify-between text-sm mt-1 w-full">
          {/* ซ้าย: ดาวกับคะแนน */}
          <div className="flex items-center text-black">
            <FaStar className="mr-1" />
            <span className="font-semibold">4.9</span>
          </div>

          {/* ขวา: ลิงก์ */}
          <div
            className="text-sm text-gray-500 flex items-center mr-8 hover:text-indigo-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/review`);
            }}
          >
            view review
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}
