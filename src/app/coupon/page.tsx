import CouponCardItem from "@/components/CouponCardItem";
import CouponCardWrapper from "@/components/CouponCardWrapper";

const couponData = [
  {
    name: "10% Discount",
    percentage: 10,
    maxDisc: 100,
    minSp: 10,
    spent: 1,
    valid: 3,
    redeemed: true,
  },
  {
    name: "15% Discount",
    percentage: 15,
    maxDisc: 200,
    minSp: 10,
    spent: 1,
    valid: 3,
    redeemed: false,
  },
  {
    name: "20% Discount",
    percentage: 20,
    maxDisc: 300,
    minSp: 10,
    spent: 1,
    valid: 3,
    redeemed: false,
  },
  {
    name: "25% Discount",
    percentage: 25,
    maxDisc: 400,
    minSp: 10,
    spent: 1,
    valid: 3,
    redeemed: false,
  },
];

export default function Page() {
  return (
    <div className="flex flex-wrap justify-center items-center min-h-screen bg-white">
      {/* <CouponCardWrapper/> */}
      {couponData.map((c, i) => (
        <CouponCardItem
          couponName={c.name}
          percentage={c.percentage}
          maxDisc={c.maxDisc}
          minSp={c.minSp}
          spent={c.spent ?? 0}
          valid={c.valid}
          redeemed={c.redeemed}
        />
      ))}
    </div>
  );
}
