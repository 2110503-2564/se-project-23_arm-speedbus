import Link from "next/link";
import styles from "./topmenu.module.css";
export default function TopMenuItem({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  return (
    <Link
      href={pageRef}
      className="w-[120px] text-center my-auto font-[Verdana,Geneva,Tahoma,sans-serif] text-[12pt] text-[#FFF2F2] 
             transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-[#8a7ff2]"
    >
      {title}
    </Link>
  );
}
