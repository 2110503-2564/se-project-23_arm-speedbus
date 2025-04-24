export default async function createRating(
  token: string,
  rent_info: string,
  car_ratings: number,
  provider_rating: number,
  review: string
) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/ratings`, {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      rent_info: rent_info,
      car_ratings: car_ratings,
      provider_rating: provider_rating,
      review: review,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
