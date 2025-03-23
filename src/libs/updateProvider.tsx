export default async function updateProvider(token:string,id:string,name:string,address:string,tel:string,email:string,picture:string,openTime:string,closeTime:string) {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/providers/${id}`,
      {
        cache: "no-store",
        method: "PUT",
        headers: {
          authorization:`Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name:name,
          address:address,
          tel:tel,
          email:email,
          picture:picture,
          openTime:openTime,
          closeTime:closeTime
        }),
      }
    );

    const updatedReservation = await response.json();
    return updatedReservation;
  }
