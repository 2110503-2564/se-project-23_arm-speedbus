"use client"

import CouponCardItem from "@/components/CouponCardItem";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import getMyCoupon from "@/libs/getMyCoupon";
import { CouponJson } from "interfaces";

export default function Page() {
  const { data: session } = useSession();
  const [myCoupon, setMyCoupon] = useState<CouponJson>();

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        if (!session?.user.token) return;
        const coupon = await getMyCoupon(session.user.token);
        setMyCoupon(coupon);
      } catch (err) {
        console.log("Cannot fetch my coupon");
      }
    };

    fetchCoupons();
  }, [session,]); // Run this effect when session changes

  console.log(JSON.stringify(myCoupon));

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="border px-6 pt-4 rounded-md shadow-md font-mono max-w-3xl w-full bg-white">
        {myCoupon?.data.map((coupon) => (
          <div key={coupon._id} className="mb-4 border-b pb-4">
            <div className="flex justify-between text-lg text-black">
              <div>
                <p><strong>Name:</strong> {coupon.name}</p>
                <p><strong>Status:</strong> <span className="text-green-600">{coupon.status}</span></p>
                <p><strong>Redeemed:</strong> {coupon.redeemed ? "Yes" : "No"}</p>
              </div>
              <div>
                <p><strong>Requirement:</strong> {coupon.requirement}</p>
                <p><strong>Minimum Spend:</strong> ${coupon.minSp}</p>
                <p><strong>Max Discount:</strong> ${coupon.maxDisc}</p>
                <p><strong>Discount %:</strong> {coupon.percentage}%</p>
                <p><strong>Valid For:</strong> {coupon.valid} days</p>
                <p><strong>Expiration Date:</strong> {new Date(coupon.expirationDate).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
  
  
}
