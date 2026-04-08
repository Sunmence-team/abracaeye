import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "../../helpers/api";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext";
import AccessDeniedScreen from "../../components/notify/AccessDeniedScreen";
import { useNavigate } from "react-router-dom";

const AddPost: React.FC = () => {
  const { user, token, refreshUser } = useUser();
  const navigate = useNavigate();
  const imageRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const prevImageUrlRef = useRef<string | null>(null);
  const [additionalImagePreviews, setAdditionalImagePreviews] = useState<
    string[]
  >([]);
  const postSchema = yup.object({
    title: yup.string().required("Please provide post title"),
    image: yup.mixed<File>().required("Please provide an image"),
    details: yup.string().required("Please provide post details"),
  });

  useEffect(() => {
    refreshUser(token ?? "");
  }, [token, refreshUser]);

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null as File | null,
      images: [] as File[],
      details: "",
    },
    validationSchema: postSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("cover_image", values.image as File);
      formData.append("body", values.details);
      for (const image of values.images) {
        formData.append("images", image);
      }
      setSubmitting(true);
      try {
        const res = await api.post("/blogs", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200 || res.status === 201) {
          // console.log(res.data.data);
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/dashboard/posts");
          }, 500);
        }
      } catch (error: unknown) {
        console.log("error creating blog", error);
        const isApiError = (
          err: unknown,
        ): err is { response?: { data?: { message?: string } }; message?: string } =>
          typeof err === "object" && err !== null;
        const errMessage =
          (isApiError(error) && (error.response?.data?.message || error.message)) ||
          "Failed to make blog req";
        toast.error(errMessage);
      } finally {
        setSubmitting(false);
        resetForm();
        if (prevImageUrlRef.current) {
          URL.revokeObjectURL(prevImageUrlRef.current);
          prevImageUrlRef.current = null;
        }
        setPrevImage(null);
        setAdditionalImagePreviews((prev) => {
          prev.forEach((url) => URL.revokeObjectURL(url));
          return [];
        });
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      if (prevImageUrlRef.current) {
        URL.revokeObjectURL(prevImageUrlRef.current);
      }
      prevImageUrlRef.current = url;
      setPrevImage(url);
      formik.setFieldValue("image", e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files ?? []).filter(
      (file): file is File => file instanceof File,
    );
    if (newFiles.length === 0) return;

    const nextFiles = [...(formik.values.images ?? []), ...newFiles];
    formik.setFieldValue("images", nextFiles);

    const newUrls = newFiles.map((file) => URL.createObjectURL(file));
    setAdditionalImagePreviews((prev) => [...prev, ...newUrls]);

    e.target.value = "";
  };

  const removeAdditionalImage = (index: number) => {
    const currentFiles = formik.values.images ?? [];
    const nextFiles = currentFiles.filter((_, i) => i !== index);
    formik.setFieldValue("images", nextFiles);

    setAdditionalImagePreviews((prev) => {
      const urlToRemove = prev[index];
      if (urlToRemove) URL.revokeObjectURL(urlToRemove);
      return prev.filter((_, i) => i !== index);
    });
  };

  if (!user?.blog) {
    return <AccessDeniedScreen />;
  } else {
    return (
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 w-full"
      >
        <div className="flex lg:flex-row sm:flex-row flex-col justify-between w-full items-stretch gap-4">
          <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/2">
            <label
              htmlFor="title"
              className={`text-base font-medium ${
                formik.errors.title && formik.touched.title
                  ? "text-light-red"
                  : "text-black"
              } `}
            >
              {formik.errors.title && formik.touched.title
                ? "Title - "
                : "Title:"}
              {formik.touched.title && formik.errors.title && (
                <span className="text-xs mt-1">{formik.errors.title}</span>
              )}
            </label>
            <textarea
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="title"
              rows={4}
              className="border resize-none border-light-red p-4 transition-colors outline-0 rounded-lg w-full h-[50px] text-sm sm:h-[110px] lg:h-[110px] overflow-y-hidden"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-1/2 lg:w-1/2">
            <label
              htmlFor="image"
              className={`text-base font-medium ${
                formik.errors.image && formik.touched.image
                  ? "text-light-red"
                  : "text-black"
              } `}
            >
              {formik.errors.image && formik.touched.image
                ? "Image - "
                : "Image:"}
              {formik.touched.image && formik.errors.image && (
                <span className="text-xs mt-1">{formik.errors.image}</span>
              )}
            </label>
            <input
              type="file"
              hidden
              ref={imageRef}
              accept="image/*"
              onChange={handleImageChange}
            />
            <div
              className="border resize-none border-light-red p-4 rounded-lg w-full h-[110px] cursor-pointer flex items-center justify-center"
              onClick={() => {
                if (imageRef.current) {
                  imageRef.current.click();
                }
              }}
            >
              {prevImage ? (
                <img
                  src={prevImage}
                  alt="prev-img"
                  className="h-23 w-23 object-cover"
                />
              ) : (
                <img
                  src={assets.upload}
                  alt="upoad-img"
                  className="object-contain"
                />
              )}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <label htmlFor="images" className="text-base font-medium">
                More Images (optional):
              </label>
              <input
                type="file"
                hidden
                ref={imagesRef}
                accept="image/*"
                multiple
                onChange={handleImagesChange}
              />
              <div
                className="border border-light-red p-3 rounded-lg w-full cursor-pointer"
                onClick={() => imagesRef.current?.click()}
              >
                {additionalImagePreviews.length > 0 ? (
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-black/70">
                      {additionalImagePreviews.length} selected
                    </span>
                    <span className="text-xs text-light-red font-medium">
                      Add more
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-black/70">
                    <img
                      src={assets.upload}
                      alt="upload-more"
                      className="w-4 h-4 object-contain"
                    />
                    <span>Select multiple images</span>
                  </div>
                )}
              </div>

              {additionalImagePreviews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {additionalImagePreviews.map((url, index) => (
                    <div
                      key={`${url}-${index}`}
                      className="relative w-16 h-16 rounded-md overflow-hidden border border-black/10"
                    >
                      <img
                        src={url}
                        alt={`additional-${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        aria-label="Remove image"
                        className="absolute top-1 right-1 bg-black/70 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                        onClick={() => removeAdditionalImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full items-stretch gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="details"
              className={`text-base font-medium ${
                formik.errors.details && formik.touched.details
                  ? "text-light-red"
                  : "text-black"
              } `}
            >
              {formik.errors.details && formik.touched.details
                ? "Details - "
                : "Details:"}
              {formik.touched.details && formik.errors.details && (
                <span className="text-xs mt-1">{formik.errors.details}</span>
              )}
            </label>
            <textarea
              name="details"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="details"
              rows={10}
              className="border resize-none border-light-red p-4 transition-colors outline-0 rounded-lg w-full text-sm styledScrollbar"
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="p-3 bg-light-red rounded-md text-white font-medium cursor-pointer"
        >
          {formik.isSubmitting ? "Posting to eye..." : "Post to eye"}
        </button>
      </form>
    );
  }
};
export default AddPost;
