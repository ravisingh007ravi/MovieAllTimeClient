import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { FaBarsStaggered } from "react-icons/fa6";

export default function Navbar() {
    const menuData = [
        { name: "Bollywood", href: "/bollywood" },
        { name: "Hollywood", href: "/hollywood" },
        { name: "South", href: "/south" },
        { name: "Anime", href: "/anime" },
    ]

    const [login, setLogIn] = useState(false)

    return (
        <header className="sticky top-0 z-50">
            <nav className="flex items-center justify-between bg-gray-800 px-4 py-4 shadow-lg md:px-8 lg:px-16">
                {/* Left section */}
                <div className="flex items-center space-x-6">
                    <h1 className="text-2xl font-bold text-white">Logo</h1>
                    <ul className="hidden space-x-6 md:flex">
                        {menuData.map((item, key) => (
                            <li key={key}>
                                <a 
                                    href={item.href}
                                    className="rounded-md px-3 py-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                                >
                                    {item.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right section */}
                <div className="flex items-center space-x-4">
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    {login ? (
                        <CgProfile className="h-6 w-6 text-white hover:text-gray-300" />
                    ) : (
                        <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                            Log/Sign
                        </button>
                    )}

                    <button className="md:hidden text-white hover:text-gray-300">
                        <FaBarsStaggered className="h-6 w-6" />
                    </button>
                </div>
            </nav>
        </header>
    )
}