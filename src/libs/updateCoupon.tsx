export default async function updateCoupon(
  token: string,
  id: string,
  percentage: Number,
  requirement: string,
  expirationDate: Date,
  status: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/rewards/${id}`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        percentage: percentage,
        requirement: requirement,
        expirationDate: expirationDate,
        status: status,
      }),
    }
  );

  const updatedCoupon = await response.json();
  return updatedCoupon;
}
