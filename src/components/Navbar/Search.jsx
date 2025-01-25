import React from 'react'

export default function Search() {
    return (
        <div >
            <input
                type="text"
                placeholder="Search..."
                className="rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    )
}
