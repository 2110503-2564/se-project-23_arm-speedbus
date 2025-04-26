export default async function deleteExpiredCoupons(token: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/coupons/expired`,
    {
      cache: "no-store",
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  return await response.json();
}
