export default async function updateRating(
  token: string,
  id: string,
  car_ratings: number,
  provider_rating: number,
  review: string
) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/ratings/${id}`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        car_ratings: car_ratings,
        provider_rating: provider_rating,
        review: review,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update rating");
  }

  return await response.json();
}
