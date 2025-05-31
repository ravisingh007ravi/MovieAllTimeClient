import React, { useState } from 'react';
import { FaBarsStaggered } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import Search from './Search';
import { motion } from 'framer-motion';

export default function Navbar() {
    const menuData = [
        { name: "Bollywood", href: "/bollywood", emoji: "🎭" },
        { name: "Hollywood", href: "/hollywood", emoji: "🎬" },
        { name: "South", href: "/south", emoji: "🪇" },
        { name: "Anime", href: "/anime", emoji: "🐉" },
        { name: "TV Shows", href: "/tv-shows", emoji: "📺" },
        { name: "4K Movies", href: "/4k-movies", emoji: "🎥" },
    ];

    const [login, setLogIn] = useState(false);
    const [bar, setBar] = useState(false);

    // Animation variants
    const navVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" }
        }
    };

    const itemVariants = {
        hover: { scale: 1.05, color: "#f97316" },
        tap: { scale: 0.95 }
    };

    return (
        <motion.header
            initial="hidden"
            animate="visible"
            variants={navVariants}
            className="fixed w-full top-0 z-50 bg-[#0f0f0f] shadow-lg backdrop-blur-sm border-b border-gray-800"
        >
            <nav className="flex items-center justify-between px-4 py-4 md:px-8 lg:px-16">
                {/* Left Section */}
                <div className="flex items-center space-x-6">
                    <motion.h1
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="text-2xl font-bold text-white"
                    >
                        <Link to='/'>
                            <motion.button
                                className='text-white cursor-pointer'
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                Movie<span className="text-orange-500">Hub</span>
                            </motion.button>
                        </Link>
                    </motion.h1>

                    <ul className="hidden lg:flex space-x-6">
                        {menuData.map((item, key) => (
                            <motion.li
                                key={key}
                                whileHover="hover"
                                whileTap="tap"
                                variants={itemVariants}
                            >
                                <Link to={item.href}>
                                    <button className="flex items-center gap-2 text-white cursor-pointer rounded-md text-lg font-semibold px-3 py-2 transition-colors hover:text-orange-500">
                                        <span className="text-xl">{item.emoji}</span>
                                        {item.name}
                                    </button>
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Center Section (Search on Mobile) */}
                <div className="lg:hidden">
                    <motion.div whileHover={{ scale: 1.05 }}>
                        <Search />
                    </motion.div>
                </div>

                {/* Right Section */}
                <div className="flex items-center space-x-4">
                    <div className="hidden lg:flex">
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Search />
                        </motion.div>
                    </div>

                    <div className='hidden lg:block'>
                        {login ? (
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <DropdownMenu />
                            </motion.div>
                        ) : (
                            <Link to="/signup">
                                <motion.button
                                    className="rounded-lg bg-orange-600 px-4 py-2 text-white font-bold"
                                    whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login/Signup
                                </motion.button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <motion.button
                        onClick={() => setBar(!bar)}
                        className="md:hidden text-white"
                        aria-label="Toggle menu"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {bar ? <IoClose className="text-4xl" /> : <FaBarsStaggered className="text-3xl" />}
                    </motion.button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <motion.div
                initial={false}
                animate={bar ? "open" : "closed"}
                variants={{
                    open: {
                        opacity: 1,
                        height: "auto",
                        transition: {
                            staggerChildren: 0.1,
                            when: "beforeChildren"
                        }
                    },
                    closed: {
                        opacity: 0,
                        height: 0,
                        transition: {
                            staggerChildren: 0.05,
                            staggerDirection: -1,
                            when: "afterChildren"
                        }
                    }
                }}
                className="md:hidden w-full bg-[#0f0f0f] overflow-hidden border-t border-gray-800"
            >
                <ul className="flex flex-col text-center space-y-4 p-4">
                    {menuData.map((item, key) => (
                        <motion.li
                            key={key}
                            variants={{
                                open: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.3 }
                                },
                                closed: {
                                    opacity: 0,
                                    y: -20,
                                    transition: { duration: 0.2 }
                                }
                            }}
                        >
                            <Link
                                to={item.href}
                                className="flex items-center justify-center gap-2 rounded-md text-lg font-semibold px-3 py-2 text-gray-300 transition-colors hover:bg-gray-800 hover:text-orange-500"
                                onClick={() => setBar(false)}
                            >
                                <span className="text-xl">{item.emoji}</span>
                                {item.name}
                            </Link>
                        </motion.li>
                    ))}

                    <div className='lg:hidden'>
                        {login ? (
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <DropdownMenu />
                            </motion.div>
                        ) : (
                            <Link to="/signup">
                                <motion.button
                                    className="rounded-lg bg-orange-600 px-4 py-2 text-white font-bold"
                                    whileHover={{ scale: 1.05, backgroundColor: "#ea580c" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login/Signup
                                </motion.button>
                            </Link>
                        )}
                    </div>
                </ul>
            </motion.div>
        </motion.header>
    );
}