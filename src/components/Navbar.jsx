import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";

const Navbar = () => {
    const {user}=useAuth();
    const [loading,setLoading]=useState(false)
    const handleLogout = async () => {
        setLoading(true)
        await supabase.auth.signOut();
        toast.success("Loggedout successfully")
        setLoading(false)
      };
  return (
    <div className='w-full bg-blue-600 flex items-center justify-between px-4 py-2 sticky top-0'>
            <div className='text-3xl'>Weather</div>
            <div className='flex items-center justify-center gap-2'>
                {!user?<>
                <Link to="/"><div><button className='bg-blue-500 text-white'>Login</button></div></Link>
                <Link ><div><button className='bg-blue-500 text-white'>Signup</button></div></Link>
                </>:
                <div><button className='bg-blue-500 text-white' disabled={loading} onClick={()=>handleLogout()}>{loading?"Logging out...":"Logout"}</button></div>
                }
            </div>
    </div>
  )
}

export default Navbar