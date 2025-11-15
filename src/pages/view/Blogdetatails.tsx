import React from "react";
import { FaHeart, FaShare } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

const Blogdetails = () => {
  return (
    <div className="w-full bg-white py-10 px-4 md:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT CONTENT */}
        <div className="col-span-2">
          {/* Back button */}
          <button className="flex items-center gap-2 text-gray-600 mb-6">
            ← Back
          </button>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-[#D6001C]">
            Ronaldo Set to Marry Georgina After 2026 World Cup
          </h1>

          {/* Featured Image */}
          <img
            src="/your-image.jpg"
            alt="blog-image"
            className="w-full h-[350px] md:h-[450px] object-cover rounded-xl mt-6"
          />

          {/* Blog Text */}
          <div className="mt-6 space-y-5 text-[17px] text-gray-700 leading-relaxed">
            <p>
              Soccer legend Cristiano Ronaldo has confirmed that his long-time
              partner Georgina Rodríguez said “yes” to his proposal this August,
              showcasing a dazzling diamond ring and adding a new chapter to
              their relationship.
            </p>

            <p>
              In an interview, Ronaldo revealed that the couple intends to marry
              after the 2026 FIFA World Cup...
            </p>

            <p>
              Together since 2016, they’ve built a family that includes three
              daughters and a pair of twins...
            </p>

            <p>
              As the sporting world turns its attention to the 2026 World Cup...
            </p>
          </div>

          {/* Author */}
          <div className="mt-6 flex items-center gap-3 text-gray-700">
            <FaUser className="text-red-600" />
            <span>John Smith</span>
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button className="text-gray-600 flex items-center gap-2">
              <FaHeart /> 25
            </button>
            <button className="text-gray-600 flex items-center gap-2">
              <FaShare /> Share
            </button>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div>
          <h2 className="text-lg font-bold mb-4">Recent Eye News</h2>

          {/* Each recent card */}
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl shadow-sm p-3 mb-6 border"
            >
              <img
                src="/image.jpg"
                alt="recent"
                className="w-full h-[150px] object-cover rounded-lg"
              />

              <h3 className="text-[17px] font-semibold mt-3 leading-snug">
                Ronaldo Set to Marry Georgina After 2026 World Cup
              </h3>

              <p className="text-gray-600 mt-2 text-sm">
                Soccer legend Cristiano Ronaldo has confirmed that his long-time
                partner Georgina Rodríguez said “yes” to his proposal this August.
              </p>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <FaUser className="text-red-600" />
                  John Smith
                </div>

                <button className="text-gray-600">
                  <FaHeart />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
