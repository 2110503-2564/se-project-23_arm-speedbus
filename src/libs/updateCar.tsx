export default async function updateCar(id: string, editData: any) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/cars/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      }
    );

    if (response.ok) {
      const updatedReservation = await response.json();
      return updatedReservation;
    } else {
      throw new Error("Failed to update reservation");
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
    throw error;
  }
}
