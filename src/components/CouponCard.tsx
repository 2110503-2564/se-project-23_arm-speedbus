"use client";
import React from "react";

export default function CouponCard() {
  return (
    <div className="w-[230px] h-[333px] rounded-[24px] bg-black text-white overflow-hidden shadow-lg relative">
      {/* ครึ่งวงกลมด้านบน */}
      <div className="w-full h-[125px] relative rounded-b-full flex items-center justify-center">
        <span className="text-white text-[72px] font-bold leading-none font-rockwell font-robotoMono">
          15%
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
      <div className="px-6 mt-6 pb-6 text-[11px] space-y-3 text-white text-left leading-[12px]">
        <div className="text-[18px] font-bold tracking-wide text-center">
          New User Coupon
        </div>

        <p>
          Maximum Discount: <span className="font-bold text-[15px]">$100</span>
        </p>
        <p>
          Min. spend: <span className="font-bold text-[15px]">$10</span>
        </p>
        <p>
          Spent: <span className="font-bold text-[15px]">$1</span>
        </p>
        <p>
          Valid: <span className="font-bold text-[15px]">3 days</span>
        </p>

        <div className="text-center">
          <button className="px-4 py-2 mt-1 bg-white text-black rounded shadow hover:bg-gray-200 transition font-semibold">
            REDEEM
          </button>
        </div>
      </div>
    </div>
  );
}
