import SpendingMilestoneBar from "@/components/milestonebar";

export default function Page() {
    
const couponData = [
    {
      name: "10% Discount",
      percentage: 10,
      maxDisc: 100,
      minSp: 10,
      spent: 1,
      valid: 3,
      redeemed: true,
      milestones : 25
    },
    {
      name: "15% Discount",
      percentage: 15,
      maxDisc: 200,
      minSp: 10,
      spent: 1,
      valid: 3,
      redeemed: false,
      milestones : 75
    },
    {
      name: "20% Discount",
      percentage: 20,
      maxDisc: 300,
      minSp: 10,
      spent: 1,
      valid: 3,
      redeemed: false,
      milestones : 425
    },
    {
      name: "25% Discount",
      percentage: 25,
      maxDisc: 400,
      minSp: 10,
      spent: 1,
      valid: 3,
      redeemed: false,
      milestones : 525
    },
  ];
  const currentSpending = 27;

  return (
    <div className="pt-24 flex justify-center">
        <h1>Milestone</h1>
      <SpendingMilestoneBar currentSpending={currentSpending} coupon={couponData} />
    </div>
  );
}
