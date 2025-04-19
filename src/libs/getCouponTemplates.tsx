export default async function getCouponTemplates() {
  // await new Promise((resolve)=>{setTimeout(resolve,5000);})
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/coupon-templates`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );
  return await response.json();
}
