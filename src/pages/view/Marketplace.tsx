import React, { useState, useEffect, useCallback } from "react";
import { assets } from "../../assets/assessts";
import { globals } from "../../constants";
import { Link } from "react-router-dom";
import api from "../../helpers/api";
import type { Product } from "../../lib/sharedInterface";
import ProductCard from "../../components/cards/ProductCard";
import { useUser } from "../../context/UserContext";

const MarketPlace: React.FC = () => {
  const { categories } = useUser();

  const [products, setProducts] = useState<Product[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const fetchProducts = useCallback(async () => {
    setFetchingProducts(true);
    const params = {
      category: selectedCategory !== "All" ? selectedCategory : "",
    };
    try {
      const res = await api.get("/products", { params });
      if (res.status === 200) {
        setProducts(res.data.data.data);
      }
    } catch (error: unknown) {
      console.log("error-fetching-products", error);
    } finally {
      setFetchingProducts(false);
    }
  }, [selectedCategory]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div>
      <div
        className="relative flex items-center justify-center text-center text-white h-[75vh] md:h-[50vh] lg:h-[70vh]"
        style={{
          backgroundImage: `url(${assets.gadgets2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/75"></div>

        <div className="relative pt-20 flex flex-col md:px-6 px-3 gap-5">
          <div className="lg:w-3/5 mx-auto space-y-4">
            <h1 className="text-3xl md:text-5xl font-medium text-center">
              Discover Products From{" "}
              <span className="text-light-red">Around the World</span>
            </h1>
            <p className="text-sm md:text-base lg:text-[18px] leading-7">
              Buy and sell quality products from trusted vendors across,
              technology, lifestyle, fashion and more.
            </p>
          </div>
          <div className="flex gap-5 justify-center">
            <Link
              to={globals.marketPlaceURl}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 flex items-center justify-center px-4 rounded-lg bg-red-600 border-0 text-white cursor-pointer hover:bg-red-700 transition duration-300"
              >
              Start Shopping
            </Link>
            <Link
              to={`${globals.marketPlaceURl}/apply-as-vendor`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-12 flex items-center justify-center px-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 text-white cursor-pointer hover:bg-white/30 transition duration-300"
            >
              Sell a Product
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="text-center mb-10 md:px-6 px-4">
          <h2 className="text-3xl font-semibold">
            Browse Marketplace Categories
          </h2>
          <p className="text-gray-500 mt-2">
            Explore our wide selection of items by category
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto px-6 md:flex-wrap md:justify-center md:overflow-visible w-full mx-auto">
          {selectedCategory !== "All" && (
            <button
              type="button"
              onClick={() => setSelectedCategory("All")}
              className={`px-6 py-3 rounded-full text-sm font-medium transition  whitespace-nowrap text-center ${
                selectedCategory === "All"
                  ? "bg-dark-red text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All
            </button>
          )}
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                setSelectedCategory(category.name);
              }}
              className={`px-6 py-3 rounded-full text-sm font-medium transition  whitespace-nowrap text-center ${
                selectedCategory === category.name
                  ? "bg-dark-red text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold">Featured Products</h2>
          <p className="text-gray-500 mt-2">
            Handpicked products from our trusted sellers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6 w-[90%] mx-auto">
          {fetchingProducts ? (
            <div className="lg:col-span-4 md:col-span-2 size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin mx-auto my-8"></div>
          ) : (
            products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
