export default async function getRent(token: string, id: string) {
  // await new Promise((resolve)=>{setTimeout(resolve,5000);})
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/rents/${id}`,
    {
      cache: "no-store",
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  return await response.json();
}
