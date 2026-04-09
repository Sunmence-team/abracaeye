import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useUser } from "../../context/UserContext";
import { globals } from "../../constants";

const VendorCTA: React.FC = () => {
  const { isLoggedIn, user } = useUser();

  if (user?.vendor) return null;

  const primaryHref = isLoggedIn ? "/apply-as-vendor?skip=true" : "/auth/login";
  const primaryLabel = isLoggedIn ? "Become a Vendor" : "Log in to Apply";

  const secondaryHref = "/apply-as-vendor";
  const secondaryLabel = "Learn more";

  return (
    <section aria-label="Become a vendor" className="w-full">
      <div className="rounded-3xl shadow overflow-hidden relative min-h-80">
        <img
          src={assets.vendorPlaceHolder}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/55 to-black/70" />

        <div className="relative z-10 p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10 items-start">
            <div className="max-w-2xl">
              <p className="text-white/85 text-xs sm:text-sm font-medium uppercase tracking-[0.3em]">
                Become a vendor
              </p>
              <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-white">
                Sell where customers are already shopping.
              </h2>
              <p className="mt-3 text-white/85 text-sm sm:text-base">
                With just &#8358;5,000, join our vendor community, get your own
                storefront, and start listing products in minutes.
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 backdrop-blur-sm p-4 sm:p-5">
              <p className="text-white/80 text-xs font-semibold uppercase tracking-[0.25em]">
                What you get
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-3 text-white/90 text-sm">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white/80" />
                  Reach new buyers and grow your visibility.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white/80" />
                  Manage orders and products from one dashboard.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-2 w-2 rounded-full bg-white/80" />
                  Community support to help you grow faster
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-7 rounded-2xl bg-white text-black p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">
                One-time onboarding
              </p>
              <p className="mt-1 text-sm sm:text-base font-semibold">
                Start with &#8358;5,000 and begin selling immediately.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
              <Link
                to={globals.marketPlaceURl + primaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-dark-red text-white font-semibold shadow hover:bg-dark-red/90 transition text-center"
              >
                {primaryLabel}
              </Link>
              <Link
                to={globals.marketPlaceURl + secondaryHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-black/10 text-black font-semibold hover:bg-black/15 transition text-center"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorCTA;
