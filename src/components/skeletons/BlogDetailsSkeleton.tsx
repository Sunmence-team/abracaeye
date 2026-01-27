const BlogSkeleton = () => (
  <div className="w-[90%] mx-auto py-10 md:mt-20 mt-10 animate-pulse">
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="col-span-2">
        <div className="h-10 bg-gray-200 rounded-md w-3/4 mb-6"></div>
        <div className="w-full h-[400px] bg-gray-200 rounded-xl mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
      <div className="hidden lg:block space-y-6">
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-[150px] bg-gray-200 rounded-xl"></div>
        <div className="h-[150px] bg-gray-200 rounded-xl"></div>
      </div>
    </div>
  </div>
);

export default BlogSkeleton