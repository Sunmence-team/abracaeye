import React, { useState } from 'react'
import { LuUserRound } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { HiLockClosed } from "react-icons/hi2";


const Login = () => {

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      login: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Too short"),
      rememberMe: Yup.bool().required("Can only be true or false"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(``, values, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);
          toast.success("Welcome back! Redirecting...");

          setTimeout(() => {
            navigate("/dashboard/appointments");
          }, 1500);
        }
      } catch (err: any) {
        console.error("Login error:", err);
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message || "Invalid email or password");
        } else {
          toast.error("Login failed. Please try again.");
        }
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <>
      <div className='relative h-screen w-full flex items-center justify-center overflow-hidden'>

        <div className='absolute top-0 left-0 bg-[#FF7979]/10 rounded-br-full rounded-bl w-64 h-64 md:w-150 md:h-150'></div>

        <div className='flex flex-col justify-center gap-5 items-center w-full max-w-md px-4 h-screen z-80'>
          <div className='text-center flex flex-col'>
            <h2 className='font-semibold text-[30px]'>Login</h2>
            <p>Don't have an Account?
              <span className='font-semibold text-[var(--color-light-red)]'> <Link to={'/register'} >Sign up</Link> </span>
            </p>
          </div>

          <form onSubmit={formik.handleSubmit} className='space-y-5 w-full flex flex-col items-center'>

            {/* EMAIL */}
            <div className='w-full max-w-[300px] sm:max-w-[350px] md:max-w-[520px] h-[53px] flex items-center rounded-2xl border p-2'>
              <span><LuUserRound size={20} className='text-gray-500' /></span>
              <input type='text'
                name='email'
                placeholder='Email'
                value={formik.values.email}
                onChange={formik.handleChange}
                required
                className="w-full rounded-lg p-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none transition"
              />
            </div>

            {/* PASSWORD */}
            <div className='relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[520px] h-[53px] flex items-center rounded-2xl border p-2 transition'>
              <span><HiLockClosed size={20} className='text-gray-500' /></span>

              <input type={showPassword ? "text" : "password"}
                name='password'
                placeholder='Password'
                value={formik.values.password}
                onChange={formik.handleChange}
                required
                className="w-full rounded-lg p-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {/* FORGET PASSWORD */}
            <div className='w-full max-w-[520px] flex justify-end'>
              <Link to={'/forgetPassword'} className='text-sm'>
                Forget Password?
              </Link>
            </div>

            {/* BUTTON */}
            <div className='flex flex-col text-center gap-3 w-full max-w-[520px]'>
              <button type='submit' className='rounded-full bg-[var(--color-light-red)] text-white w-full p-2 font-semibold text-[20px]'>
                Next
              </button>
            </div>

          </form>

        </div>
      </div>
    </>
  )
}

export default Login
