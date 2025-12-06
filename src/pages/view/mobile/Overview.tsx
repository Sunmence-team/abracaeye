import React from "react";
import BalanceCard from "../../../components/cards/BalanceCard";
import { CiCamera } from "react-icons/ci";
import { BsBarChartFill, BsEnvelopePlus } from "react-icons/bs";
import OverviewCard from "../../../components/cards/OverviewCard";
import { FaWifi } from "react-icons/fa";
import { LuSwitchCamera } from "react-icons/lu";
import { PiDesktopFill } from "react-icons/pi";
import ServicesCard from "../../../components/cards/ServicesCard";
import { assets } from "../../../assets/assets";
import VendorCard from "../../../components/cards/VendorCard";
import { useNavigate } from "react-router-dom";

const MobileOverview: React.FC = () => {
  const navigate = useNavigate();
  function greet() {
    alert("Hi");
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
  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col">
          <h3 className="text-black font-semibold text-[18px]">Hi, Alabi</h3>
          <h5 className="text-light-red font-medium text-sm">
            Ready to feed some eyes?
          </h5>
        </div>
        <BalanceCard />
      </div>
      <div className="flex justify-between w-full gap-2 items-center">
        {overviewItems.map((item, idx) => (
          <div className="w-1/2" key={idx} onClick={item.action}>
            <OverviewCard name={item.name} icon={item.icon} />
          </div>
        ))}
      </div>
      <div className="flex w-full gap-4 overflow-x-scroll items-stretch">
        {serviceesItems.map((item, idx) => (
          <div className="" key={idx}>
            <ServicesCard name={item.name} desc={item.desc} icon={item.icon} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5 mb-21">
        <h3 className="text-sm font-semibold text-light-red">
          Best selling vendor
        </h3>
        <div className="flex gap-4 w-full overflow-x-scroll">
          {vendorItems.map((item, idx) => (
            <div className="" key={idx}>
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
        <h3 className="text-2xl font-bold text-center text-white">Vendor & Marketplace Coming Soon</h3>
      </div>
    </div>
  );
};

export default MobileOverview;
