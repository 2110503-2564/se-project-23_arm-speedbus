export default async function getRents(token:string){
    // await new Promise((resolve)=>{setTimeout(resolve,5000);})
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/rents`,{
        cache:"no-store",
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`,
            "Content-type":"application/json"
        }
    });
    if(!response.ok){
        throw new Error("Failed to fetch cars");
    }
    return await response.json();
}