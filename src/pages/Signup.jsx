import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { toast } from "react-toastify";

const Signup = () => {
    const router=useNavigate()
      const {user}=useAuth();
      useEffect(()=>{
        if(user){
            router('/dashboard')
        }
      },[user])
    const [data,setData]=useState({
        email:"",
        password:"",
    })
    const [loading,setLoading]=useState(false)
    const handleChange=(e)=>{
        setData({
            ...data,
            [e.target.name]:e.target.value
        })
    }
    const handlesubmit=async(e)=>{
        e.preventDefault();
        try {
            setLoading(true)
            const {user,error}=await supabase.auth.signUp({
                email:data.email,
                password:data.password
            })
            toast.success("Signedup successfully")
        } catch (error) {
            console.log(error);
            toast.error("error doing signup")
        }
        finally{
            setLoading(false)
        }
    }
  return (
    <div className='h-full w-full  flex items-center justify-center overflow-hidden'>
        
        <div className='px-10 py-10 rounded-xl border-1 bg-white border-gray-200 flex items-center justify-center flex-col gap-5'>
        <h1 className='text-black mb-5'>SignUp</h1>
        <input className='w-[350px] border-1 border-gray-500 rounded-lg p-2 text-black' type="email" name='email' placeholder='email' onChange={(e)=>handleChange(e)}/>
        <input className='w-[350px] border-1 border-gray-500 rounded-lg p-2 text-black' type="password" name='password' placeholder='password' onChange={(e)=>handleChange(e)}/>
        <button className='w-full' disabled={loading} onClick={(e)=>handlesubmit(e)}>{loading?"Signing...":"Signup"}</button>
        <div className='text-black'>Already have an account? please <Link to="/">Login</Link></div>
        </div>
    </div>
  )
}

export default Signup