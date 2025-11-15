import React, { useRef, useState } from "react";
import { assets } from "../../assets/assets";
import * as yup from "yup";
import { useFormik } from "formik";

const AddPost: React.FC = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const [prevImage, setPrevImage] = useState<string | null>(null);
  const postSchema = yup.object({
    title: yup.string().required("Please provide post title"),
    image: yup.mixed<File>().required("Please provide an image"),
    details: yup.string().required("Please provide post details"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null as File | null,
      details: "",
    },
    validationSchema: postSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("image", values.image as File);
      formData.append("details", values.details);
    },
  });
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setPrevImage(url);
      formik.setFieldValue("image", e.target.files[0]);
    }
  };
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6 w-full">
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
            className="border resize-none border-light-red p-4 transition-colors outline-0 rounded-lg w-full h-[50px] sm:h-[110px] lg:h-[110px] overflow-y-hidden"
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
                alt="upoad-img"
                className="h-23 w-23 object-cover"
              />
            ) : (
              <img src={assets.upload} alt="upoad-img" />
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
            rows={4}
            className="border resize-none border-light-red p-4 transition-colors outline-0 rounded-lg w-full h-[136px] overflow-y-hidden"
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="p-3 bg-light-red rounded-md text-white font-medium cursor-pointer"
      >
        Post to eye
      </button>
    </form>
  );
};

export default AddPost;
