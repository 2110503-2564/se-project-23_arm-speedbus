"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./banner.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = ["/img/cover.jpg", "/img/cover2.jpg", "/img/cover3.jpg"];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();
  console.log(session?.user.token);
  return (
    <div
      className="p-1 my-2 w-[97vw] h-[80vh] relative rounded mx-auto "
      onClick={() => {
        setIndex(index + 1);
      }}
    >
      <Image
        src={covers[index % 3]}
        alt="cover"
        fill={true}
        className="object-cover rounded"
      />
      <div className={styles.bannerText}>
        <h1 className="text-4xl font-medium">Your Travel Partner</h1>
        <h3 className="text-xl font-serif">Explore Your World With us</h3>
      </div>

      <button
        className="bg-white text-cyan-600 border border-cyan-600
            font-semibold py-2 px-2 m-2 rounded z-30 absolute bottom-0 right-0
            hover:bg-cyan-600 hover:text-white hover:border-transparent"
        onClick={(e) => {
          e.stopPropagation();
          router.push("/car");
        }}
      >
        Select Your Travel Partner Now
      </button>
    </div>
  );
}
