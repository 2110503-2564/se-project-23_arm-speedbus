import CouponCardItem from "@/components/CouponCardItem";
import CouponCardWrapper from "@/components/CouponCardWrapper";

const couponData = [
  { name: "new user coupon", percentage: 10, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
  { name: "new user coupon", percentage: 15, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
  { name: "new user coupon", percentage: 20, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
  { name: "new user coupon", percentage: 25, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
];

export default function Page() {
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-white">
      <CouponCardWrapper/>
    </div>
  );
}
