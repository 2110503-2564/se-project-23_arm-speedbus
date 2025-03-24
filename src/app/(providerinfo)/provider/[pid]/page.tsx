import Image from "next/image";
import { redirect } from "next/navigation";
import { CarItem, CarJson, ProviderItem } from "interfaces";
import getProvider from "@/libs/getProvider";
import Link from "next/link";
export default async function ProviderDetailPage({params}:{params:{pid:string}}){
    const providerDetail = await getProvider(params.pid)
    const providerItem:ProviderItem = providerDetail.data
    return (
        <main className="text-left p-5 items-center justify-center">
            <div className="flex flex-row my-5 bg-white rounded-xl w-[60%] mx-auto text-gray-800">
                <Image src={providerItem.picture} alt='Provider Image' width={0} height={0} sizes="100vw"
                className="object-cover rounded-l-xl w-[45%]"/>
                <div className="flex flex-col w-[55%]">
                <h1 className="text-xl font-bold m-5 font-bold text-[#2d336b]">Provider {providerItem.name}'s Info</h1>
                <div className="grid grid-cols-2 gap-3 mx-5 w-auto">
                    <div className="text-md font-semibold">Address:</div>
                    <div className="text-md">{providerItem.address}</div>
                    <div className="text-md font-semibold">Tel:</div>
                    <div className="text-md">{providerItem.tel}</div>
                    <div className="text-md font-semibold">Email:</div>
                    <div className="text-md">{providerItem.email}</div>
                    <div className="text-md font-semibold">Open Time:</div>
                    <div className="text-md">{providerItem.openTime}</div>
                    <div className="text-md font-semibold">Close Time:</div>
                    <div className="text-md">{providerItem.closeTime}</div>
                    <div className="text-md font-semibold">Provider ID:</div>
                    <div className="text-md">{providerItem._id}</div>
                    <Link href={`/provider/${params.pid}/car`} className="mt-6 text-center w-[75%] bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition">
                        View Their Cars
                    </Link>
                </div>
                </div>
            </div>
        </main>
    );
}