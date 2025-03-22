import Link from "next/link";

export default function manageCarsPage(){
    return (
        <>
            <Link href={"/manage/car/add"}><div className="text-xl">Add a Car.</div></Link>
            <Link href={"/manage/car/update"}><div className="text-xl">Update a Car.</div></Link>
            <Link href={"/manage/car/delete"}><div className="text-xl">Delete a Car.</div></Link>
        </>
    )
}