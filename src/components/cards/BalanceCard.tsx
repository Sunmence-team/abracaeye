import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { assets } from "../../assets/assets";
import { useScreenSize } from "../../hook/useScreenSize";

const BalanceCard: React.FC = () => {
  const balance = 1000000;
  const hiddenBalance = "*****";
  const [eyeOpen, setEyeOpen] = useState(true);
  const screen = useScreenSize();
  return (
    <div
      style={{
        width:
          screen.isMobile || screen.isTablet
            ? `${window.innerWidth - 60}px`
            : "",
      }}
      className={`relative flex justify-between items-start py-5 px-4 lg:px-8 lg:w-[529px] rounded-md bg-light-red h-[100px] lg:h-[164px]`}
    >
      <div className="flex flex-col gap-1 relative z-5">
        <h2 className="text-sm lg:text-base flex items-center gap-2 font-light text-white">
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
        <p className="text-base lg:text-xl font-bold text-white">
          {eyeOpen ? `${balance.toLocaleString()}.00` : hiddenBalance}
        </p>
      </div>
      <div className="w-[200px] h-[124px] lg:h-[200px] absolute lg:right-0 -right-8">
        {" "}
        {/* -top-9 lg:-top-9 */}
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
