export default async function createBooking(
  token: string,
  car_id: string,
  user_id: string,
  startDate: string,
  endDate: string,
  couponName: string,
  discount: number,
  maxDiscount: number
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/cars/${car_id}/rents`,
    {
      cache: "no-store",
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        car_info: car_id,
        user_info: user_id,
        startDate: startDate,
        endDate: endDate,
        couponName: couponName,
        discount: discount,
        maxDiscount: maxDiscount,
        status: "Confirmed",
      }),
    }
  );
  return await response.json();
}
