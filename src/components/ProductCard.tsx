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
  price,
  provider,
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
      <div className="w-[300px] h-[230px] relative bg-gray-200 boarder-2border border-gray-300 rounded-lg">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="Product Picture"
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="w-[300px] h-[142px] flex flex-col gap-2 items-left justify-start px-4 py-3 text-black">
        <div className="-space-y-1 text-left">
          <div className="text-xl font-bold font-robotoMono tracking-wide">
            {Name}
          </div>
          <div className="text-xs text-gray-500 font-robotoMono">
            {provider}
          </div>
        </div>
        {price !== null && (
          <div className="text-[16px] font-bold font-robotoMono text-left mt-2">
            ${price}
            <span className="text-[8px] font-normal">/Day</span>
          </div>
        )}
        <div className="flex items-end">
          {price === null && (
            <div className="text-xl font-bold mt-2 items-left"></div>
          )}

          <div className="flex items-center justify-between text-sm mt-1 w-4/5">
            {/* Left: Star and Rating */}
            <div className="flex items-center text-black">
              <FaStar className="mr-1" />
              <span className="font-semibold">4.9</span>
            </div>

            {/* Right: Link */}
            <div
              className="text-sm text-gray-500 truncate "
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/review`);
              }}
            >
              view review➜
            </div>
          </div>
        </div>
      </div>
    </InteractiveCard>
  );
}
