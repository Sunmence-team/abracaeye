import React, { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { assets } from "../../assets/assets";

const BalanceCard: React.FC = () => {
  const balance = 1000000;
  const hiddenBalance = "*****";
  const [eyeOpen, setEyeOpen] = useState(true);
  return (
    <div className="relative flex justify-between items-start py-5 px-8 w-[92vw] lg:w-[529px] rounded-md bg-light-red h-[164px]">
      <div className="flex flex-col gap-1 relative z-10">
        <h2 className="text-base flex items-center gap-2 font-medium text-white">
          Account Balance{" "}
          {eyeOpen ? (
            <IoEyeOff
              onClick={() => setEyeOpen(!eyeOpen)}
              className="cursor-pointer text-xl"
            />
          ) : (
            <IoEye
              onClick={() => setEyeOpen(!eyeOpen)}
              className="cursor-pointer text-xl"
            />
          )}
        </h2>
        <p className="text-xl font-semibold text-black">
          {eyeOpen ? `${balance.toLocaleString()}.00` : hiddenBalance}
        </p>
      </div>
      <div className="w-[200px] h-[200px] absolute -top-9 right-0">
        <img
          src={assets.balance}
          alt="balance-img"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default BalanceCard;
