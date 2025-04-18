export default async function createCoupon(
  token: string,
  percentage: number,
  requirement: string,
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
      percentage: percentage,
      requirement: requirement,
      expirationDate: expirationDate,
    }),
  });
  return await response.json();
}
