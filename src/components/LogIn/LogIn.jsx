import React from 'react';
import { Link } from 'react-router-dom';

export default function LogIn() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-200 via-sky-400 to-indigo-600">
      <div className="flex bg-white p-8 rounded-lg shadow-lg drop-shadow-2xl">
        {/* Left div */}
        <div className="flex flex-col justify-center p-5 w-1/2">
          <h1 className="text-3xl font-bold mb-4">Welcome</h1>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="font-semibold">Username</label>
            <input id="username" type="text" className="border p-2 rounded-md" />
          </div>

          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="password" className="font-semibold">Password</label>
            <input id="password" type="password" className="border p-2 rounded-md" />
          </div>

          <button className='bg-blue-500 text-white p-2 rounded-md mt-4'>LogIn</button>

          <h1 className='text-center mt-4 font-bold'>OR</h1>

          <button className='bg-blue-500 text-white p-2 rounded-md mt-4'><Link to='/signup'>SignUp</Link></button>
        </div>

        {/* Right div */}
        <div className="ml-8 hidden md:flex">
          <img
            className="h-[500px] w-[400px] rounded-lg"
            src="https://i.gifer.com/5XQl.gif"
            alt="Login Illustration"
          />

        </div>
      </div>
    </div>
  );
}
