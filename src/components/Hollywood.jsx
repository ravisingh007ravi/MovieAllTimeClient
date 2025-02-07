import React from 'react'

export default function Hollywood() {
  return (
    <div>
       <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="relative bg-white/20 backdrop-blur-xl p-8 rounded-3xl shadow-2xl w-96 border border-white/30">
        {/* Logo Section */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center">
            <span className="text-2xl font-bold text-orange-500">JC</span>
          </div>
          <h2 className="text-xl font-semibold mt-4 text-gray-800">JC Design</h2>
          <p className="text-gray-600 text-sm">The Work You Will Love</p>
        </div>

        {/* Input Fields */}
        <form className="mt-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your username"
              className="w-full px-4 py-3 bg-white/40 text-gray-800 border border-white/50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-3 bg-white/40 text-gray-800 border border-white/50 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            LOG IN
          </button>
        </form>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-700 text-sm">
          <p>
            Forgot your password?{" "}
            <span className="font-semibold text-gray-900">or sign up</span>
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}
