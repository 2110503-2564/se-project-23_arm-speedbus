"use client";

// import CouponCardItem from "@/components/CouponCardItem";
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

  console.log(JSON.stringify(myCoupon));

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 font-robotoMono">
      <div className="border px-6 pt-4 rounded-md font-robotoMono shadow-md font-mono max-w-3xl w-full bg-white mt-[15vh]">
        {myCoupon?.data.map((coupon) => (
          <div key={coupon._id} className="mb-4 border-b pb-4">
            <div className="flex justify-between text-lg text-black">
              <div>
                <p>
                  <strong className="font-robotoMono">Name:</strong>{" "}
                  {coupon.name}
                </p>
                <p>
                  <strong className="font-robotoMono">Status:</strong>{" "}
                  <span className="font-robotoMono text-green-600">
                    {coupon.status}
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <strong className="font-robotoMono">Minimum Spend:</strong> $
                  {coupon.minSpend}
                </p>
                <p>
                  <strong className="font-robotoMono">Max Discount:</strong> $
                  {coupon.maxDiscount}
                </p>
                <p>
                  <strong className="font-robotoMono">Discount %:</strong>{" "}
                  {coupon.percentage}%
                </p>

                <p>
                  <strong className="font-robotoMono">Expiration Date:</strong>{" "}
                  {new Date(coupon.expirationDate).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
