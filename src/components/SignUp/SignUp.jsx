import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { UserSchema } from "../Valiadtion/AllValidation";
import { APIURL } from "../../GlobalURL";

export default function SignUp() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    validationSchema: UserSchema,
    onSubmit: async (values) => {
      setIsLoading(true); // Start loading
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("password", values.password);
        if (selectedFile) {
          formData.append("profileImage", selectedFile);
        }

        const response = await axios.post(`${APIURL}createUser`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 200 || response.status === 201) {
          navigate("/otpverification");
        } else {
          window.alert("Invalid data");
        }
      } catch (error) {
        console.error("Error:", error);
        window.alert(error.response?.data?.msg || "An error occurred");
      } finally {
        setIsLoading(false); // Stop loading after response
      }
    },
  });

  const formFields = [
    { label: "Name", name: "name", type: "text", placeholder: "Enter Your Name..." },
    { label: "Email ID", name: "email", type: "email", placeholder: "Enter Your Email..." },
    { label: "Password", name: "password", type: "password", placeholder: "Enter Your Password..." },
    { label: "Confirm Password", name: "confirmPassword", type: "password", placeholder: "Enter Your Confirm Password..." },
  ];

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-6 bg-white p-8 mt-10 rounded-lg shadow-2xl transition-all duration-500 hover:scale-105"
        encType="multipart/form-data"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">Sign Up</h1>

        {/* Dynamically Generated Inputs */}
        {formFields.map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
        <div>
          <label htmlFor="profileImage">Upload Image</label>
          <input
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            type="file"
            name="profileImage"
            id="profileImage"
            accept="image/*"
            onChange={(event) => setSelectedFile(event.currentTarget.files[0])}
          />
        </div>

        {/* Submit Button with Spinner */}
        <button
          type="submit"
          className={`w-full p-3 rounded-lg transition-all ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex justify-center items-center">
              <svg className="animate-spin h-5 w-5 mr-2 border-4 border-white border-t-transparent rounded-full" viewBox="0 0 24 24"></svg>
              Uploading...
            </div>
          ) : (
            "Sign Up"
          )}
        </button>

        <Link to="/LogIn">
          <button className="w-full p-3 border-2 border-blue-600 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white">
            Log In
          </button>
        </Link>
      </form>
    </div>
  );
}
