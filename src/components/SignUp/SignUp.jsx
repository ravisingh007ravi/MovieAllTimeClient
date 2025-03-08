import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { UserSchema } from "../Valiadtion/AllValidation";
import { APIURL } from "../../GlobalURL";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaRegImage } from "react-icons/fa6";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import { showSuccessToast, showErrorToast, showWarningToast } from "../React_Toastify/ToastNotifications";

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({ password: false, confirmPassword: false });

  const togglePasswordVisibility = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const inputData = [
    { label: "Name", name: "name", type: "text", placeholder: "Enter Your Name...", icon: <MdDriveFileRenameOutline /> },
    { label: "Email ID", name: "email", type: "email", placeholder: "Enter Your Email...", icon: <MdEmail /> },
    { label: "Password", name: "password", type: showPassword.password ? "text" : "password", placeholder: "Enter Your Password...", icon: <RiLockPasswordFill />, isPassword: true },
    { label: "Confirm Password", name: "confirmPassword", type: showPassword.confirmPassword ? "text" : "password", placeholder: "Enter Your Confirm Password...", icon: <TbPasswordFingerprint />, isPassword: true },
  ];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (selectedFile) formData.append("profileImage", selectedFile);

        const response = await axios.post(`${APIURL}createUser`, formData);
        sessionStorage.setItem("userEmail", response.data.email);
        const isVerify = response.data.isVerify

        if (isVerify) navigate("/login");

        else if (response.status === 200 || response.status === 201) {
          showSuccessToast("User Created Successfully");
          navigate(`/otpverification/${response.data.id}`);
        }
        else showErrorToast('Invalid Data')
      }
      catch (error) { 
        showWarningToast(error.response?.data?.msg || "An error occurred")}
        // window.alert(error.response?.data?.msg || "An error occurred"); }
      finally { setIsLoading(false); }

    },
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

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
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Sign Up</h2>
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

        <div className="mb-4">
          <div className="flex items-center gap-2">
            <FaRegImage />
            <label htmlFor="profileImage" className="block font-medium text-gray-700">Upload Image</label>
          </div>
          <input
            className="w-full p-2 bg-white/40 border border-white/50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && <img src={preview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded-full shadow-lg mx-auto" />}
        </div>

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
            "Sign Up"
          )}
        </button>

        <div className="mt-4 text-center">
          <Link to="/LogIn">
            <button className="w-full p-3 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white">
              Log In
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
