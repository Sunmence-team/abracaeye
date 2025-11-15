import React from "react";
import { FaArrowLeftLong, FaHeart, FaRegCommentDots } from "react-icons/fa6";
import { assets } from "../../assets/assessts";
import { IoIosShareAlt } from "react-icons/io";
import BlogCard from "../../components/cards/BlogCards";

const blogPosts: BlogPost[] = [
  {
    image: assets.detmain,
    title: "Ronaldo Set to Marry Georgina After 2026 World Cup",
    excerpt:
      "Soccer legend Cristiano Ronaldo has confirmed that his long-time partner Georgina Rodríguez said “yes” to his proposal this August.",
    authorInitials: "JS",
    authorName: "John Smith",
  },
  {
    image: assets.news2 || assets.news1,
    title: "Elon Musk Announces Mars Mission Launch in 2026",
    excerpt:
      "SpaceX to send first crewed mission to Mars with reusable Starship. Historic step toward multi-planetary civilization.",
    authorInitials: "AM",
    authorName: "Alex Morgan",
  },
  {
    image: assets.news3 || assets.news1,
    title: "New COVID Variant Detected in South Africa",
    excerpt:
      "Health officials monitor new strain with increased transmissibility. WHO calls emergency meeting to assess global risk.",
    authorInitials: "TD",
    authorName: "Tina Davis",
  },
];

const Blogdetails = () => {
  
  const [selectedPost, setSelectedPost] = React.useState(blogPosts[0]);

  
  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
  };

  return (
    <div className="w-full bg-white py-10 px-4 md:px-10 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT CONTENT */}
        <div className="col-span-2">
          {/* Back button */}
          <button className="flex items-center gap-2 text-black mb-6">
            <FaArrowLeftLong size={20} />
          </button>

          {/* ⭐ Dynamic Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight text-light-red">
            {selectedPost.title}
          </h1>

          
          <img
            src={selectedPost.image}
            alt="blog-image"
            className="w-full h-[350px] md:h-[450px] object-cover rounded-xl mt-6"
          />

          
          <div className="mt-6 space-y-5 text-[17px] text-gray-700 leading-relaxed">
            <p>{selectedPost.excerpt}</p>

            <p>
              In an interview, the story continues with more insight into the
              situation...
            </p>

            <p>
              More details can be added here depending on the content you want
              to show...
            </p>
          </div>

          
          <div className="w-full flex justify-between mt-5">
            <div className="flex items-center gap-2">
              <div className="bg-light-red w-8 h-8 rounded-full flex items-center justify-center text-white text-xs p-2 font-bold">
                {selectedPost.authorInitials}
              </div>
              <p className="text-[15px] font-medium">{selectedPost.authorName}</p>
            </div>

            <div className="justify-end flex gap-3 items-center">
              <FaHeart className="text-light-red" size={20} />
              <FaRegCommentDots size={20} />
              <IoIosShareAlt size={20} />
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="mt-30">
          <h2 className="text-lg font-semibold mb-4 text-light-red">
            Recent Eye News
          </h2>

          {/* ⭐ Clickable Blog Cards */}
          <div className="w-full flex flex-col gap-6 mt-8">
            {blogPosts.map((post, index) => (
              <div key={index} onClick={() => handleSelectPost(post)}>
                <BlogCard
                  image={post.image}
                  title={post.title}
                  excerpt={post.excerpt}
                  authorInitials={post.authorInitials}
                  authorName={post.authorName}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogdetails;
