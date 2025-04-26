export default async function getProviders() {
  // await new Promise((resolve)=>{setTimeout(resolve,5000);})
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/providers`, {
    next: { tags: ["providers"] },
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  return await response.json();
}
