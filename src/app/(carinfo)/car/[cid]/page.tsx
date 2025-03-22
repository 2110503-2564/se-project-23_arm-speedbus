import Image from "next/image";
import getCar from "@/libs/getCar"
import Link from "next/link";
import { CarItem, CarJson } from "interfaces";
export default async function CarDetailPage({params}:{params:{cid:string}}){
    const carDetail = await getCar(params.cid)
    const carItem:CarItem = carDetail.data
    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{carDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={carDetail.data.picture} alt='Car Image' width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div>
                    <div className="text-md mx-5 text-left">{carItem.model}</div>
                    <div className="text-md mx-5">VIN : {carItem.vin_plate}</div>
                    <div className="text-md mx-5">Provider : {carItem.provider_info.name}</div>
                    <div className="text-md mx-5">Capacity : {carItem.capacity}</div>
                    <div className="text-md mx-5">Daily Rental Rate : {carItem.pricePerDay}</div>
                    <Link href={`/reservations?id=${params.cid}&model=${carDetail.data.model}`}>
                    <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm">Make Reservation</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}