"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import getMyCoupon from "@/libs/getMyCoupon";
import { CouponJson, RatingItem } from "interfaces";
import Link from "next/link";
import getMyRatings from "@/libs/getMyRatings";
import MyReviewCard from "@/components/MyReviewCard";

export default function Page() {
  const { data: session } = useSession();
  const [myRating, setMyRating] = useState<RatingItem>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        if (!session?.user.token) return;
        const rating = await getMyRatings(session.user.token);
        setMyRating(rating);
      } catch (err) {
        console.log("Cannot fetch my coupon");
      } finally {
        setLoading(false);
      }
    };

    fetchRating();
  }, [session]);

  return (
    <div className="mt-[100px] mb-[100px] flex justify-center items-center font-robotoMono">
      <div className="px-6 max-w-3xl w-full bg-white font-robotoMono">
        {loading ? (
          <p className="text-center text-black font-robotoMono">Loading...</p>
        ) : myRating?.data.length === 0 ? (
          <div className="text-center text-black font-robotoMono py-10">
            <p className="text-3xl mb-4">You don't have any Rating.</p>
            <Link
              href="/coupon"
              className="mt-3 border border-black rounded-full py-1.5 px-8 text-sm hover:bg-black hover:text-white transition font-robotoMono"
            >
              Redeem Now
            </Link>
          </div>
        ) : (
          myRating?.data.map((rating) => (
            <div key={rating._id}>
              <MyReviewCard
                rentId={rating.rent_info._id}
                name={rating.car_info.name}
                rating={rating.car_rating}
                review={rating.review}
                created={new Date(rating.createdAt)}
              ></MyReviewCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
