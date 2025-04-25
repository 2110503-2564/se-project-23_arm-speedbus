import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars > 0;
  const emptyStars = 5 - Math.ceil(rating);

  return (
    <div className="flex items-center gap-[2px]">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-500" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-yellow-500" />
      ))}
    </div>
  );
}

export default function MyReviewCard({
  rentId,
  carName,
  carRating,
  review,
  posted,
}: {
  rentId: string;
  carName?: string;
  carRating: number;
  review?: string;
  posted: Date;
}) {
  const buttonStyle =
    "text-black text-[12px] rounded-lg bg-white border border-black py-1 px-3 hover:bg-black hover:text-white transition duration-300";

  return (
    <div className="mb-4 h-full pb-4 rounded-lg border border-black p-5">
      <div className="flex flex-col">
        <div className="flex">
          <div className="text-black text-[16px]">RentId : {rentId}</div>
          <div className="ml-auto">{renderStars(carRating)}</div>
        </div>
        <span className="text-black text-[16px]">Car : {carName}</span>
      </div>

      <div className="border-t border-black my-2"></div>

      <div className="text-black text-[16px]">{review}</div>

      <div className="flex flex-row items-center justify-between">
        <div className="text-gray-500 text-[12px]">
          Posted on : {posted.toLocaleString()}
        </div>
        <div className="flex gap-2 mt-8">
          <button className={buttonStyle}>Edit</button>
          <button className={buttonStyle}>Delete</button>
        </div>
      </div>
    </div>
  );
}
