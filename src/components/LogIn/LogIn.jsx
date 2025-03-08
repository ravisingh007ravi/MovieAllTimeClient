import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { LogInSchema } from "../Valiadtion/AllValidation";
import { APIURL } from "../../GlobalURL";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegImage } from "react-icons/fa6";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import { showSuccessToast, showErrorToast, showWarningToast } from "../React_Toastify/ToastNotifications";

export default function LogIn() {
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const inputData = [
    { label: "Email ID", name: "email", type: "email", placeholder: "Enter Your Email...", icon: <MdEmail /> },
    { label: "Password", name: "password", type: showPassword.password ? "text" : "password", placeholder: "Enter Your Password...", icon: <RiLockPasswordFill />, isPassword: true },
  ];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: "", password: ""},
    validationSchema: LogInSchema,
    // onSubmit: async (values) => {
    //   setIsLoading(true);
    //   try {
    //     showSuccessToast('HELLO')
    //   }
    //   catch (error) { 
    //     showWarningToast(error.response?.data?.msg || "An error occurred")}
    //   finally { setIsLoading(false); }

    // },
  });

console.log(values)
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white/20 mt-20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 border border-white/30 duration-500 hover:scale-105"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">RS</span>
          </div>
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Log In</h2>
        </div>

        {inputData.map(({ label, name, type, placeholder, icon, isPassword }, key) => (
          <div key={key} className="mb-4">
            <label htmlFor={name} className="block font-medium text-gray-700">{label}</label>
            <div className="relative flex items-center">
              <div className="absolute left-3">{icon}</div>
              <input
                className="w-full p-3 pl-10 pr-10 bg-white/40 text-gray-800 border border-white/50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPassword && (
                <div className="absolute right-3 cursor-pointer" onClick={() => togglePasswordVisibility(name)}>
                  {showPassword[name] ? <AiFillEyeInvisible className="text-gray-500" /> : <AiFillEye className="text-gray-500" />}
                </div>
              )}
            </div>
            {errors[name] && touched[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
          </div>
        ))}

       

        <button
          type="submit"
          className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
              Uploading...
            </>
          ) : (
            "Log In"
          )}
        </button>

        <div className="mt-4 text-center">
          <Link to="/signup">
            <button className="w-full p-3 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white">
            SignUp
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
