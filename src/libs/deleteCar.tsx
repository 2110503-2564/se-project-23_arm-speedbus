export default async function deleteCar(token: string, id: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${id}`, {
    cache: "no-store",
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
