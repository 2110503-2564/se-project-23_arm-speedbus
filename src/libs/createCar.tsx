export default async function createCar(
  token: string,
  name: string,
  vin_plate: string,
  provider_info: string,
  picture: string,
  capacity: Number,
  description: string,
  pricePerDay: number
) {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars`, {
    cache: "no-store",
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      vin_plate: vin_plate,
      provider_info: provider_info,
      picture: picture,
      capacity: capacity,
      description: description,
      pricePerDay: pricePerDay,
    }),
  });
  return await response.json();
}
