import React from "react";
import { assets } from "../../assets/assets";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { useFormik } from "formik";
import * as Yup from "yup";

const Contact = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      message: Yup.string().required("Message is required"),
    }),

    onSubmit: (values) => {
      console.log("Form submitted:", values);
      alert("Message sent!");
      formik.resetForm();
    },
  });

  return (
    <div>
      <div
        className="relative flex items-center justify-center text-center text-white h-[30vh] md:h-[50vh]"
        style={{
          backgroundImage: `url(${assets.cont})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative px-4">
          <h1 className="text-4xl md:text-6xl font-medium">Contact Us</h1>
          <p className="text-sm md:text-base">
            We’d love to hear from you — share your story, feedback, or inquiries with us
          </p>
        </div>
      </div>

      <div className="w-full px-4 md:px-10 lg:px-20 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* LEFT FORM */}
          <div className="bg-white shadow-sm rounded-xl p-6 md:p-10">
            <form className="space-y-6" onSubmit={formik.handleSubmit}>

              {/* Name */}
              <div>
                <label className="font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full mt-2 border ${
                    formik.touched.name && formik.errors.name
                      ? "border-red-500"
                      : "border-gray-300"
                  } p-3 rounded-md outline-none`}
                />
                {formik.touched.name && formik.errors.name && (
                  <p className="text-red-600 text-sm">{formik.errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="font-medium">Email:</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full mt-2 border ${
                    formik.touched.email && formik.errors.email
                      ? "border-red-500"
                      : "border-gray-300"
                  } p-3 rounded-md outline-none`}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-600 text-sm">{formik.errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="font-medium">Message</label>
                <textarea
                  name="message"
                  placeholder="Send a Message"
                  value={formik.values.message}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full mt-2 border ${
                    formik.touched.message && formik.errors.message
                      ? "border-red-500"
                      : "border-gray-300"
                  } p-3 rounded-md h-40 outline-none resize-none`}
                ></textarea>
                {formik.touched.message && formik.errors.message && (
                  <p className="text-red-600 text-sm">{formik.errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[var(--color-ligt-red)] hover:bg-red-700 text-white py-3 rounded-md text-[16px] font-medium transition"
              >
                Submit
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Get in Touch</h1>

            <div className="space-y-5">
              {/* Phone */}
              <div className="flex items-start gap-4 p-5 border border-black/10 rounded-md shadow-sm">
                <div className="text-white bg-[var(--color-ligt-red)] text-2xl w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                  <FaPhone size={25} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Phone Number</p>
                  <p className="text-gray-700">09028315839 / 09026793467</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 border border-black/10 rounded-md shadow-sm">
                <div className="text-white bg-[var(--color-ligt-red)] text-2xl w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                  <FaEnvelope size={25} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Email Address</p>
                  <p className="text-gray-700">alabiidris@gmail.com</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 p-5 border border-black/10 rounded-md shadow-sm">
                <div className="text-white bg-[var(--color-ligt-red)] text-2xl w-[50px] h-[50px] rounded-[10px] flex justify-center items-center">
                  <FaMapMarkerAlt size={25} />
                </div>
                <div>
                  <p className="font-semibold text-lg">Location</p>
                  <p className="text-gray-700">Under G, Ogbomoso, Oyo State</p>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="mt-10">
              <h1 className="text-2xl font-medium my-15">Connect with Us</h1>

              <div className="flex items-center gap-5 text-3xl">
                <FaInstagram className="cursor-pointer hover:text-[var(--color-ligt-red)] transition" />
                <FaFacebook className="cursor-pointer hover:text-[var(--color-ligt-red)] transition" />
                <FaXTwitter className="cursor-pointer hover:text-[var(--color-ligt-red)] transition" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
