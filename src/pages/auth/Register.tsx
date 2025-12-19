import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { toast } from "sonner";
import { LuUserRound } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi2";
import { GiPerson } from "react-icons/gi";
import api from '../../helpers/api';
import { assets } from '../../assets/assets';

interface registerFormValues {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  termsAndCondition: boolean;
  blog: boolean;
  vendor: boolean;
}

const Register: React.FC = () => {

  const [showPassword, setShowPassword] = useState({
    initial: false,
    confirmation: false
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const formik = useFormik<registerFormValues>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      termsAndCondition: false,
      blog: false,
      vendor: false,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Full name is required"),
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      password_confirmation: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is Required'),
      termsAndCondition: Yup.bool()
        .oneOf([true], "You must agree to the terms and conditions")
        .required("You must agree to the terms and conditions"),
      blog: Yup.bool().required("Can only be true or false"),
      vendor: Yup.bool().required("Can only be true or false"),
        
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post(`/auth/register`, values, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("reg response", response)

        if (response.status === 201 || response.status === 200) {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/auth/login");
          }, 2000);
        }
      } catch (err: any) {
        console.error("Registration error:", err);
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message || "Registration failed");
        } else {
          toast.error("Network error. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <div className='relative z-1 min-h-dvh py-20 w-full flex items-center justify-center overflow-hidden'>

        <Link to={"/"} className='fixed top-8 left-8'><img src={assets.logo} /></Link>
        <div className="absolute -z-1 top-0 left-0 bg-[#FF7979]/10 rounded-br-full rounded-bl w-64 h-64 md:w-150 md:h-150"></div>

        <div className='flex flex-col justify-center gap-5 items-center w-full px-4 h-screen'>

          <div className='text-center flex flex-col'>
            <h2 className='font-semibold text-[30px]'>Create Account</h2>

            <p className='font-medium text-[18px]'>
              Already have an Account?
              <span className='font-semibold text-light-red'>
                <Link to={'/auth/login'}> Sign In</Link>
              </span>
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-5 w-full max-w-[520px]'>

            <div className="space-y-1 w-full">
              <div className='w-full h-[53px] flex items-center rounded-2xl border px-2'>
                <span><GiPerson size={20} className='text-gray-500' /></span>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder='Full Name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg h-full indent-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none"
                />
              </div>
              {formik.touched.name && formik.errors.name && (<p className='text-red-600 text-sm'>{formik.errors.name}</p>)}
            </div>

            <div className="space-y-1 w-full">
              <div className='w-full h-[53px] flex items-center rounded-2xl border px-2'>
                <span><LuUserRound size={20} className='text-gray-500' /></span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder='Email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg h-full indent-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none"
                />
              </div>
              {formik.touched.email && formik.errors.email && (<p className='text-red-600 text-sm'>{formik.errors.email}</p>)}
            </div>

            <div className="space-y-1 w-full">
              <div className='relative w-full h-[53px] flex items-center rounded-2xl border px-2'>
                <span><HiLockClosed size={20} className='text-gray-500' /></span>
                <input
                  type={showPassword.initial ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg h-full indent-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev =>({
                    ...prev,
                    initial: !prev.initial
                  }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword.initial ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (<p className='text-red-600 text-sm'>{formik.errors.password}</p>)}
            </div>

            <div className="space-y-1 w-full">
              <div className='relative w-full h-[53px] flex items-center rounded-2xl border px-2'>
                <span><HiLockClosed size={20} className='text-gray-500' /></span>
                <input
                  type={showPassword.confirmation ? "text" : "password"}
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder='Confirm password'
                  value={formik.values.password_confirmation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full rounded-lg h-full indent-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({
                    ...prev,
                    confirmation: !prev.confirmation
                  }))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword.confirmation ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {formik.touched.password_confirmation && formik.errors.password_confirmation && (<p className='text-red-600 text-sm'>{formik.errors.password_confirmation}</p>)}
            </div>

            <div className='space-y-2'>
              <div className="space-y-1 w-full">
                <label htmlFor='termsAndCondition' className='flex gap-2'>
                  <input 
                    type="checkbox" 
                    className='accent-light-red'
                    id='termsAndCondition'
                    name='termsAndCondition'
                    checked={formik.values.termsAndCondition}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span>I agree to the terms and conditions</span>
                </label>
                {formik.touched.termsAndCondition && formik.errors.termsAndCondition && (<p className='text-red-600 text-xs'>{formik.errors.termsAndCondition}</p>)}
              </div>

              <div className="space-y-1 w-full">
                <label htmlFor='blog' className='flex gap-2'>
                  <input 
                    type="checkbox" 
                    className='accent-light-red' 
                    id='blog'
                    name='blog'
                    checked={formik.values.blog}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span>I want to be able to post</span>
                </label>
                {formik.touched.blog && formik.errors.blog && (<p className='text-red-600 text-xs'>{formik.errors.blog}</p>)}
              </div>

              <div className="space-y-1 w-full">
                <label htmlFor='vendor' className='flex gap-2'>
                  <input 
                    type="checkbox" 
                    className='accent-light-red' 
                    id='vendor'
                    name='vendor'
                    checked={formik.values.vendor}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <span>I am a vendor, I want to sell</span>
                </label>
                {formik.touched.vendor && formik.errors.vendor && (<p className='text-red-600 text-xs'>{formik.errors.vendor}</p>)}
              </div>
            </div>

            <div className='flex flex-col text-center gap-3'>
              <button
                type='submit'
                disabled={!formik.isValid || formik.isSubmitting}
                className='rounded-full bg-light-red text-white w-full p-2 font-semibold text-[20px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50'
              >
                {formik.isSubmitting ? "Processing..." : "Next"}
              </button>
            </div>

          </form>

        </div>

      </div>

    </>
  )
}

export default Register