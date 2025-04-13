import ButtonsMain from "@/components/ButtonsMain";
import CarCatalogMain from "@/components/CarCatalogMain";
import HeadSection from "@/components/HeadSection";
import ProviderCatalogMain from "@/components/ProviderCatalogMain";
import getCars from "@/libs/getCars";
import getProviders from "@/libs/getProviders";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const cars = await getCars();
  const providers = await getProviders();
  revalidateTag("providers");

  return (
    <main className="bg-[#ffffff] min-h-screen" >
      <HeadSection />


      <div className="py-20 bg-[#ffffff]">
        <Suspense
          fallback={<p>Loading ... <LinearProgress /></p>}
        >
        <CarCatalogMain carJson={cars} />
        </Suspense>

        <div className="flex flex-row text-center items-center justify-center text-white font-semibold text-xl">
        <Link href="/car">
          <div className="bg-blue-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
            View Cars
          </div>
        </Link>
        </div>
      </div>

      <div className="text-center py-20 items-center bg-[#a9b6f5]">
        <h1 className={`text-4xl font-extrabold m-5 font-jubilee text-white`}>
          ...And Our Trusted Car Providers
        </h1>

        <Suspense
          fallback={<p>Loading ... <LinearProgress /></p>}
        >
        <ProviderCatalogMain providerJson={providers} />
        </Suspense>
        <div className="flex flex-row text-center items-center justify-center text-white font-semibold text-xl">
        <Link href="/provider">
          <div className="bg-blue-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
            View Providers
          </div>
        </Link>
        </div>
      </div>
      

      <div className="text-center h-[100vh] py-16 px-4 items-center flex flex-col justify-center bg-gray-200 text-black snap-start">
          <div className="bg-[#f7f7f7] w-full py-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  🚗
                </div>
                <h3 className="text-xl font-semibold mb-2">Exotic Selection</h3>
                <p className="text-gray-600">
                  Explore a variety of cars from different brands and models to suit your needs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  💰
                </div>
                <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
                <p className="text-gray-600">
                  Get the best deals and competitive pricing on all our car catalogs.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  ⭐
                </div>
                <h3 className="text-xl font-semibold mb-2">Trusted Providers</h3>
                <p className="text-gray-600">
                  Partnered with reliable providers to ensure quality and satisfaction.
                </p>
              </div>
            </div>
          </div>
          <ButtonsMain />
          <div className="flex flex-row text-center items-center justify-center text-white font-semibold text-xl">
            <Link href="/game">
            <div className="bg-red-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
              Play Car Jumper
            </div>
            </Link>
          </div>

      </div>
    </main>
  );
}
