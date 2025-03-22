import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProviderItem,ProviderJson } from "interfaces";

export default async function ProviderCatalog({providerJson}:{providerJson:ProviderJson}){
    const providerJsonReady = await providerJson;
    return (
        <>
            We have up to {providerJsonReady.data.length} providers in our shop.
            <div style={{margin:"20px", display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"}}>
               {
                providerJsonReady.data.map((providerItem:ProviderItem)=>(
                    <Link href={`/provider/${providerItem.id}`}
                    className="w-[100%] sm:w-[50%] md:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8">
                        <ProductCard Name={providerItem.name} imgSrc={providerItem.picture}/>
                    </Link>
                ))
               }
            </div>
        </>
    );
}