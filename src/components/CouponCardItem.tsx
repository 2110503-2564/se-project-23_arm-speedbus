"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUserProfile from "@/libs/getUserProfile";
import getCoupons from "@/libs/getCoupons";
import getMyCoupon from "@/libs/getMyCoupon";

export default function CouponCardItem( {couponName, percentage, minDisc, minSp, spent, valid}
  : {couponName:string, percentage: number, minDisc: number, minSp: number, spent: number, valid: number} ) {

  return (
    <div className="w-[230px] h-[333px] rounded-[24px] bg-black text-white overflow-hidden shadow-lg
    relative m-10 hover:scale-105 transition-transform duration-300">  
      {/* ครึ่งวงกลมด้านบน */}
      <div className="w-full h-[125px] relative rounded-b-full flex items-center justify-center">
        <span className="text-white text-[96px] leading-none mt-4 font-rockwellCondensed">
          {percentage}%
        </span>
      </div>

      {/* รอยบากด้านข้าง */}
      <div className="relative w-full flex items-center justify-between px-4 my-4">
        <div className="absolute left-[-10px] h-6 w-6 bg-white rounded-full"></div>
        <div
          className="border-t-[3px] border-white border-dashed w-full"
          style={{
            borderTopStyle: "dashed",
            borderTopWidth: "3px",
            borderTopColor: "#fff",
            borderTop: "3px dashed #fff",
          }}
        ></div>
        <div className="absolute right-[-10px] h-6 w-6 bg-white rounded-full"></div>
      </div>

      {/* เนื้อหาคูปอง */}
      <div className="px-6 mt-3 pb-2 text-[11px] space-y-3 text-white text-left leading-[12px]">
        <div className="text-[18px] font-bold tracking-wide text-center font-rockwellCondensed">
          {couponName}
        </div>

        <p>
          Maximum Discount: <span className="font-bold text-[15px]">$100</span>
          Maximum Discount: <span className="font-bold text-[15px] font-rockwellCondensed">${minDisc}</span>
        </p>
        <p>
          Min. spend: <span className="font-bold text-[15px] font-rockwellCondensed">${minSp}</span>
        </p>
        <p>
          Spent: <span className="font-bold text-[15px] font-rockwellCondensed">${spent}</span>
        </p>
        <p>
          Valid: <span className="font-bold text-[15px] font-rockwellCondensed">
            {
              valid > 1 ? valid + " days" : valid + " day"
            }
          </span>
        </p>

        <div className="text-center">
          <button className="px-4 py-2 mt-1 bg-white text-black rounded shadow hover:bg-gray-300 hover:scale-105 transition-transform duration-300 transition font-semibold">
            REDEEM
          </button>
        </div>
      </div>
    </div>
  );
}
