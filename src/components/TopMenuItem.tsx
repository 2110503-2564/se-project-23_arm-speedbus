import Link from "next/link";
import styles from "./topmenu.module.css";
import { FaHome, FaUsers, FaCar, FaGamepad, FaTools, FaBook } from "react-icons/fa";
export default function TopMenuItem({
  title,
  pageRef,
}: {
  title: string;
  pageRef: string;
}) {
  let icon;

  switch (title) {
    case "Home":
      icon = <FaHome className="mr-2" />;
      break;
    case "Provider":
      icon = <FaUsers className="mr-2" />;
      break;
    case "Select Car":
      icon = <FaCar className="mr-2" />;
      break;
    case "Car Jumper":
      icon = <FaGamepad className="mr-2" />;
      break;
    case "Manage":
      icon = <FaTools className="mr-2" />;
      break;
    case "Audit Logs":
      icon = <FaBook className="mr-2" />;
      break;
    default:
      icon = null;
  }

  return (
    <Link
      href={pageRef}
      className="w-[120px] text-center my-auto font-[Verdana,Geneva,Tahoma,sans-serif] text-[12pt] text-[#FFF2F2] 
                 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-[#8a7ff2] flex items-center justify-center"
    >
      {icon}
      {title}
    </Link>
  );
}
