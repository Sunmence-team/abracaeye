import React from "react";
import type { IconType } from "react-icons/lib";

interface OverviewCardProps {
  name: string;
  icon: IconType;
  action?: () => void;
}
const OverviewCard: React.FC<OverviewCardProps> = ({
  name,
  icon: Icon,
  action,
}) => {
  return (
    <div
      onClick={action}
      className="bg-transparent border border-light-red rounded-md py-3 lg:py-5 px-4 lg:px-7 w-full lg:h-[164px] cursor-pointer flex flex-col gap-3 items-center justify-center"
    >
      <Icon className="text-xl lg:text-4xl text-light-red font-semibold" />
      <h3 className="text-xs lg:text-[18px] font-semibold text-black">
        {name}
      </h3>
    </div>
  );
};

export default OverviewCard;
