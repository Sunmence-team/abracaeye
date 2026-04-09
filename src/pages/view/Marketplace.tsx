import * as React from "react";
import { assets } from "../../assets/assessts";
import { Heart, ShoppingCart } from "lucide-react";
import { globals } from "../../constants";
import { Link } from "react-router-dom";
const MarketPlace: React.FC = () => {
  const categories = [
    { name: "Electronics", image: assets.electronics },
    { name: "Fashion", image: assets.fashion },
    { name: "Home & Living", image: assets.home },
    { name: "Beauty & Care", image: assets.beauty },
    { name: "Sports", image: assets.sports },
    { name: "Books", image: assets.books },
    { name: "Gadgets", image: assets.gadgets3 },
    { name: "Digital", image: assets.digital },
  ];

  const [likedProducts, setLikedProducts] = React.useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLikedProducts((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };
  const products = Array.from({ length: 12 }).map((_, index) => ({
    id: index,
    title: "Noise Cancelling Wireless Headphones - Model X",
    price: "$299.00",
    vendor: "TechNova Systems",
    image: assets.headphone,
  }));

  return (
    <div>
      <div
        className="relative flex items-center justify-center text-center text-white h-[50vh] md:h-[50vh] lg:h-[70vh]"
        style={{
          backgroundImage: `url(${assets.gadgets2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative pt-20 flex flex-col px-6 gap-5">
          <h1 className="text-4xl md:text-6xl font-medium lg:w-200 text-center">
            Discover Products From{" "}
            <span className="text-red-600">Around the World</span>
          </h1>
          <p className="text-sm md:text-base lg:text-[18px] lg:w-180 leading-9">
            Buy and sell quality products from trusted vendors across,
            technology, lifestyle, fashion and more.
          </p>
          <div className="flex gap-5 justify-center">
            <Link to={ globals.marketPlaceURl} className="btn py-4 px-7 rounded-xl bg-red-600 border-0 text-white cursor-pointer hover:bg-red-700 transition duration-300">
              Start Shopping
            </Link>
            <Link to={`${globals.adminSiteURl}/login`} className="btn py-4 px-7 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white cursor-pointer hover:bg-white/30 transition duration-300">
              Sell a Product
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">
            Browse Marketplace Categories
          </h2>
          <p className="text-gray-500 mt-2">
            Explore our wide selection of items by category
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto px-6 md:flex-wrap md:justify-center md:overflow-visible w-full mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 cursor-pointer"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 lg:w-25 lg:h-25
              .02 bg-white rounded-xl shadow-sm flex items-center justify-center hover:shadow-md transition">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <p className="text-sm text-gray-700">{category.name}</p>
            </div>
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-[90%] mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              {/* PRODUCT IMAGE */}
              <div className="relative">
                <img
                  src={product.image}
                  className="rounded-lg w-full h-[220px] object-cover"
                />

                <button
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
                >
                  <Heart
                    className={`transition ${
                      likedProducts.includes(product.id)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-500"
                    }`}
                  />
                </button>
              </div>

              {/* PRODUCT INFO */}
              <div className="mt-4 flex flex-col gap-2">
                <p className="text-xs text-gray-500">By {product.vendor}</p>

                <h3 className="font-medium text-gray-800 line-clamp-2">
                  {product.title}
                </h3>

                <p className="text-red-600 font-semibold">{product.price}</p>

                <button className="mt-2 bg-red-600 flex items-center justify-center gap-5 text-white py-4 rounded-lg hover:bg-red-700 transition">
                  <ShoppingCart /> <p> Add to cart</p>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketPlace;
