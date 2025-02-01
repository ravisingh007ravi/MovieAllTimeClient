import React, { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import Search from './Search';


export default function Navbar() {
    const menuData = [
        { name: "Bollywood", href: "/bollywood" },
        { name: "Hollywood", href: "/hollywood" },
        { name: "South", href: "/south" },
        { name: "Anime", href: "/anime" },
    ];

    const [login, setLogIn] = useState(false);
    const [bar, setBar] = useState(false);



    return (
        <header className="fixed w-full top-0 z-50">
            <nav className="flex items-center justify-between bg-[#332d2dae] px-4 py-4 shadow-lg md:px-8 lg:px-16">
                {/* Left section */}
                <div className="flex items-center space-x-6">
                    <h1 className="text-2xl font-bold text-white">Logo</h1>
                    <ul className="hidden space-x-6 md:flex">
                        {menuData.map((item, key) => (
                            <li key={key}>
                                <Link to={item.href}>
                                    <button className='text-white rounded-md text-xl font-semibold px-3 py-2 transition-colors hover:bg-gray-700 hover:text-white'>{item.name}</button>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Center section */}
                <div className="md:hidden"><Search /></div>

                {/* Right section */}
                <div className="flex items-center space-x-4">
                    <div className="hidden md:flex"><Search /></div>

                    {login ? (<DropdownMenu />) :
                        (
                            <Link className='text-orange-600 hover:text-red-400 font-bold' to='/signup'>
                                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
                                    Log/Sign
                                </button>
                            </Link>
                        )}

                    <button onClick={() => setBar(!bar)} className="md:hidden text-white hover:text-gray-300">
                        {bar ? <IoClose className="text-4xl" />
                            : < FaBarsStaggered className="text-3xl" />}
                    </button>
                </div>

                {/* Mobile menu */}
                <div className={`absolute top-18 right-0 w-full bg-gray-800 md:hidden ${bar ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out`}>
                    <ul className="flex flex-col text-center  space-y-4 p-4">
                        {menuData.map((item, key) => (
                            <li key={key}>
                                <Link to={item.href} className="rounded-md text-xl font-semibold px-3 py-2 text-gray-300 transition-colors hover:bg-gray-700 hover:text-white">
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
}
