export default async function getMyRatings(token: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/ratings/me`, {
    cache: "no-store",
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
