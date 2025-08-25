import { CiCirclePlus } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { useTheme } from "../Context/UseTheme";
import { useNavigate } from "react-router-dom";
function Navbar() {
    const {theme, toggleTheme} = useTheme();
    const navigate = useNavigate();

  return (
    <div className={`w-full h-15 ${theme=='light' ? 'bg-amber-200' : 'bg-slate-900'} flex items-center justify-between px-5`}>
        <div onClick={()=> navigate('/')} className={`cursor-pointer font-mono font-bold ${theme=='light' ? 'text-slate-800' : 'text-white'} cursor-pointer`}>CRUDify</div>
        <div className='flex justify-center items-center gap-6'>
            {theme=='light' ? 
            <div className='cursor-pointer text-xl bg-white rounded-full px-2 py-1 border-black border-2' onClick={toggleTheme}>☀️</div>
            :
           <div className='cursor-pointer text-xl bg-[#121212] rounded-full px-2 py-1 border-white border-2' onClick={toggleTheme}>🌙</div>
            }
            <CiCirclePlus onClick={()=>navigate('/create')} className="cursor-pointer" size={30} color={` ${theme=='light' ? 'black' : 'white'}`}/>
        </div>
    </div>
  )
}

export default Navbar