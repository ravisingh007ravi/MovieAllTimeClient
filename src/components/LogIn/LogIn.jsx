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
    initialValues: { name: '', profileImage: '', email: '', password: '', confirmPassword: '' },
    validationSchema: UserSchema,
    onSubmit: (values) => {},
  });

 

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 animate-gradient'>
      <form onSubmit={handleSubmit}
        className='flex flex-col gap-6 mt-[70px] bg-white p-8 rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-105'
      >
        <h1 className='text-3xl font-bold text-center text-gray-800'>LogIn</h1>

        {logInformdata.map((item, key) => (
          <div key={key}>
            <label htmlFor={item.name}>{item.labelName}</label>
            <input className='w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all'
              type={item.type} autoComplete='off' name={item.name} id={item.name} value={values[item.name]}
              placeholder={item.placeholder} onChange={handleChange} onBlur={handleBlur}/>
            {errors[item.name] && touched[item.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[item.name]}</p>
            )}
          </div>
        ))}

        <button type="submit" className='w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all transform hover:scale-105'>
          Log In
        </button>

        <button className='w-full p-3 bg-transparent text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105'>
          <Link to='/signup' className='w-full block'>SignUp</Link>
        </button>
      </form>
    </div>
  );
}