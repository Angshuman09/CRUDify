import React, { useState } from 'react'
import { useTheme } from '../Context/UseTheme'
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';
function Create() {
  const {theme} = useTheme();

  const [newProduct, setNewProduct] = useState({
    name:"",
    price:0,
    image:""
  });

  const {createProducts} = useProductStore();
  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    const {success, message} = await createProducts(newProduct);
    if(!success) toast.error(message);
    else toast.success(message);
  }
  
  return (
    <div className={`w-full flex flex-col gap-4 sm:gap-6 items-center min-h-screen px-4 py-8 ${
      theme=='light' ? 'bg-amber-200' : 'bg-slate-900'
    }`}>
      <h1 className={`font-bold text-3xl sm:text-4xl lg:text-5xl text-center ${
        theme=='light' ? 'text-slate-700' : 'text-white'
      }`}>
        Create New Product
      </h1>
      
      <form onSubmit={onSubmitHandler} className={`
        flex flex-col justify-center items-center 
        w-full max-w-xs sm:max-w-sm lg:max-w-md
        h-auto
        p-5 sm:p-6
        gap-3 sm:gap-4
        bg-amber-500 
        transition-all duration-300 ease-in-out
        hover:shadow-[6px_6px_0px_0px] hover:shadow-amber-800
        hover:-translate-x-1.5 hover:-translate-y-1.5
        border-2 border-amber-700
        mx-4
        ${theme=='light' ? 'bg-amber-500' : 'bg-amber-600 border-amber-800'}
      `}>
        <input 
          type="text" 
          placeholder='Product Name' 
          value={newProduct.name}
          onChange={(e)=>setNewProduct({...newProduct,name:e.target.value})}
          className={`
            w-full p-3 sm:p-4
            bg-amber-600 dark:bg-amber-700
            border-2 border-b-4 border-amber-950
            focus:outline-none focus:ring-2 focus:ring-amber-300
            transition-all duration-200
            placeholder-amber-200
            text-white font-medium
          `} 
        />
        
        <input 
          type="number" 
          placeholder='Price ($)' 
          value={newProduct.price}
          onChange={(e)=>setNewProduct({...newProduct,price:e.target.value})}
          className={`
            w-full p-3 sm:p-4
            bg-amber-600 dark:bg-amber-700
            border-2 border-b-4 border-amber-950
            focus:outline-none focus:ring-2 focus:ring-amber-300
            transition-all duration-200
            placeholder-amber-200
            text-white font-medium
          `} 
        />
        
        <input 
          type="url" 
          placeholder='Image URL' 
          value={newProduct.image}
          onChange={(e)=>setNewProduct({...newProduct,image:e.target.value})}
          className={`
            w-full p-3 sm:p-4
            bg-amber-600 dark:bg-amber-700
            border-2 border-b-4 border-amber-950
            focus:outline-none focus:ring-2 focus:ring-amber-300
            transition-all duration-200
            placeholder-amber-200
            text-white font-medium
          `}
        />
        
        <button 
          type="submit"
          className={`
            bg-amber-800 hover:bg-amber-900 
            text-white font-bold
            px-6 sm:px-8 py-3 sm:py-4
            transition-all duration-200
            hover:shadow-lg hover:scale-105
            border-2 border-amber-900
            focus:outline-none focus:ring-2 focus:ring-amber-300
            w-full sm:w-auto
          `}
        >
          Create Product
        </button>
      </form>
    </div>
  )
}

export default Create