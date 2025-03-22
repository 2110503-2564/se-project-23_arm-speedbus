export default async function getCar(id:string){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/cars/${id}`,{
        cache:"no-store",
        method:"GET",
        headers:{
            "Content-type":"application/json"
        }});
    if(!response.ok){
        throw new Error("failed to fetch the car");
    }
    return await response.json();
}