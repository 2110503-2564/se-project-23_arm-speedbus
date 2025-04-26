export default async function getCar(id: string) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${id}`, {
    next: { tags: ["car"] },
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
