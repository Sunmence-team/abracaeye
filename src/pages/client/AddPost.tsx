import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import api from "../../helpers/api";
import { toast } from "sonner";
import { useUser } from "../../context/UserContext";
import AccessDeniedScreen from "../../components/notify/AccessDeniedScreen";
import { useNavigate } from "react-router-dom";

const postSchema = yup.object({
  title: yup.string().required("Please provide post title"),
  image: yup.mixed<File>().required("Please provide an image"),
  images: yup.array().of(yup.mixed<File>()),
  body: yup.string().required("Please provide post body"),
});

const AddPost: React.FC = () => {
  const { user, token, refreshUser } = useUser();
  const navigate = useNavigate();
  const imageRef = useRef<HTMLInputElement>(null);
  const [multiPreviews, setMultiPreviews] = useState<string[]>([]);

  useEffect(() => {
    refreshUser(token ?? "");
  }, [token]);

  const formik = useFormik({
    initialValues: {
      title: "",
      image: null as File | null,
      images: [] as File[],
      body: "",
    },
    validationSchema: postSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const formData = new FormData();

      formData.append("title", values.title);

      formData.append(
        "body",
        JSON.stringify({
          content: values.body,
        }),
      );

      formData.append("cover_image", values.image as File);

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => {
          formData.append("images[]", file);
        });
      }

      setSubmitting(true);

      try {
        const res = await api.post("/blogs", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200 || res.status === 201) {
          toast.success("Post created successfully");
          setTimeout(() => {
            navigate("/dashboard/posts");
          }, 500);
        }
      } catch (error: any) {
        console.log("error creating blog", error);
        toast.error(error.message);
      } finally {
        setSubmitting(false);
        resetForm();
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("image", e.target.files[0]);
    }
  };

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      formik.setFieldValue("images", filesArray);

      const previewUrls = filesArray.map((file) => URL.createObjectURL(file));
      setMultiPreviews(previewUrls);
    }
  };

  const removeMultipleImage = (index: number) => {
    const updatedFiles = [...formik.values.images];
    const updatedPreviews = [...multiPreviews];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    formik.setFieldValue("images", updatedFiles);
    setMultiPreviews(updatedPreviews);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const files = Array.from(e.dataTransfer.files);

    formik.setFieldValue("images", files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setMultiPreviews(previewUrls);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const inputClass =
    "w-full rounded-lg border border-light-red/50 h-11 indent-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none transition";

  if (!user?.blog) {
    return <AccessDeniedScreen />;
  } else {
    return (
      <form
        onSubmit={formik.handleSubmit}
        className="w-full grid gap-8 md:grid-cols-2 items-stretch"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium">Title</label>
          <input
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={inputClass}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-600 text-sm">{formik.errors.title}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-medium">Cover Image</label>
          <input
            type="file"
            ref={imageRef}
            accept="image/*"
            onChange={handleImageChange}
            className={`${inputClass} imageInput indent-0!`}
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-600 text-sm">{formik.errors.image}</p>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="font-medium">Gallery Images</label>
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="border border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer"
          >
            <p className="text-sm text-gray-500">
              Drag & drop images here or click to upload
            </p>

            <input
              type="file"
              multiple
              onChange={handleMultipleImages}
              className="hidden"
              id="multiUpload"
            />

            <label
              htmlFor="multiUpload"
              className="text-blue-500 cursor-pointer"
            >
              Browse files
            </label>
            {/* Preview Grid */}
            <div className="flex flex-wrap justify-center gap-3 mt-3">
              {multiPreviews.map((img, index) => (
                <div key={index} className="relative w-1/6">
                  <img src={img} className="h-28 w-full object-cover rounded" />

                  <button
                    type="button"
                    onClick={() => removeMultipleImage(index)}
                    className="absolute top-1 right-1 bg-black text-white text-xs px-1 rounded"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
          {formik.touched.images && formik.errors.images && (
            <p className="text-red-600 text-sm">
              {formik.errors.images as string}
            </p>
          )}
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="font-medium">Body</label>
          <textarea
            name="body"
            rows={6}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`${inputClass} h-auto! px-2 py-3 resize-none`}
          />
          {formik.touched.body && formik.errors.body && (
            <p className="text-red-600 text-sm">{formik.errors.body}</p>
          )}
        </div>
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="md:w-1/2 w-full p-3 bg-light-red rounded-md text-white font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formik.isSubmitting ? "Posting to eye..." : "Post to eye"}
          </button>
        </div>
      </form>
    );
  }
};
export default AddPost;
