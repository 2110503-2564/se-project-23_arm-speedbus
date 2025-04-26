export default async function updateRedeemStatusInUser(
  token: string,
  redeemCouponStatus: boolean[]
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/auth/updateDetails`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        redeemCouponStatus: redeemCouponStatus,
      }),
    }
  );

  const updatedCoupon = await response.json();
  return updatedCoupon;
}
