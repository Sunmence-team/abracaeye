import React from "react";
import BalanceCard from "../../components/cards/BalanceCard";
import { CiCamera } from "react-icons/ci";
import { BsEnvelopePlus } from "react-icons/bs";
import OverviewCard from "../../components/cards/OverviewCard";
import ServicesCard from "../../components/cards/ServicesCard";
import { BsBarChartFill } from "react-icons/bs";
import { FaWifi } from "react-icons/fa6";
import { LuSwitchCamera } from "react-icons/lu";
import { PiDesktopFill } from "react-icons/pi";
import { assets } from "../../assets/assets";
import VendorCard from "../../components/cards/VendorCard";
import { useScreenSize } from "../../hook/useScreenSize";
import MobileOverview from "../view/mobile/Overview";
import { useNavigate } from "react-router-dom";

const Overview: React.FC = () => {
  const screen = useScreenSize();
  const navigate = useNavigate();
  function greet() {
    alert("Project Added");
  }
  const overviewItems = [
    {
      name: "Add new Post",
      icon: CiCamera,
      action: () => navigate("/dashboard/add-post"),
    },
    {
      name: "Add new Project",
      icon: BsEnvelopePlus,
      action: greet,
    },
  ];
  const serviceesItems = [
    {
      name: "Airtime",
      icon: BsBarChartFill,
      action: greet,
      desc: "Buy airtime for your phone",
    },
    {
      name: "Data",
      icon: FaWifi,
      action: greet,
      desc: "Buy data for your phone",
    },
    {
      name: "Loan",
      icon: LuSwitchCamera,
      action: greet,
      desc: "Get a Loan",
    },
    {
      name: "Electricity",
      icon: PiDesktopFill,
      action: greet,
      desc: "Pay your electricity bill",
    },
  ];
  const vendorItems = [
    {
      storeName: "Ajasa Store",
      image: assets.vendor,
      rating: 4.2,
      goods: ["Shoes", "Bag"],
      rateCount: 200,
    },
    {
      storeName: "Ajasa Store",
      image: assets.vendor,
      rating: 4.2,
      goods: ["Shoes", "Bag"],
      rateCount: 200,
    },
    {
      storeName: "Ajasa Store",
      image: assets.vendor,
      rating: 4.2,
      goods: ["Shoes", "Bag"],
      rateCount: 200,
    },
    {
      storeName: "Ajasa Store",
      image: assets.vendor,
      rating: 4.2,
      goods: ["Shoes", "Bag"],
      rateCount: 200,
    },
  ];
  return screen.isMobile ? (
    <MobileOverview />
  ) : (
    <div className="w-full flex flex-col gap-9 relative px-1">
      <div className="flex lg:flex-nowrap flex-wrap items-stretch gap-4 justify-between">
        <div className="">
          <BalanceCard />
        </div>
        {overviewItems.map((item, idx) => (
          <div className="sm:w-[48%]" key={idx} onClick={item.action}>
            <OverviewCard name={item.name} icon={item.icon} />
          </div>
        ))}
      </div>
      <div className="flex items-stretch gap-2 justify-between lg:overflow-x-hidden noScrollBar overflow-x-auto">
        {serviceesItems.map((item, idx) => (
          <div className="w-[200px] lg:w-[278px]" key={idx}>
            <ServicesCard name={item.name} desc={item.desc} icon={item.icon} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <h3 className="text-xl font-semibold">Best selling vendor</h3>
        <div className="flex items-stretch lg:overflow-x-hidden noScrollBar overflow-x-auto gap-4 justify-between pb-3 px-1">
          {vendorItems.map((item, idx) => (
            <div className="w-[278px]" key={idx}>
              <VendorCard
                image={item.image}
                storeName={item.storeName}
                rating={item.rating}
                rateCount={item.rateCount}
                goods={item.goods}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/95 z-9 rounded-lg flex items-center justify-center">
        <h3 className="text-3xl font-bold text-white">Vendor & MarketPlace Coming Soon</h3>
      </div>
    </div>
  );
};

export default Overview;
