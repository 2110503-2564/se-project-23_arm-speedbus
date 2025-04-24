// Only asdmin can use this function

export default async function getAllRatings(token: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/ratings/all`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return await response.json();
}
