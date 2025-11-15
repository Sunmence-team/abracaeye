import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios'
import { toast } from "sonner";
import { LuUserRound } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { HiLockClosed } from "react-icons/hi2";


const Register: React.FC = () => {

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Fullrname is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(``, values, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 201 || response.status === 200) {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => {
            navigate("/login");
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
      <div className='relative h-screen w-full flex items-center justify-center overflow-hidden'>

        {/* Background shape */}
        <div className='absolute top-0 left-0 bg-[#FF7979]/10 rounded-br-full rounded-bl 
    w-64 h-64 sm:w-96 sm:h-96 md:w-150 md:h-150'>
        </div>

        <div className='flex flex-col justify-center gap-5 items-center w-full px-4 h-screen'>

          <div className='text-center flex flex-col'>
            <h2 className='font-semibold text-[30px]'>Create Account</h2>

            <p className='font-medium text-[18px]'>
              Already have an Account?
              <span className='font-semibold text-[var(--color-light-red)]'>
                <Link to={'/login'}> Sign In</Link>
              </span>
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-5 w-full max-w-[520px]'>

            <div className='w-full h-[53px] flex items-center rounded-2xl border p-2'>
              <span><LuUserRound size={20} className='text-gray-500' /></span>
              <input
                type="text"
                placeholder='Full Name'
                value={formik.values.fullname}
                onChange={formik.handleChange}
                required
                className="w-full rounded-lg p-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none"
              />
            </div>

            <div className='w-full h-[53px] flex items-center rounded-2xl border p-2'>
              <span><LuUserRound size={20} className='text-gray-500' /></span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                className="w-full rounded-lg p-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none"
              />
            </div>

            <div className='relative w-full h-[53px] flex items-center rounded-2xl border p-2'>
              <span><HiLockClosed size={20} className='text-gray-500' /></span>
              <input
                type="password"
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                className="w-full rounded-lg p-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            <div className='space-y-2'>
              <label className='flex gap-2'>
                <input type="radio" className='accent-[var(--color-light-red)]' />
                <span>I agree to the terms and conditions</span>
              </label>

              <label className='flex gap-2'>
                <input type="radio" className='accent-[var(--color-light-red)]' />
                <span>I want to be able to post</span>
              </label>

              <label className='flex gap-2'>
                <input type="radio" className='accent-[var(--color-light-red)]' />
                <span>I am a vendor, I want to sell</span>
              </label>
            </div>

            <div className='flex flex-col text-center gap-3'>
              <button
                type='submit'
                disabled={formik.isSubmitting}
                className='rounded-full bg-[var(--color-light-red)] text-white w-full p-2 font-semibold text-[20px]'
              >
                Next
              </button>
            </div>

          </form>

        </div>

      </div>

    </>
  )
}

export default Register