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
  }, [session]); // Run this effect when session changes

  return (
    <div className="flex flex-wrap justify-center items-center mt-10">
      {myCoupon?.data.map((couponItem) => (
        <div key={couponItem._id} >
          <CouponCardItem
            couponName={couponItem.name}
            minDisc={couponItem.minDisc}
            minSp={couponItem.minSp}
            percentage={couponItem.percentage}
            spent={couponItem.spent}
            valid={couponItem.valid}
          />
        </div>
      ))}
    </div>
  );
}
