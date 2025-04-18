export default async function getMyCoupon(token:string){
    const response = await fetch(`${process.env.BACKEND_URL}/rewards/user}`,{
        cache:"no-store",
        method:"GET",
        headers:{
            authorization:`Bearer ${token}`,
            "Content-type":"application/json"
        }});
    return await response.json();
}