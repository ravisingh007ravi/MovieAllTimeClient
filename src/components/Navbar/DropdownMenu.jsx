import React, { useState } from 'react'
import { CgProfile } from "react-icons/cg";

export default function DropdownMenu() {

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="relative">
            <CgProfile
                className="h-6 w-6 cursor-pointer text-white hover:text-gray-300"
                onClick={() => { setShowDropdown((showDropdown) => !showDropdown) }}
            />
            {showDropdown && (
                <div className=" flex-col absolute right-0 top-15 w-48 bg-gray-800 rounded-lg shadow-lg">
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <CgProfile className="mr-2 text-gray-300" />
                        <span className="text-gray-300">Profile</span>
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <CgProfile className="mr-2 text-gray-300" />
                        <span className="text-gray-300">Settings</span>
                    </div>
                    <div className="flex items-center px-4 py-2 hover:bg-gray-700">
                        <CgProfile className="mr-2 text-gray-300" />
                        <span className="text-gray-300">Logout</span>
                    </div>
                </div>
            )}
        </div>
    )
}
