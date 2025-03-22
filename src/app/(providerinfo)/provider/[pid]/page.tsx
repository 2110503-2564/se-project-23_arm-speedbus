import Image from "next/image";
import Link from "next/link";
import { CarItem, CarJson, ProviderItem } from "interfaces";
import getProvider from "@/libs/getProvider";
export default async function ProviderDetailPage({params}:{params:{pid:string}}){
    const providerDetail = await getProvider(params.pid)
    const providerItem:ProviderItem = providerDetail.data
    return (
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{providerItem.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={providerItem.picture} alt='Provider Image' width={0} height={0} sizes="100vw"
                className="rounded-lg w-[30%]"/>
                <div>
                    <div className="text-md mx-5">Address : {providerItem.address}</div>
                    <div className="text-md mx-5">Tel. : {providerItem.tel}</div>
                    <div className="text-md mx-5">Email : {providerItem.email}</div>
                    <div className="text-md mx-5">Open Time : {providerItem.openTime}</div>
                    <div className="text-md mx-5">Close Time : {providerItem.closeTime}</div>
                </div>
            </div>
        </main>
    );
}