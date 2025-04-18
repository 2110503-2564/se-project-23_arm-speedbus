export default async function createCoupon(
  token: string,
  couponName: string,
  percentage: number,
  minDisc: number,
  minSp: number,
  expirationDate: Date
) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/rewards`, {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: couponName,
      percentage: percentage,
      minDiscount: minDisc,
      minSpend: minSp,
      expirationDate: expirationDate,
    }),
  });
  return await response.json();
}
