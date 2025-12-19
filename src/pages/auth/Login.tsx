import { useState } from "react";
import { LuUserRound } from "react-icons/lu";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { HiLockClosed } from "react-icons/hi2";
import api from "../../helpers/api";
import { useUser } from "../../context/UserContext";
import { assets } from "../../assets/assets";

interface loginFormValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const { setToken, setRole, refreshUser } = useUser();

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik<loginFormValues>({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Too short"),
      rememberMe: Yup.bool().optional(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await api.post(`/auth/login`, values, {
          headers: { "Content-Type": "application/json" },
        });

        console.log("login response", response);
        if (response.status === 200) {
          const token = response.data.token;
          const role = response.data.role;

          localStorage.setItem("token", token);
          localStorage.setItem("role", role);
          setToken(token);
          setRole(role);

          await refreshUser(token);

          toast.success("Welcome back! Redirecting...");
          setTimeout(() => {
            navigate(role === "admin" ? "/dashboard/admin/users" : "/");
          }, 1500);
        }
      } catch (err: any) {
        console.error("Login error:", err);
        if (axios.isAxiosError(err) && err.response) {
          toast.error(err.response.data.message);
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
      <div className="relative z-1 h-screen w-full flex items-center justify-center overflow-y-hidden">
        <div className="absolute -z-1 top-0 left-0 bg-[#FF7979]/10 rounded-br-full rounded-bl w-64 h-64 md:w-150 md:h-150 p-8">
          <Link to={"/"}><img src={assets.logo} /></Link>
        </div>

        <div className="flex flex-col justify-center gap-5 items-center w-full max-w-md px-4 h-screen z-80">
          <div className="text-center flex flex-col">
            <h2 className="font-semibold text-[30px]">Login</h2>
            <p>
              Don't have an Account?
              <span className="font-semibold text-light-red">
                {" "}
                <Link to={"/auth/register"}>Sign up</Link>{" "}
              </span>
            </p>
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="space-y-5 w-full flex flex-col items-center"
          >
            {/* EMAIL */}
            <div className="space-y-1 w-full">
              <div className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[520px] mx-auto h-[53px] flex items-center rounded-2xl border px-2">
                <span>
                  <LuUserRound size={20} className="text-gray-500" />
                </span>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                  className="w-full rounded-lg h-full indent-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none transition"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-600 text-sm">{formik.errors.email}</p>
              )}
            </div>
            <div className="space-y-1 w-full">
              {/* PASSWORD */}
              <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[520px] mx-auto h-[53px] flex items-center rounded-2xl border px-2 transition">
                <span>
                  <HiLockClosed size={20} className="text-gray-500" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  required
                  className="w-full rounded-lg h-full indent-2 text-sm placeholder:text-gray-500 placeholder:font-semibold focus:outline-none transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FaEyeSlash size={20} />
                  ) : (
                    <FaEye size={20} />
                  )}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-600 text-sm">{formik.errors.password}</p>
              )}
            </div>
            {/* FORGET PASSWORD */}
            <div className="w-[300px] lg:w-[400px] md:w-[400px] flex max-w-[520px] ">
              <Link to={"/auth/forgetPassword"} className="text-sm">
                Forget Password?
              </Link>
            </div>
            {/* BUTTON */}
            <div className="flex justify-center text-center gap-3 w-full max-w-[520px]">
              <button
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
                className="rounded-full bg-light-red text-white w-full max-w-[300px] sm:max-w-[350px] md:max-w-[520 px] p-2 font-semibold text-[20px] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {formik.isSubmitting ? "Logging in..." : "Next"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
