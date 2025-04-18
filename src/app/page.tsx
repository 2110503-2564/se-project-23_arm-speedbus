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
    <main className="bg-[#ffffff] min-h-screen">
      <HeadSection />

      <div className="py-20 bg-[#ffffff]">
        <Suspense
          fallback={
            <p>
              Loading ... <LinearProgress />
            </p>
          }
        >
          <CarCatalogMain carJson={cars} />
        </Suspense>
      </div>
      
      <div className="w-full h-[490px] bg-[#800000]"></div>

      <div className="text-center py-20 items-center bg-white">
      <div className="w-full max-w-screen-xl mx-auto px-4 mb-6 flex justify-between items-center font-robotoMono">
        <h2 className="text-black text-2xl  tracking-widest font-robotoMono">
        PICK YOUR PROVIDER FOR NEW EXPERIENCE
        </h2>
        <div className="border-t border-black w-8 px-4 mr-auto"></div>
        <Link
          href="/car"
          className="text-black border border-black px-4 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
        >
          View all
        </Link>
      </div>

        <Suspense
          fallback={
            <p>
              Loading ... <LinearProgress />
            </p>
          }
        >
          <ProviderCatalogMain providerJson={providers} />
        </Suspense>
      </div>

      <div className="text-center h-[100vh] py-16 px-4 items-center flex flex-col justify-center text-black snap-start">
        <div className="bg-[#D9D9D9] w-full py-16">
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
                Explore a variety of cars from different brands and models to
                suit your needs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-600">
                Get the best deals and competitive pricing on all our car
                catalogs.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-800 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Providers</h3>
              <p className="text-gray-600">
                Partnered with reliable providers to ensure quality and
                satisfaction.
              </p>
            </div>
          </div>
        </div>
        <ButtonsMain />
      </div>
    </main>
  );
}