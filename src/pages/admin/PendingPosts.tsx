import React, { useEffect, useState } from "react";
import api from "../../helpers/api";
import { useUser } from "../../context/UserContext";
import type { BlogPostProps } from "../../lib/sharedInterface";
import PaginationControls from "../../utilities/PaginationControls";
import BlogAction from "../../components/modal/BlogAction";

const PendingPosts: React.FC = () => {
  const { token } = useUser();
  const [pendingPosts, setPendingPosts] = useState<BlogPostProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<BlogPostProps | null>(null);

  const apiItemsPerPage = 10;

  const fetchPendingPosts = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(
        `/blogs/admin?per_page=${apiItemsPerPage}&page=${currentPage}`,
        {
          headers: {
            Accept: `application/json`,
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.status === 200) {
        const { data, last_page } = response.data.data;
        setPendingPosts(data);

        setLastPage(last_page);
      }
    } catch (err) {
      console.error("Failed to fetch users: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
  }, [token, currentPage]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="size-15 border-4 border-dark-red rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg no-scrollbar w-full lg:p-0 pe-4">
        <table className="w-full min-w-[800px] text-center">
          <thead>
            <tr className="bg-dark-red text-white h-[55px]">
              <th className="p-4 text-[10px] whitespace-nowrap">S/N</th>
              <th className="p-4 text-[10px] whitespace-nowrap">Title</th>
              <th className="p-4 text-[10px] whitespace-nowrap">
                Description
              </th>
              <th className="p-4 text-[10px] whitespace-nowrap">
                No of Likes
              </th>
              <th className="p-4 text-[10px] whitespace-nowrap">
                No of Comments
              </th>
              <th className="p-4 text-[10px] whitespace-nowrap">Status</th>
              <th className="p-4 text-[10px] whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr className="bg-white/61 border-y border-black/10">
                <td colSpan={7} className="text-center py-4 bg-white">
                  Fetching users...
                </td>
              </tr>
            ) : pendingPosts.length === 0 && !isLoading ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center bg-white/61 py-4 border-y border-black/10"
                >
                  No post found.
                </td>
              </tr>
            ) : (
              pendingPosts.map((post, index) => {
                const serialNumber =
                  (currentPage - 1) * apiItemsPerPage + (index + 1);
                return (
                  <tr
                    key={post.id}
                    className={`${index % 2 === 0 ? "bg-dark-red/10" : "bg-[#F8F8F8]"} h-[50px] border-y border-black/10`}
                  >
                    <td className="p-4 text-[10px] font-medium">
                      {serialNumber || index + 1}
                    </td>

                    <td className="p-4 text-[10px] capitalize font-medium">
                      {post.title.length > 30
                        ? `${post.title.slice(0, 30)}...`
                        : post.title}
                    </td>

                    <td className="p-4 text-[10px] font-medium">
                      {post.body.content.length > 40
                        ? `${post.body.content.slice(0, 40)}...`
                        : post.body.content}{" "}
                    </td>

                    <td className="p-4 text-[10px] font-medium">
                      {post?.likes_count}
                    </td>

                    <td className="p-4 text-[10px] font-medium">
                      {post?.comments_count}
                    </td>

                    <td className="p-4 text-[10px] font-medium capitalize">
                      {post.status || "-"}
                    </td>

                    <td
                      onClick={() => setSelectedBlog(post)}
                      className="p-4 text-[10px] flex items-end gap-1 hover:underline font-medium text-dark-red cursor-pointer text-center justify-center"
                    >
                      View
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          <tfoot>
            <tr className="bg-white">
              <td className="p-4" colSpan={7}>
                {!isLoading && pendingPosts.length > 0 && (
                  <div className="flex justify-center items-center gap-2 mt-4">
                    <PaginationControls
                      currentPage={currentPage}
                      totalPages={lastPage}
                      setCurrentPage={setCurrentPage}
                    />
                  </div>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {selectedBlog && (
        <BlogAction
          blog={selectedBlog}
          isOpen={Boolean(selectedBlog)}
          onClose={() => setSelectedBlog(null)}
          succesAction={fetchPendingPosts}
        />
      )}
    </>
  );
};

export default PendingPosts;
