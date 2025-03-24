
import CarCatalog from "@/components/CarCatalogMain";
import CarCatalogMain from "@/components/CarCatalogMain";
import HeadSection from "@/components/HeadSection";
import getCars from "@/libs/getCars";
import { LinearProgress } from "@mui/material";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { Suspense } from "react";

export default async function Home() {
  const cars = await getCars();
  revalidateTag("cars");

  return (
    <main className="bg-[#7886C7] min-h-screen" >
      <HeadSection />


      <div className="text-center h-[100vh] py-20 items-center bg-[#94a6f7]">
        <h1
          className={`text-4xl font-extrabold m-5 font-jubilee text-[#FFF2F2]`}
        >
          View Our Amazing Car Catalogs
        </h1>

        <Suspense
          fallback={
            <p>
              Loading ... <LinearProgress />
            </p>
          }
        >
        <CarCatalog carJson={cars} />

        <div className="flex flex-row text-center items-center justify-center text-white font-bold text-2xl">
        <Link href="/car">
          <div className="bg-blue-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
            View Cars
          </div>
        </Link>
        <Link href="/provider">
          <div className="bg-blue-800 rounded-lg text-white px-4 py-2 m-5 rounded-md hover:bg-blue-900 cursor-pointer">
            View Providers
          </div>
        </Link>
        </div>

      </Suspense>
      </div>
      

      <div className="text-center h-[100vh] py-16 px-4 items-center flex flex-col justify-center bg-gray-100 snap-start">
        {/* Additional content */}
      </div>
    </main>
  );
}
