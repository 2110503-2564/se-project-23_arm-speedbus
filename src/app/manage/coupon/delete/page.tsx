// app/coupon/delete/page.tsx

import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import getCoupons from "@/libs/getCoupons";
import CouponDeleteList from "@/components/CouponDeleteList";

export default async function DeleteCouponPage() {
  const session = await getServerSession(authOptions);
  const coupons = await getCoupons();

  return (
    <main className="text-center p-5">
      {session?.user.User_info.role === "admin" ? (
        <div>
          <h1 className="text-xl font-medium font-robotoMono mb-4">
            Select the Coupon You Want to Delete
          </h1>
          <Suspense fallback={<p>Loading... <LinearProgress /></p>}>
            <CouponDeleteList couponJson={coupons} />
          </Suspense>
        </div>
      ) : (
        <div className="text-center text-xl text-red-600 p-4 bg-slate-100 rounded-lg shadow-md max-w-md mx-auto font-robotoMono">
          You are not an administrator. Access denied.
        </div>
      )}
    </main>
  );
}
