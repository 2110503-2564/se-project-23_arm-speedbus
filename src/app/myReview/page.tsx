"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { RatingItem } from "interfaces";
import Link from "next/link";
import getMyRatings from "@/libs/getMyRatings";
import MyReviewCard from "@/components/MyReviewCard";

export default function Page() {
  const { data: session } = useSession();
  const [myRating, setMyRating] = useState<RatingItem>();
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

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
          myRating?.data.map((ratingItem) => (
            <div key={ratingItem._id}>
              <MyReviewCard
                rating={ratingItem}
                editingId={editingId}
                onSelect={(selectedRatingId) => {
                  setEditingId(selectedRatingId);
                }}
              ></MyReviewCard>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
