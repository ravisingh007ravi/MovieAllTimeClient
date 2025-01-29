import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

  const [value, setValue] = useState();

  const ChangeSignUpData = (e) => {
    e.preventDefault()
    setValue({ ...value, [e.target.name]: e.target.value })
    console.log(value)
  }

  return (
    <div className='flex bg-gray-400 justify-center items-center h-screen'>
      <form action="" className='flex flex-col gap-4 bg-white p-10'>
        <input onChange={ChangeSignUpData} className='placeholder:bg-gray-800 placeholder:text-white' name='name' type="text" placeholder='Enter Your Name' />
        <input onChange={ChangeSignUpData} type="file" />
        <input onChange={ChangeSignUpData} className='placeholder:bg-gray-400 placeholder:text-white' name='email' type="text" placeholder='Enter Your Email' />
        <input onChange={ChangeSignUpData} className='placeholder:bg-gray-400 placeholder:text-white' name='password' type="text" placeholder='Enter Your password' />
        <input onChange={ChangeSignUpData} className='placeholder:bg-gray-400 placeholder:text-white' name='password' type="text" placeholder='Enter Your COnfirm password' />
        <button>SIgnUP</button>
        <button><Link to='/LogIn'>LOgIn</Link></button>
      </form>
    </div>
  )
}
