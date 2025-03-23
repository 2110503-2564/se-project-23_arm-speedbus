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
                </div>:<div className="text-2xl">You are not admin. Get out</div>
            }
        </main>
    );
}