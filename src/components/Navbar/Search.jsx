import React, { useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { motion, AnimatePresence } from 'framer-motion';

export default function Search() {
    const [isFocused, setIsFocused] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <motion.div 
            className="relative w-full max-w-xs"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search movies..."
                    className="w-full rounded-xl bg-gray-800 px-4 py-2 pl-12 pr-4 text-white placeholder-gray-400 
                              focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-700 
                              transition-all duration-200 shadow-lg"
                />
                <motion.div
                    className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    animate={{
                        color: isFocused ? '#f97316' : '#9CA3AF',
                        scale: isFocused ? 1.1 : 1
                    }}
                    transition={{ duration: 0.2 }}
                >
                    <IoSearch className="text-xl" />
                </motion.div>

                <AnimatePresence>
                    {searchQuery && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-500"
                        >
                            ✕
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            <AnimatePresence>
                {isFocused && searchQuery && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-2 w-full rounded-xl bg-gray-800 shadow-2xl border border-gray-700 overflow-hidden z-50"
                    >
                        <motion.div 
                            className="p-2 text-gray-300 text-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <motion.div 
                                whileHover={{ backgroundColor: '#1f2937' }}
                                className="p-3 rounded-lg cursor-pointer flex items-center"
                            >
                                <div className="bg-gray-700 w-10 h-10 rounded-md mr-3"></div>
                                <div>
                                    <p className="font-medium text-white">Avengers: Endgame</p>
                                    <p className="text-xs text-gray-400">2019 • Action</p>
                                </div>
                            </motion.div>
                            <motion.div 
                                whileHover={{ backgroundColor: '#1f2937' }}
                                className="p-3 rounded-lg cursor-pointer flex items-center"
                            >
                                <div className="bg-gray-700 w-10 h-10 rounded-md mr-3"></div>
                                <div>
                                    <p className="font-medium text-white">Interstellar</p>
                                    <p className="text-xs text-gray-400">2014 • Sci-Fi</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}