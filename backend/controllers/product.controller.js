import {Product} from '../models/product.model.js';
import mongoose from 'mongoose';
export const getProducts = async (req,res)=>{
    try {
        const products =await Product.find({});
        return res.status(200).json({success:true, data:products});
    } catch (error) {
        return res.status(500).json({success:false, message:error.message});
    }
}


export const createProducts = async (req,res)=>{
    try {
        const product = req.body;
        if(!product.name || !product.price || !product.image){
            return res.status(400).json({success:false, message:"Information about the product is needed"});
        }

        const newProduct = new Product(product);
        await newProduct.save();

        res.status(201).json({success:true, data:newProduct});
        
    } catch (error) {
        return res.status(500).json({success:false,message:error.message});
    }
}


export const deleteProducts = async (req,res)=>{
    try {
        const {id} = req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false, message:"Product not exist"}); 
        }

        const deletedProduct = await Product.findByIdAndDelete(id);
        if(!deletedProduct){
            return res.status(404).json({success:false, message:"product not found"});
        }
        res.status(200).json({success:true, message:"product deleted successfully"});
        
    } catch (error) {
        return res.status(501).json({success:false,message:"server error"});
    }
}

export const updateProducts = async (req,res)=>{
    try {
        const {id} = req.params;
        const product = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(401).json({success:false, message:"Product not found"});
        }

        const updatedProduct = await Product.findByIdAndUpdate(id,product,{new:true});
        if(!updatedProduct){
            return res.status(404).json({success:false,message:"product not found"});
        }
        res.status(201).json({success:true, data:updatedProduct});
    } catch (error) {
        console.log("Server error:", error.message);
        res.status(500).json({success:false, message:"server error"});
    }
}
