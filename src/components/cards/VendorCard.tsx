import React from "react";
import { BsHeartFill, BsStarFill } from "react-icons/bs";

interface VendorCardProps {
  image: string;
  storeName: string;
  rating: number;
  rateCount: number;
  goods: string[];
}
const VendorCard: React.FC<VendorCardProps> = ({
  image,
  storeName,
  rating,
  goods,
  rateCount,
}) => {
  return (
    <div className="rounded-md cursor-pointer shadow shadow-black/30 overflow-hidden bg-white w-full h-[276px] group">
      <div className="w-full h-[172px] relative">
        <img
          src={image}
          alt="vendor-img"
          className="w-full h-full object-cover group-hover:scale-[105%] transition"
        />
        <div className="absolute top-4 right-4 bg-white/50 text-light-red text-xl p-3 rounded-full">
          <BsHeartFill />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <h5 className="text-xs lg:text-sm text-light-red font-semibold underline">
          {storeName}
        </h5>
        <h6 className="text-xs lg:text-sm text-green-700 flex items-center gap-1 font-semibold underline">
          <BsStarFill className="text-yellow-500" />
          {rating}({rateCount})
        </h6>
        <p className="text-sm lg:text-lg text-black flex items-center gap-1 font-semibold underline">
          {goods.join(", ").slice(0, 13)}...
        </p>
      </div>
    </div>
  );
};

export default VendorCard;
