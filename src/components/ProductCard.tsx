import Image from "next/image";
import InteractiveCard from "./InteractiveCard";
import { FaStar } from "react-icons/fa";

export default function ProductCard({
  Name,
  imgSrc,
  onCompare,
}: {
  Name: string;
  imgSrc?: string;
  onCompare?: Function;
}) {
  return (
    <InteractiveCard contentName={Name}>
      <div className="w-[272px] h-[230px] relative bg-gray-200 rounded-none">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt="Product Picture"
            fill
            className="object-cover rounded-none"
          />
        )}
      </div>
      <div className="w-[272px] h-[142px] flex flex-col gap-1 items-start justify-start px-4 py-3 font-sans text-black">
        <div className="text-lg font-medium tracking-wide">{Name}</div>
        <div className="text-sm text-gray-500">Provider</div>
        <div className="text-xl font-bold mt-2">
          $100<span className="text-sm font-normal">/Day</span>
        </div>
        <div className="flex items-center text-sm mt-1">
          <FaStar className="mr-1 text-black" />
          4.9
        </div>
      </div>
    </InteractiveCard>
  );
}
