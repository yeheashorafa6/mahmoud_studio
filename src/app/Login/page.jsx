"use client"
import { authenticate } from '@/lib/action';
import React, { useState } from 'react'
import { useFormState } from "react-dom";

function LoginPage() {
  const [state, formAction] = useFormState(authenticate, undefined);
  return (
    <div className='bg-[#182237] relative h-screen w-full text-white'>
        <div className='flex justify-center items-center h-full w-full'>
          <div className='bg-[#151c2c] p-5 flex flex-col items-center w-96 h-96 rounded-3xl'>
            <h1 className='text-xl font-bold mb-5'>Login</h1>
            <form action={formAction}  className='flex flex-col gap-y-4'>
              <label htmlFor="username">username</label>
              <input
                 type="text" id='username' name='username' placeholder='username' className='p-3 text-white bg-[#182237] rounded-full border border-white/50 w-full' />

              <label htmlFor="password">password</label>
              <input 
                 type="password" id='password' name='password' placeholder='password' className='p-3 text-white bg-[#182237] rounded-full border border-white/50 w-full' />
              <button  className='p-3 bg-teal-500 rounded-full hover:bg-teal-500/50 transition-all duration-300'>Login</button>
              <span className='text-red-500 p-2 text-center'>{state && state}</span>
            </form>
          </div>
        </div>
    </div>
      
  )
}

export default LoginPage
