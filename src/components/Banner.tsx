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
      className="p-1 my-2 w-[97vw] h-[80vh] relative rounded mx-auto my-5"
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
          <h1 className="text-4xl font-bold">Your Car Renting Partner</h1>
          <h4 className="text-xl font-medium">Explore Your World With us</h4>
          {session && (
              <h3 className="text-xl font-medium">Welcome {session?.user.User_info.name}</h3>
          )}
      </div>
    </div>
  );
  return (
    <div className={styles.banner}>
      <Image
        src={covers[index % 3]}
        alt="cover"
        fill={true}
        className="object-cover rounded"
      />
      <div className={styles.bannerText}>
          <h1 className="text-4xl font-bold">Your Car Renting Partner</h1>
          <h4 className="text-xl font-medium">Explore Your World With us</h4>
          {session && (
              <h3 className="text-xl font-medium">Welcome {session?.user.User_info.name}</h3>
          )}
      </div>
      
    </div>
);
}
