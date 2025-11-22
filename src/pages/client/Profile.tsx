import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { assets } from "../../assets/assets";
import { useScreenSize } from "../../hook/useScreenSize";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const screen = useScreenSize();

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    address: Yup.string().required("Address is required"),
  });

  return (
    <div className="w-full min-h-screen flex gap-6 lg:flex-row flex-col">
      <div className="hidden w-full lg:w-1/4 lg:flex flex-col gap-4">
        <button className="w-full p-4 bg-white shadow rounded-lg text-left font-semibold text-gray-700">
          Account Setting
          <p className="text-sm font-normal text-gray-500">
            Details about your personal information
          </p>
        </button>

        <button className="w-full p-4 bg-white shadow rounded-lg text-left font-semibold text-gray-700">
          Notification
          <p className="text-sm font-normal text-gray-500">
            Details about your personal information
          </p>
        </button>

        <button className="w-full p-4 bg-white shadow rounded-lg text-left font-semibold text-gray-700">
          Password and Security
          <p className="text-sm font-normal text-gray-500">
            Details about your personal information
          </p>
        </button>
      </div>

      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        <div className="w-full bg-white p-4 shadow rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={assets.user}
              alt="profile"
              className="w-9 lg:w-16 h-9 lg:h-16 rounded-full object-cover"
            />
            <div>
              <h2 className="font-semibold text-lg">Alabi Drizzy</h2>
              <p className="text-gray-500 text-sm">Username: Big_drizzy</p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-5 py-2 bg-light-red text-white rounded-lg font-medium shadow cursor-pointer"
          >
            {isEditing ? "Cancel" : `${screen.isDesktop || screen.isTablet ? 'Edit Profile' : screen.isMobile ? 'Edit' : ''}`}
          </button>
        </div>

        <div className="w-full bg-white p-6 shadow rounded-lg">
          <h3 className="font-semibold text-lg mb-6">
            Change user information here
          </h3>

          <Formik
            initialValues={{
              fullName: "Alabi Drizzy",
              email: "Alabidrizzy@gmail.com",
              address: "Under G, Ogbomoso.",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
              setIsEditing(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Full name
                  </label>
                  <Field
                    name="fullName"
                    disabled={!isEditing}
                    className="border rounded-lg p-3 w-full disabled:bg-gray-100"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="p"
                    className="text-light-red text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Field
                    name="email"
                    type="email"
                    disabled={!isEditing}
                    className="border rounded-lg p-3 w-full disabled:bg-gray-100"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-light-red text-sm"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <Field
                    name="address"
                    disabled={!isEditing}
                    className="border rounded-lg p-3 w-full disabled:bg-gray-100"
                  />
                  <ErrorMessage
                    name="address"
                    component="p"
                    className="text-light-red text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!isEditing || isSubmitting}
                  className="px-5 py-3 bg-light-red text-white rounded-lg font-medium mt-4 disabled:opacity-50 cursor-pointer"
                >
                  Update Information
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Profile;
