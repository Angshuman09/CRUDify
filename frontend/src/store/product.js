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
    }
}))