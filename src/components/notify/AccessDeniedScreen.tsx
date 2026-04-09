import React, { useState } from "react";
import Modal from "../modal/Modal";
import api from "../../helpers/api";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext";

const AccessDeniedScreen: React.FC = () => {
  const { token, user } = useUser();
  const [openApplyPortal, setOpenApplyPortal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const steps = [
    {
      title: "Sign up as a blogger",
      value:
        "Create your account in minutes and join a vibrant community of writers.",
    },
    {
      title: "Submit your first blog",
      value: "Craft your story, share your ideas, and send it in for approval.",
    },
    {
      title: "Get approved and earn",
      value:
        "Once your blog is approved, you’ll start receiving commissions for your work.",
    },
    {
      title: "Grow your audience",
      value:
        "Build meaningful connections, grow your influence, and turn passion into profit.",
    },
  ];

  const handleApplyToBeBlogger = async () => {
    setIsLoading(true);
    try {
      const response = await api.post(
        `/blogger/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        toast.success(response.data.message || "Application submitted");
      }
    } catch (error: any) {
      console.log("Faild to apply: ", error);
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to submit blogger application",
      );
    } finally {
      setIsLoading(false);
      setOpenApplyPortal(false);
    }
  };

  return (
    <>
      {user?.want_blog ? (
        <div className="h-full p-4 flex flex-col items-center justify-center text-center">
          <h3 className="md:text-2xl text-xl font-bold">
            Your application is pending and will be reviewed soon
          </h3>
          <p className="md:text-base text-sm">
            We apologize for any inconvenience. Review might be late due to
            numerous reviews we're scrutinizing daily.
          </p>
        </div>
      ) : (
        <div className="h-full p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold">
            Unfortunately, You can't add any post at this time
          </h3>
          <p>
            You have to{" "}
            <span
              onClick={() => setOpenApplyPortal(true)}
              className="text-light-red underline underline-offset-3 cursor-pointer"
            >
              {" "}
              be a blogger
            </span>
          </p>
        </div>
      )}
      {openApplyPortal && (
        <Modal onClose={() => setOpenApplyPortal(false)}>
          <h3 className="text-center font-bold text-dark-red text-xl">
            Ready to share your voice with the world?
          </h3>
          <p className="text-center text-sm">
            Join our blogging community today — it’s simple, fun, and rewarding!
          </p>
          <div className="grid gap-4 my-6">
            {steps.map((step, index) => (
              <div key={index}>
                <h3 className="font-medium text-sm">
                  <div className="inline-block me-2 w-3 h-3 rounded-full bg-dark-red"></div>
                  {step.title}
                </h3>
                <p className="opacity-55 text-xs font-medium">{step.value}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm mb-3">
            Your words matter, and now they can earn you more than just
            attention.
          </p>
          <button
            type="button"
            disabled={isLoading}
            className="rounded-full bg-light-red text-white w-full p-2 font-semibold text-[20px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
            onClick={handleApplyToBeBlogger}
          >
            {isLoading ? "Submitting application..." : "Apply to be a blogger"}
          </button>
        </Modal>
      )}
    </>
  );
};

export default AccessDeniedScreen;
