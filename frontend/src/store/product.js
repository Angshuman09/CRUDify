import {create} from 'zustand';

export const useProductStore = create((set)=>({
    products:[],
    setProducts:(products)=>set({products}),
    createProducts: async (newProducts)=>{
        if(!newProducts.name || !newProducts.price || !newProducts.image){
            return {success:false, message:"Please fill in all fields"};
        }
       try{ const res = await fetch('/api/product',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(newProducts)
        })

        const data = await res.json();

        set((state)=>({products:[...state.products,data.data]}))
        return {success: true, message:"product created successfully"}}
        catch(error){
            return {success:false, message:`error is occurs : ${error}`}
        }
    },
    fetchProducts: async ()=>{
        const res = await fetch('/api/product');
        const data = await res.json();
        set({products:data.data});
    },
    deleteProduct: async (pid)=>{
        const res = await fetch(`/api/product/${pid}`,{
            method:'DELETE',
        });

        const data = await res.json();
        if(!data) return {success:false, message:"product not found"};

        set(state => ({products: state.products.filter((product)=>product._id != pid)}))
        return {success:true, message:"product deleted successful"};
    },

    updateProduct: async (pid, updatedProduct)=>{
        const res = await fetch( `/api/product/${pid}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(updatedProduct)
        })

        const data = await res.json();

        if(!data) return {success:false, message:"data not found"};

        set((state)=>({products: state.products.map((product)=>product._id==pid?data.data:product)}));

        return {success:true, message:"product updated successful"};
    }
}))