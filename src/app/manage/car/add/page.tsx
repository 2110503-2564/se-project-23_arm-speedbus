import { redirect } from "next/navigation"
import { useState } from "react";
import createCar from "@/libs/createCar";
import { revalidateTag } from "next/cache";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export default async function AddCarPage(){
    const session = await getServerSession(authOptions);
    const addCar = async(formData:FormData)=>{
        'use server'
        const name = formData.get("name") as string;
        const vin = formData.get("vin_plate") as string;
        const providerID = formData.get("provider_info") as string;
        const picture = formData.get("picture") as string;
        const capacity = formData.get("capacity") as string;
        const model = formData.get("model") as string;
        const pricePerDay = formData.get("pricePerDay") as string;
        if(session&&name&&vin&&providerID&&picture&&capacity&&model&&pricePerDay){
            const res = await createCar(session.user.token,name,vin,providerID,picture,Number(capacity),model,Number(pricePerDay))
            console.log(res.success)
            console.log('typeof res.success:', typeof res.success);
            if(res.success===false){
                console.log("redirecting to fail page")
                redirect("/manage/car/add/fail")
            }
            else{
                revalidateTag('cars')
                console.log("redirecting to car page")
                redirect("/car")
            }
        }
    }
    return(
        <>
            {session?.user.User_info.role==='admin'?
                <form action={addCar} className="space-y-3">
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="name">Car Name</label>
                        <input type="text" name="name" placeholder="Car's Name" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="vin_plate">VIN</label>
                        <input type="text" name="vin_plate" placeholder="VIN" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="provider_info">Car Provider ID</label>
                        <input type="tel" name="provider_info" placeholder="Provider's ID" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="picture">Car Picture</label>
                        <input type="text" name="picture" placeholder="Car's Picture URL" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="capacity">Car Capacity</label>
                        <input type="number" name="capacity" placeholder="Capacity" min={1}/>
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="model">Car Model</label>
                        <input type="text" name="model" placeholder="Model or Description" />
                    </div>
                    <div className="flex items-center w-1/2 my-2">
                        <label className="w-auto block text-gray-700 pr-4" htmlFor="pricePerday">Daily Rental Rate</label>
                        <input type="number" name="pricePerDay" placeholder="Daily Rental Rate" min={1}/>
                    </div>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded">Add New Car</button>
                </form>:<div className="text-xl">You are not admin. Don't even try.</div>
            }
        </>
    )
}