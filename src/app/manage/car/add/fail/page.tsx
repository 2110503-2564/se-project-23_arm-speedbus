import Link from "next/link";

export default function AddCarFail(){
    return (
        <div>
        <div className="text-2xl text-center mt-5">Cannot Add Car! Check your data. VIN must be unique and doesn't have the same value as other cars. And/Or Provider ID must be exist in the database.</div>
        <Link href="/manage/car/add" className="text-2xl bg-white m-2 p-2">Retry - Click here to Add Car</Link>
        </div>
    )
}