import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { UserSchema } from "../Valiadtion/AllValidation";
import { APIURL } from "../../GlobalURL";

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (selectedFile) {
          formData.append("profileImage", selectedFile);
        }

        const response = await axios.post(`${APIURL}createUser`, formData);
        const id = response.data.id;
        const UserEmail = response.data.email;

        sessionStorage.setItem("userEmail", UserEmail);

        if (response.status === 200 || response.status === 201) {
          navigate(`/otpverification/${id}`);
        } else {
          window.alert("Invalid data");
        }
      } catch (error) {
        console.error("Error:", error);
        window.alert(error.response?.data?.msg || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const inputData = [
    { label: "Name", name: "name", type: "text", placeholder: "Enter Your Name..." },
    { label: "Email ID", name: "email", type: "email", placeholder: "Enter Your Email..." },
    { label: "Password", name: "password", type: "password", placeholder: "Enter Your Password..." },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Enter Your Confirm Password..." },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <form
        onSubmit={formik.handleSubmit}
        className="relative bg-white/20 mt-20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 border border-white/30 duration-500 hover:scale-105"
        encType="multipart/form-data"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">RS</span>
          </div>
          <h2 className="text-xl font-semibold mt-4 text-gray-800">Sign Up</h2>
        </div>

        {/* Dynamically Generated Inputs */}
        {inputData.map(({ label, name, type, placeholder }) => (
          <div key={name} className="mb-4">
            <label htmlFor={name} className="block font-medium text-gray-700">{label}</label>
            <input
              className="w-full p-3 bg-white/40 text-gray-800 border border-white/50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              value={formik.values[name]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors[name] && formik.touched[name] && <p className="text-red-500 text-sm">{formik.errors[name]}</p>}
          </div>
        ))}

        {/* Profile Image Input */}
        <div className="mb-4">
          <label htmlFor="profileImage" className="block font-medium text-gray-700">Upload Image</label>
          <input
            className="w-full p-2 bg-white/40 border border-white/50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="mt-2 flex justify-center">
              <img src={preview} alt="Preview" className="h-20 w-20 object-cover rounded-full shadow-lg" />
            </div>
          )}
        </div>

        {/* Submit Button with Spinner */}
        <button
          type="submit"
          className={`w-full p-3 rounded-lg transition-all flex items-center justify-center ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
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
          <Link to="/LogIn" className="w-full block">
            <button className="w-full p-3 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white">
              Log In
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
