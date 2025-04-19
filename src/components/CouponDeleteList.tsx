'use client'
import Link from "next/link";
import { CouponJson } from "interfaces";

export default function CouponDeleteList({ couponJson }: { couponJson: CouponJson }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-4">
      {couponJson.data.map((coupon) => (
        <Link
          href={`/coupon/delete/${coupon._id}`}
          key={coupon._id}
          className="p-4 border border-black rounded-lg shadow hover:bg-gray-100 transition-all"
        >
          <h2 className="text-xl font-semibold font-robotoMono">{coupon.name}</h2>
          <p className="text-sm">Discount: {coupon.percentage}%</p>
          <p className="text-sm">Max: ${coupon.maxDiscount}</p>
          <p className="text-sm">Min Spend: ${coupon.minSpend}</p>
          <p className="text-sm">Status: {coupon.status}</p>
        </Link>
      ))}
    </div>
  );
}
