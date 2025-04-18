export default async function getProvider(id: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/providers/${id}`,
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
