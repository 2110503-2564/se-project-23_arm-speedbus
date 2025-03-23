import getCars from "@/libs/getCars"
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CarDeleteList from "@/components/CarDeleteList";
import { redirect } from "next/navigation";
import deleteCar from "@/libs/deleteCar";
export default async function DeleteCarPage(){
    const session = await getServerSession(authOptions);
    const cars = await getCars();
    const removeCar = async(formData:FormData)=>{
            'use server'
            const carID = formData.get("carID") as string;
            if(session&&carID){
                const res = await deleteCar(session.user.token,carID)
                console.log(res.success)
                console.log('typeof res.success:', typeof res.success);
                if(res.success===false){
                    console.log("redirecting to fail page")
                    redirect("/manage/car/delete/fail")
                }
                else{
                    revalidateTag('cars')
                    console.log("redirecting to car page")
                    redirect("/car")
                }
            }
        }
    revalidateTag('cars')
    return (
        <main className="text-center p-5">
            {
                session?.user.User_info.role==='admin'? 
                <div>
                    <h1 className="text-xl font-medium">Select the Car You Want to Delete</h1>
                    <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                        <CarDeleteList carJson={cars}/>
                    </Suspense>
                    <hr className="my-10"/>
                    <form action={removeCar} className="space-y-3">
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Car ID You Want to Delete</label>
                        <input type="text" name="carID" placeholder="Car's ID" />
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Delete the car</button>
                </form>    
                </div>:<div className="text-2xl">You are not admin. Get out</div>
            }
        </main>
    );
}