import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { UserSchema } from "./Valoidation";
import { APIURL } from "../../GlobalURL";
import { MdDriveFileRenameOutline, MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { TbPasswordFingerprint } from "react-icons/tb";
import { FaRegImage } from "react-icons/fa6";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
import { showSuccessToast, showErrorToast, showWarningToast } from "../React_Toastify/ToastNotifications";
import { motion } from "framer-motion";

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
    { label: "Name", name: "name", type: "text", placeholder: "Enter Your Name...", icon: <MdDriveFileRenameOutline className="text-orange-500" /> },
    { label: "Email ID", name: "email", type: "email", placeholder: "Enter Your Email...", icon: <MdEmail className="text-orange-500" /> },
    { label: "Password", name: "password", type: showPassword.password ? "text" : "password", placeholder: "Enter Your Password...", icon: <RiLockPasswordFill className="text-orange-500" />, isPassword: true },
    { label: "Confirm Password", name: "confirmPassword", type: showPassword.confirmPassword ? "text" : "password", placeholder: "Enter Your Confirm Password...", icon: <TbPasswordFingerprint className="text-orange-500" />, isPassword: true },
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
    <div className="min-h-screen sm:pt-25 pt-20 bg-[#0f0f0f] bg-opacity-90 bg-[url('https://res.cloudinary.com/dnpn8ljki/image/upload/v1748723343/captain_america_brave_new_world_ver2_qgl4de.jpg')] bg-cover bg-center bg-blend-overlay flex items-center justify-center p-4 sm:p-6">
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="relative bg-[#0f0f0f]/90 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-2xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl border border-orange-500/30"
        encType="multipart/form-data"
      >
        <div className="flex flex-col items-center mb-4 sm:mb-6">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-500/10 border border-orange-500/30 shadow-lg flex items-center justify-center mb-3 sm:mb-4"
          >
            <span className="text-2xl sm:text-3xl font-bold text-orange-500">🎬</span>
          </motion.div>
          <h2 className="text-xl sm:text-2xl font-bold text-orange-500">Join MovieHub</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Create your account to continue</p>
        </div>

        {inputData.map(({ label, name, type, placeholder, icon, isPassword }, key) => (
          <motion.div 
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: key * 0.1 }}
            className="mb-3 sm:mb-4"
          >
            <label htmlFor={name} className="block text-xs sm:text-sm font-medium text-gray-300 mb-1">{label}</label>
            <div className="relative flex items-center">
              <div className="absolute left-3 text-gray-400 text-sm sm:text-base">{icon}</div>
              <input
                className="w-full p-2 sm:p-3 pl-8 sm:pl-10 pr-8 sm:pr-10 bg-[#1a1a1a] text-gray-200 text-xs sm:text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent placeholder-gray-500"
                type={type}
                name={name}
                id={name}
                placeholder={placeholder}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {isPassword && (
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="absolute right-3 cursor-pointer text-gray-400 hover:text-orange-500 text-sm sm:text-base"
                  onClick={() => togglePasswordVisibility(name)}
                >
                  {showPassword[name] ? <AiFillEyeInvisible /> : <AiFillEye />}
                </motion.div>
              )}
            </div>
            {errors[name] && touched[name] && <p className="text-red-400 text-xs mt-1">{errors[name]}</p>}
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-4 sm:mb-5"
        >
          <div className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
            <FaRegImage className="text-orange-500" />
            <label htmlFor="profileImage" className="block font-medium">Profile Image</label>
          </div>
          <input
            className="w-full p-1 sm:p-2 mt-1 bg-[#1a1a1a] text-gray-400 text-xs sm:text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent file:mr-2 sm:file:mr-4 file:py-1 sm:file:py-2 file:px-2 sm:file:px-4 file:rounded-md file:border-0 file:text-xs sm:file:text-sm file:font-semibold file:bg-orange-500/20 file:text-orange-500 hover:file:bg-orange-500/30"
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="mt-2 sm:mt-3 flex justify-center"
            >
              <img 
                src={preview} 
                alt="Preview" 
                className="h-20 w-20 sm:h-24 sm:w-24 object-cover rounded-full border-2 border-orange-500/50 shadow-lg" 
              />
            </motion.div>
          )}
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`w-full p-2 sm:p-3 rounded-lg font-medium text-sm sm:text-base flex items-center justify-center ${isLoading ? "bg-gray-700 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700 text-white"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : (
            "Sign Up Now"
          )}
        </motion.button>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 sm:mt-6 text-center text-gray-400 text-xs sm:text-sm"
        >
          <p>
            Already have an account?{' '}
            <Link to="/LogIn">
              <motion.span 
                whileHover={{ color: "#f97316" }}
                className="text-orange-500 font-medium cursor-pointer hover:underline"
              >
                Log In
              </motion.span>
            </Link>
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
}