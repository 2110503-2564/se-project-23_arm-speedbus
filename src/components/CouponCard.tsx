"use client";
import createCoupon from "@/libs/createCoupon";
import { getSession } from "next-auth/react";
import React from "react";
import getMyCoupon from "@/libs/getMyCoupon";
import { useEffect, useState } from "react";
const redeemCoupon = async (
  couponName: string,
  percentage: number,
  minDisc: number,
  minSp: number,
  valid: number
) => {
  const session = await getSession();
  if (!session?.user) {
    alert("You must be logged in to redeem a coupon.");
    return;
  }
  const token = session.user.token;
  const existing = await getMyCoupon(token);
  const hasCoupon = existing?.data?.some(
    (c: any) => c.name === couponName && c.status !== "used"
  );

  if (hasCoupon) {
    alert("You already redeemed this coupon.");
    return;
  }
  const response = await createCoupon(
    token,
    couponName,
    percentage,
    minDisc,
    minSp,
    new Date(Date.now() + valid * 24 * 60 * 60 * 1000)
  );
  console.log(response);
  alert("Coupon redeemed successfully!");
};

export default function CouponCard({
  couponName,
  percentage,
  minDisc,
  minSp,
  spent,
  valid,
}: {
  couponName: string;
  percentage: number;
  minDisc: number;
  minSp: number;
  spent: number;
  valid: number;
}) {
  const [hasCoupon, setHasCoupon] = useState<boolean | null>(null);
  useEffect(() => {
    const checkCoupon = async () => {
      const session = await getSession();
      if (!session?.user?.token) return;

      const myCoupons = await getMyCoupon(session.user.token);
      const found = myCoupons?.data?.some(
        (c: any) => c.name === couponName && c.status !== "used"
      );
      setHasCoupon(found); // true = already has
    };

    checkCoupon();
  }, []);
  return (
    <div
      className={`w-[230px] h-[333px] rounded-[24px] ${
        hasCoupon === true ? "bg-gray-400" : "bg-black"
      } text-white overflow-hidden relative hover:scale-105 transition-transform duration-300`}
    >
      {/* ครึ่งวงกลมด้านบน */}
      <div className="w-full h-[125px] relative rounded-b-full flex items-center justify-center">
        <span className="text-white text-[96px] leading-none mt-4 font-rockwellCondensed">
          {percentage}%
        </span>
      </div>

      {/* รอยบากด้านข้าง */}
      <div className="relative w-full flex items-center justify-between px-4 my-4">
        <div className="absolute left-[-10px] h-6 w-6 bg-white rounded-full"></div>
        <div className="w-full"></div>
        <div className="absolute right-[-10px] h-6 w-6 bg-white rounded-full"></div>
      </div>

      {/* เนื้อหาคูปอง */}
      <div className="px-6 mt-3 pb-2 text-[11px] space-y-3 text-white text-left leading-[12px]">
        <div className="text-[18px] font-bold tracking-wide text-center font-rockwellCondensed">
          {couponName}
        </div>

        <p>
          Maximum Discount:{" "}
          <span className="font-bold text-[15px] font-rockwellCondensed">
            ${minDisc}
          </span>
        </p>
        <p>
          Min. spend:{" "}
          <span className="font-bold text-[15px] font-rockwellCondensed">
            ${minSp}
          </span>
        </p>
        <p>
          Spent:{" "}
          <span className="font-bold text-[15px] font-rockwellCondensed">
            ${spent}
          </span>
        </p>
        {hasCoupon === false && (
          <p>
            Valid:{" "}
            <span className="font-bold text-[15px] font-rockwellCondensed">
              {valid > 1 ? valid + " days" : valid + " day"}
            </span>
          </p>
        )}

        <div className="text-center">
          <button
            className={`px-4 py-2 mt-1 rounded font-semibold transition-transform duration-300 ${
              hasCoupon === true
                ? "bg-white text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-300 hover:scale-105"
            }`}
            disabled={hasCoupon === true}
            onClick={async () => {
              if (hasCoupon === false) {
                const session = await getSession();
                if (!session?.user?.token) {
                  alert("You must be logged in to redeem a coupon.");
                  return;
                }
                const token = session.user.token;

                const existing = await getMyCoupon(token);
                const alreadyHas = existing?.data?.some(
                  (c: any) => c.name === couponName && c.status !== "used"
                );
                if (alreadyHas) {
                  alert("You already redeemed this coupon.");
                  setHasCoupon(true);
                  return;
                }

                const response = await createCoupon(
                  token,
                  couponName,
                  percentage,
                  minDisc,
                  minSp,
                  new Date(Date.now() + valid * 24 * 60 * 60 * 1000)
                );

                console.log(response);
                alert("Coupon redeemed successfully!");
                setHasCoupon(true);
              }
            }}
          >
            {hasCoupon === true ? "REDEEMED" : "REDEEM"}
          </button>
        </div>
      </div>
    </div>
  );
}
