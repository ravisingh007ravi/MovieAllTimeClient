import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { UserSchema } from '../Valiadtion/AllValidation';

export default function LogIn() {

  const logInformdata = [
    { labelName: 'Email ID', name: 'email', placeholder: 'Enter Your Email...', type: 'text' },
    { labelName: 'Password', name: 'password', placeholder: 'Enter Your Password...', type: 'password' },
  ];

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: UserSchema,
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <form 
        onSubmit={handleSubmit}
        className="relative bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl w-96 border border-white/30 transform transition-all duration-500 hover:scale-105"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">RS</span>
          </div>
          <h2 className="text-xl font-semibold mt-4 text-gray-800">LogIn</h2>
        </div>

        {/* Dynamically Generated Inputs */}
        {logInformdata.map(({ labelName, name, placeholder, type }, key) => (
          <div key={key} className="mb-4">
            <label htmlFor={name} className="block font-medium text-gray-700">{labelName}</label>
            <input
              className="w-full p-3 bg-white/40 text-gray-800 border border-white/50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              type={type}
              autoComplete="off"
              name={name}
              id={name}
              placeholder={placeholder}
              value={values[name]}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors[name] && touched[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        {/* Log In Button */}
        <button 
          type="submit" 
          className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105"
        >
          Log In
        </button>

        {/* Sign Up Button */}
        <button className="w-full mt-3 p-3 bg-transparent text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105">
          <Link to='/signup' className="w-full block">Sign Up</Link>
        </button>
      </form>
    </div>
  );
}
