import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
export default async function manageCarsPage(){
    const session = await getServerSession(authOptions)
    return (
        <>
            {session?.user.User_info.role==='admin'?
            <div>
                <Link href={"/manage/car/add"}><div className="text-xl">Add a Car.</div></Link>
                <Link href={"/manage/car/update"}><div className="text-xl">Update a Car.</div></Link>
                <Link href={"/manage/car/delete"}><div className="text-xl">Delete a Car.</div></Link>
            </div>:<div className="text-xl">You are not administrator. Get lost</div>}
        </>
    )
}