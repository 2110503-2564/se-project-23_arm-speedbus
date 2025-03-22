import Link from "next/link";
import ProductCard from "./ProductCard";
import { ProviderItem, ProviderJson } from "interfaces";

export default async function ProviderCatalog({
  providerJson,
}: {
  providerJson: ProviderJson;
}) {
  const providerJsonReady = await providerJson;
  return (
    <>
      <div className="text-3xl font-[Verdana,Geneva,Tahoma,sans-serif] text-center mb-8 text-[#333] text-[#FFF2F2]">
        We have up to {providerJsonReady.data.length} providers in our shop.
      </div>
      <div className="flex flex-wrap justify-center gap-8 px-4">
        {providerJsonReady.data.map((providerItem: ProviderItem) => (
          <Link
            href={`/provider/${providerItem.id}`}
            key={providerItem.id}
            className="w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group"
          >
            <div className="border border-gray-300 rounded-lg overflow-hidden shadow-lg bg-white relative group hover:scale-105 transition-all ease-in-out">
              <ProductCard
                Name={providerItem.name}
                imgSrc={providerItem.picture}
              />

              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold text-white">Explore</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
