export default async function finishRent(token: string, id: string) {
  // await new Promise((resolve)=>{setTimeout(resolve,5000);})
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/v1/rents/finish/${id}`,
    {
      cache: "no-store",
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    }
  );
  return await response.json();
}
