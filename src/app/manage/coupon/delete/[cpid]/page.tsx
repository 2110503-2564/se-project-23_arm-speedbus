// app/coupon/delete/[cid]/page.tsx

'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import getCoupon from "@/libs/getCoupons";
import deleteCoupon from "@/libs/deleteCoupon";
import { CouponItem } from "interfaces";
import dayjs from "dayjs";

export default function CouponCidDeletePage({
  params,
}: {
  params: { cid: string };
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [coupon, setCoupon] = useState<CouponItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const data = await getCoupon(session?.user.token, params.cid);
        setCoupon(data.data);
      } catch (err) {
        setError("Failed to fetch coupon details.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user.token) {
      fetchCoupon();
    }
  }, [params.cid, session?.user.token]);

  const handleDelete = async () => {
    try {
      await deleteCoupon(session!.user.token, params.cid);
      alert("Coupon deleted successfully.");
      router.push("/coupon");
    } catch (err) {
      setDeleteError("Failed to delete the coupon.");
    }
  };

  if (!session || session.user.User_info.role !== "admin") {
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        You are not an administrator. Access denied.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center text-xl text-black p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        Loading...
      </div>
    );
  }

  if (error || !coupon) {
    return (
      <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto">
        {error ?? "Coupon not found."}
      </div>
    );
  }

  return (
    <main className="text-left p-8 min-h-screen flex flex-col items-center mt-10">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl border border-black">
        <div className="bg-black text-white w-full md:w-1/2 p-6 flex flex-col justify-center items-center font-rockwellCondensed">
          <div className="text-[96px]">{coupon.percentage}%</div>
          <div className="text-[18px] mt-4">{coupon.name}</div>
        </div>
        <div className="p-6 flex flex-col justify-between w-full font-robotoMono">
          <div className="space-y-2 text-black">
            <h1 className="text-3xl font-bold mb-6">{coupon.name}</h1>
            <div>Max Discount: ${coupon.maxDiscount}</div>
            <div>Min Spend: ${coupon.minSpend}</div>
            <div>Spent: ${coupon.spent}</div>
            <div>Expires: {dayjs(coupon.expirationDate).format("YYYY-MM-DD")}</div>
            <div>Status: {coupon.status}</div>
          </div>
          {deleteError && (
            <div className="mt-4 text-md text-red-600 bg-red-100 p-2 rounded">
              {deleteError}
            </div>
          )}
          <button
            onClick={handleDelete}
            className="text-red-600 border border-red-600 px-5 py-2 rounded-full text-sm hover:bg-red-600 hover:text-white transition mt-6"
          >
            Delete Coupon
          </button>
        </div>
      </div>
    </main>
  );
}
