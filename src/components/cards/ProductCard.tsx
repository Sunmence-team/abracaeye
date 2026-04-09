import React from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
import type { Product } from "../../lib/sharedInterface";
import { imageFullURLGenerator } from "../../helpers/imageFullURLGenerator";
import { formatterUtility } from "../../helpers/formatterUtilities";
import { globals } from "../../constants";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, compact }) => {
  const price = formatterUtility(Number(product.price));

  return (
    <Link
      to={`${globals.marketPlaceURl}/product/${product.id}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.12)] ${
        compact ? "h-full" : ""
      }`}
    >
      <div className="relative w-full overflow-hidden bg-[#F7F2F2]">
        <img
          src={`${imageFullURLGenerator(product.images[0])}`}
          alt={product.name}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.quantity <= 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-black/80 px-3 py-1 text-xs font-semibold text-white">
            Out of stock
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between text-xs uppercase tracking-wide text-gray-500">
          <span>{product.category.name}</span>
          {/* <span className="text-amber-500 flex items-center gap-1">
            <FaStar />
            {product.rating.toFixed(1)}
          </span> */}
        </div>
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-dark-red">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description.length > 85
            ? `${product.description.slice(0, 85)}...`
            : product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg font-semibold text-dark-red">₦{price}</span>
          <span className="text-xs font-semibold text-gray-700 group-hover:text-dark-red transition flex items-center gap-0">
            View details
            <MdArrowOutward />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
