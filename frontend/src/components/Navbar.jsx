import React, { useState } from 'react'
import { CiCirclePlus } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
function Navbar() {
    const [background,setBackground] = useState("light");
  return (
    <div className='w-full h-15 bg-amber-200 flex items-center justify-between px-5'>
        <div className='font-mono font-bold text-slate-800'>CRUDify</div>
        <div className='flex justify-center items-center gap-6'>
            {background=='light' ? 
            <div className='cursor-pointer text-xl bg-white rounded-full px-2 py-1 border-black border-1' onClick={()=>{setBackground("dark")}}>☀️</div>
            :
           <div className='cursor-pointer text-xl bg-[#121212] rounded-full px-2 py-1 border-white border-1' onClick={()=>{setBackground("light")}}>🌙</div>
            }
            <CiCirclePlus size={30}/>
        </div>
    </div>
  )
}

export default Navbar