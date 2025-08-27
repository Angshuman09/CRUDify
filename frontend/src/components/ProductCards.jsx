import React, { useState } from 'react'
import { FaEdit, FaTimes } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useTheme } from '../Context/UseTheme';
import { useProductStore } from '../store/product';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';

function ProductCards({ product }) {
  const { theme } = useTheme();
  const { deleteProduct } = useProductStore();

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });

  const deleteHandler = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast.error(message);
    } else {
      toast.success(message);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your update logic here using zustand
    console.log('Updated data:', formData);
    setEdit(false);
  }

  const closeModal = () => {
    setEdit(false);
    // Reset form data to original values when closing
    setFormData({
      name: product.name,
      price: product.price,
      image: product.image
    });
  }

  return (
    <>
      <div className={`${theme == 'light' ? 'bg-orange-300' : 'bg-slate-600'} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100 w-full h-full flex flex-col`}>
        {/* Image Container */}
        <div className='relative bg-gradient-to-br from-amber-50 to-amber-100 h-40 sm:h-40 flex items-center justify-center'>
          <img 
            className='w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105' 
            src={`${product.image}`} 
            alt='img'
          />
        </div>
        
        {/* Content Container */}
        <div className='p-4 sm:p-6 flex-1 flex flex-col justify-between'>
          {/* Product Info */}
          <div>
            <h1 className={`text-lg sm:text-xl font-bold ${theme == 'light' ? 'text-gray-800' : 'text-amber-100'} mb-2 line-clamp-2 leading-tight`}>
              {product.name}
            </h1>
            
            <p className={`text-2xl sm:text-3xl font-bold ${theme == 'light' ? 'text-amber-600' : 'text-amber-200'} mb-4`}>
              ${product.price}
            </p>
          </div>

          {/* Buttons */}
          <div className='flex justify-between items-center pt-2 border-t border-gray-100'>
            <button 
              onClick={() => setEdit(true)} 
              className='flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
            >
              <FaEdit size={16} className='mr-2' />
              <span className='text-sm font-medium'>Edit</span>
            </button>
            
            <button 
              onClick={() => deleteHandler(product._id)}
              className='flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg'
            >
              <MdDelete size={16} className='mr-2' />
              <span className='text-sm font-medium'>Delete</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal Portal - Renders outside the card component */}
      {edit && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className={`relative w-full max-w-md mx-auto ${theme == 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-xl transform transition-all`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${theme == 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
              <h3 className={`text-lg font-semibold ${theme == 'light' ? 'text-gray-900' : 'text-white'}`}>
                Edit Product
              </h3>
              <button
                onClick={closeModal}
                className={`p-2 rounded-full hover:bg-opacity-20 transition-colors ${theme == 'light' ? 'text-gray-400 hover:bg-gray-400 hover:text-gray-600' : 'text-gray-300 hover:bg-gray-300 hover:text-white'}`}
              >
                <FaTimes size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                {/* Product Name */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme == 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme == 'light' 
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500' 
                        : 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    }`}
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme == 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme == 'light' 
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500' 
                        : 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    }`}
                    placeholder="Enter price"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className={`block text-sm font-medium mb-2 ${theme == 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme == 'light' 
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-blue-500' 
                        : 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
                    }`}
                    placeholder="Enter image URL"
                    required
                  />
                </div>

                {/* Image Preview */}
                {formData.image && (
                  <div className="mt-4">
                    <label className={`block text-sm font-medium mb-2 ${theme == 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                      Preview
                    </label>
                    <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    theme == 'light'
                      ? 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                      : 'text-gray-300 bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

export default ProductCards;