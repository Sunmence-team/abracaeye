import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useScreenSize } from "../../hook/useScreenSize";
import { useUser } from "../../context/UserContext";
import { assets } from "../../assets/assets";
import { globals } from "../../constants";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const screen = useScreenSize();
  const navigate = useNavigate();

  const { user, isLoggedIn, token, encryptedToken, refreshUser } = useUser()
  const firstName = user?.name?.split(" ")?.[0]
  const lastName = user?.name?.split(" ")?.[1]
  const userInitials = `${firstName?.split("")[0].toUpperCase()}${lastName ? lastName?.split("")[0].toUpperCase() : ''}`

  const primaryHref = (isLoggedIn && encryptedToken)
    ? `/auth-redirect?token=${encodeURIComponent(encryptedToken)}&redirectUrl=${globals.redirectIdentifiers[3]}`
    : `/auth/login?redirectUrl=${globals.redirectIdentifiers[3]}`;

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    // address: Yup.string().required("Address is required"),
  });

  useEffect(() => {
    refreshUser(token ?? "")
  }, [token])

  return (
    <div className="w-full min-h-screen flex gap-6 lg:flex-row flex-col px-1">
      <div className="w-full lg:w-3/4 flex flex-col gap-6">
        <div className="w-full bg-white p-4 shadow rounded-lg flex md:flex-row flex-col gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-9 lg:w-16 h-9 lg:h-16 rounded-full bg-dark-red ring-4 ring-dark-red/20 text-white flex items-center justify-center lg:text-2xl text-lg font-semibold">{userInitials}</div>
            <div>
              <h2 className="font-semibold text-lg capitalize">{user?.name}</h2>
              <p className="text-gray-500 text-sm">Email: {user?.email}</p>
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
              fullName: user?.name || "",
              email: user?.email || "",
              // address: "Under G, Ogbomoso.",
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

                {/* <div className="flex flex-col gap-2">
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
                </div> */}

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

      <div className="hidden w-full lg:w-1/4 lg:flex flex-col gap-4">
        {!user?.vendor && (
          <div className="w-full lg:w-1/4 flex flex-col gap-4 lg:pb-0 pb-25 mt-3">
            <div className="w-full bg-white p-5 shadow rounded-3xl border border-black/10 flex flex-col gap-4">
              <div>
                <h2 className="text-base lg:text-lg font-semibold text-gray-900">
                  Introducing our Marketplace!
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                  Do you have services and products to render? Become a vendor today and showcase your products when it is visible.
                </p>
              </div>

              <div className="w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 aspect-4/3">
                <img
                  className="w-full h-full object-cover"
                  src={assets.vendor}
                  alt="vendor-placeholder"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  className="w-full px-4 py-3 rounded-full bg-dark-red text-white text-sm font-semibold hover:opacity-95 transition disabled:opacity-60 cursor-pointer"
                  onClick={() => navigate(primaryHref)}
                >
                  Apply now
                </button>
                <p className="text-xs text-gray-500">
                  Apply to start listing products and selling to our vast community of customers.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default Profile;
