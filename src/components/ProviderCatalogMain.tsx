"use client";
import Link from "next/link";
import ProviderCard from "./ProviderCard";
import { ProviderItem, ProviderJson } from "interfaces";
const MAX_PROVIDERS_DISPLAYED = 3;

export default async function ProviderCatalogMain({ providerJson }: { providerJson: ProviderJson }) {
  const providerJsonReady = await providerJson;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-8 px-4"> 
        {providerJsonReady.data.slice(0, Math.min(providerJsonReady.data.length, 3)).map((providerItem: ProviderItem, index) => (
          <Link
            href={`/provider/${providerItem.id}`}
            key={providerItem.id}
            className={`w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group opacity-0 transition-transform duration-1000 animate-slide-up`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div className="border border-gray-300  overflow-hidden shadow-lg bg-white relative group hover:scale-105 transition-all ease-in-out">
              <ProviderCard providerName={providerItem.name} imgSrc={providerItem.picture} email={providerItem.email} phoneNum={providerItem.tel}/>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
              <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xl font-bold text-white">Explore</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-in-out forwards;
        }

        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-up {
          animation: slideUp 1s ease-in-out forwards;
        }
      `}</style>
    </>
  );
}
