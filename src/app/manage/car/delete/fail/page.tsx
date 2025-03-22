import Link from "next/link";

export default function DeleteCarFail(){
    return (
        <div>
        <div className="text-2xl text-center mt-5">Cannot Delete Car! Check your data. Car ID must exist in the database.</div>
        <Link href="/manage/car/delete" className="text-2xl bg-white m-2 p-2">Retry - Click here to Delete a Car</Link>
        </div>
    )
}