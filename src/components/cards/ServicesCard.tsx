import React from "react";
import type { IconType } from "react-icons/lib";

interface ServicesCardProps {
  name: string;
  icon: IconType;
  desc: string;
  action?: () => void;
}
const ServicesCard: React.FC<ServicesCardProps> = ({
  name,
  icon: Icon,
  desc,
  action,
}) => {
  return (
    <div
      className="flex w-[278px] h-[120px] py-2 px-4 items-center gap-3 bg-[#F56E6E] cursor-pointer rounded-md"
      onClick={action}
    >
      <div className="bg-white rounded-sm p-2">
        <Icon className="text-2xl text-black" />
      </div>
      <div className="flex flex-col text-white">
        <h2 className="font-semibold text-xl">{name}</h2>
        <p className="text-sm font-light">{desc}</p>
      </div>
    </div>
  );
};

export default ServicesCard;
