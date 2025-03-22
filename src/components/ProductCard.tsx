import Image from "next/image";
import InteractiveCard from "./InteractiveCard";

export default function ProductCard({
  Name,
  imgSrc,
  onCompare,
}: {
  Name: string;
  imgSrc: string;
  onCompare?: Function;
}) {
  return (
    <InteractiveCard contentName={Name}>
      <div className="w-full h-[70%] relative rounded-t-lg">
        <Image
          src={imgSrc}
          alt="Product Picture"
          fill={true}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="w-full h-[15%] p-[10px] font-[Verdana,Geneva,Tahoma,sans-serif] text-black">
        {Name}
      </div>
      {onCompare ? (
        <button
          className="block h-[10%] tex-sm rounded-md bg-sky-600 hover:bg-indigo-600 mx-2 px-1 py-1 text-white shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onCompare(Name);
          }}
        >
          Compare
        </button>
      ) : (
        ""
      )}
    </InteractiveCard>
  );
}
