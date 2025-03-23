export default async function deleteProvider(token:string,id:string){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/providers/${id}`,{
        cache:"no-store",
        method:"DELETE",
        headers:{
            authorization:`Bearer ${token}`,
            "Content-type":"application/json"
        }});
    return await response.json();
}