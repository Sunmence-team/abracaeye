import React, { useState } from "react";
import type { postCardProps } from "../../lib/sharedInterface";
import Modal from "./Modal";
import api from "../../helpers/api";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext";

interface BlogActionProps {
  isOpen: boolean;
  onClose: () => void;
  blog: postCardProps;
  succesAction: () => void;
}

const BlogAction: React.FC<BlogActionProps> = ({
  isOpen,
  onClose,
  blog,
  succesAction,
}) => {
  const { token } = useUser();

  const status = (blog?.status || "pending").toLowerCase();
  const isPending = status === "pending";
  const [isAprooving, setIsAprooving] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);

  const handleApprove = async () => {
    setIsAprooving(true);

    try {
      const response = await api.put(`/blogs/approve/${blog.id}`, {
        headers: {
          "Accept": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Blog approved successfully");
        succesAction();
        onClose();
      }
    } catch (err: any) {
      console.error("Failed to approve blog: ", err);
      const errMessage =
        err.response.data.message || err.message || "Failed to make blog req";
      toast.error(errMessage);
    } finally {
      setIsAprooving(false);
    }
  };
  const handleDecline = async () => {
    setIsDeclining(true);

    try {
      const response = await api.put(`/blogs/reject/${blog.id}`, {
        headers: {
          "Accept": `application/json`,
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Blog declned successfully");
        succesAction();
        onClose();
      }
    } catch (err: any) {
      console.error("Failed to decline blog: ", err);
      const errMessage =
        err.response.data.message || err.message || "Failed to make blog req";
      toast.error(errMessage);
    } finally {
      setIsDeclining(false);
    }
  };
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="flex flex-col max-h-[75vh]">
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-gray-500">
                BLOG DETAILS
              </p>

              <h2 className="mt-1 text-lg sm:text-xl font-semibold text-gray-900 leading-snug">
                {blog.title}
              </h2>

              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                <span>{new Date(blog.created_at).toLocaleString()}</span>
                <span>•</span>
                <span>{blog.likes_count} Likes</span>
                <span>•</span>
                <span>{blog.comments_count} Comments</span>
              </div>
            </div>

            <span
              className={[
                "shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize",
                isPending
                  ? "bg-dark-red/10 text-dark-red"
                  : "bg-emerald-50 text-emerald-700",
              ].join(" ")}
            >
              {status}
            </span>
          </div>

          <div className="mt-4 h-1 w-16 rounded-full bg-dark-red" />
        </div>

        <div className="mt-5 flex-1 overflow-y-auto styledScrollbar pr-1">
          {blog.cover_image ? (
            <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${blog.cover_image}`}
                alt={blog.title}
                className="w-full h-52 sm:h-64 object-cover"
              />
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
              No cover image
            </div>
          )}

          <div className="mt-5 rounded-xl border border-gray-200 bg-white">
            <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-900">Content</p>
              <span className="text-xs text-gray-500">ID: {blog.id}</span>
            </div>

            <div className="px-4 py-4">
              <p className="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                {blog.body?.content || "No content provided."}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-5 border-t border-gray-200 bg-white">
          {isPending ? (
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleDecline}
                disabled={isDeclining}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                {isAprooving ? "Declining..." : "Decline"}
              </button>

              <button
                disabled={isAprooving}
                onClick={handleApprove}
                className="rounded-lg bg-dark-red px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                {isAprooving ? "Approving..." : "Approve"}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end">
              <button
                onClick={onClose}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default BlogAction;
