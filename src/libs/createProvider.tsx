export default async function createProvider(
  token: string,
  name: string,
  address: string,
  tel: string,
  email: string,
  picture: string,
  openTime: string,
  closeTime: string
) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/providers`, {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      address: address,
      tel: tel,
      email: email,
      picture: picture,
      openTime: openTime,
      closeTime: closeTime,
    }),
  });
  return await response.json();
}
