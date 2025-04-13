"use client";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { CarItem, CarJson } from "interfaces";
export default async function CarCatalog({ carJson }: { carJson: CarJson }) {
  const carJsonReady = await carJson;
  return (
    <>
      {/* Header */}
      <div className="w-full max-w-screen-xl mx-auto px-4 mb-6 flex justify-between items-center font-robotoMono">
        <h2 className="text-black text-xl  tracking-widest">
          PICK YOUR CAR FOR NEW EXPERIENCE
        </h2>
        <div className="border-t border-black w-8 px-4 mr-auto"></div>
        <Link
          href="/car"
          className="text-black border border-black px-4 py-1 rounded-full text-sm hover:bg-black hover:text-white transition"
        >
          View all
        </Link>
      </div>

      {/* Card Layout */}
      <div className="w-full min-h-screen flex flex-wrap justify-center gap- p-4 overflow-x-hidden font-robotoMono">
        {carJsonReady.data
          .slice(1, Math.min(carJsonReady.data.length, 4))
          .map((carItem: CarItem, index) => (
            <Link
              href={`/car/${carItem.id}`}
              key={carItem.id}
              className={`w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group opacity-0 transition-transform duration-1000 animate-slide-up`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="border border-gray-300  overflow-hidden shadow-lg bg-white relative group hover:scale-105 transition-all ease-in-out">
                <ProductCard
                  Name={carItem.name}
                  imgSrc={carItem.picture}
                  price={carItem.pricePerDay.toString()}
                  provider={carItem.provider_info.name}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xl font-bold text-white">Explore</span>
                </div>
              </div>
            </Link>
          ))}
        <Link
          href={`/car`}
          className={`w-full sm:w-[48%] md:w-[30%] lg:w-[22%] p-2 sm:p-4 md:p-4 lg:p-8 group opacity-0 transition-transform duration-1000 animate-slide-up`}
          style={{ animationDelay: `${3 * 0.15}s` }}
        >
          <div className="border border-gray-300  overflow-hidden shadow-lg bg-white relative group hover:scale-105 transition-all ease-in-out">
            <ProductCard
              Name={"more..."}
              imgSrc={carJsonReady.data[0].picture}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity"></div>
            <div className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-xl font-bold text-white">
                Explore All Cars
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Global animation styles */}
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
