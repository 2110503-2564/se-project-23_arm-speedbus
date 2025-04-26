export default async function changeRentDate(
  token: string,
  id: string,
  startDate: string,
  endDate: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/rents/${id}`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startDate: startDate,
        endDate: endDate,
      }),
    }
  );

  const updatedReservation = await response.json();
  return updatedReservation;
}
