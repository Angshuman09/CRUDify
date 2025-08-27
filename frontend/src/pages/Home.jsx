import React, { useEffect } from "react";
import { useTheme } from "../Context/UseTheme";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCards from "../components/ProductCards";
function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div
      className={`lg:h-screen ${products.length<2?'h-screen':'sm:h-full'} p-4 ${
        theme == "light"
          ? "bg-amber-200 text-slate-800"
          : "bg-slate-900 text-amber-100"
      }`}
    >
      <h1 className="font-extrabold lg:text-4xl md:text-2xl sm:text-2xl text-center mb-4">
        Current products🛒
      </h1>
      <div class="grid lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
        {products.map((product)=>( <ProductCards key={product._id} product={product}/>))}
      </div>

     {
      products.length === 0 && (
        <div>
         <p className="font-semibold lg:text-2xl text-sm text-center m-3">
        No products found🧺
      </p>
      <p
        className="cursor-pointer underline text-red-500 hover:text-red-600 text-center m-3"
        onClick={() => navigate("/create")}
      >
        create a product
      </p>
      </div>
      )
     }
    </div>
  );
}

export default Home;
