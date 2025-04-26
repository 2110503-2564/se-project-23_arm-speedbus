export default async function createCoupon(
  token: string,
  couponName: string,
  percentage: number,
  maxDisc: number,
  minSp: number,
  expirationDate: Date
) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/coupons`, {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: couponName,
      percentage: percentage,
      maxDiscount: maxDisc,
      minSpend: minSp,
      expirationDate: expirationDate,
    }),
  });
  return await response.json();
}
