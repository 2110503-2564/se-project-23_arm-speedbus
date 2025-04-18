export default async function getCars() {
  // await new Promise((resolve)=>{setTimeout(resolve,5000);})
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars`, {
    next: { tags: ["cars"] },
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
