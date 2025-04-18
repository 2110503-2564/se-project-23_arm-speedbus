import CouponCard from "@/components/CouponCard";

const couponData = [
  { name: "new user coupon", percentage: 10, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
  { name: "new user coupon", percentage: 15, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
  { name: "new user coupon", percentage: 20, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
  { name: "new user coupon", percentage: 25, minDisc: 100, minSp: 10, spent: 1, valid: 3 },
];

export default function Page() {
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-white">
      {couponData.map((coupon, index) => (
        <CouponCard
          key={index}
          couponName={coupon.name}
          percentage={coupon.percentage}
          minDisc={coupon.minDisc}
          minSp={coupon.minSp}
          spent={coupon.spent}
          valid={coupon.valid}
        />
      ))}
    </div>
  );
}
