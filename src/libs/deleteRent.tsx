export default async function deleteRent(token: string, id: string) {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/rents/${id}`,
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
