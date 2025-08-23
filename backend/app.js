import express from 'express';
import dotenv from 'dotenv';
import {db} from './configs/db.config.js'
import productRoutes from './routes/product.route.js'
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/product',productRoutes);

app.listen(port,()=>{
    db();
    console.log(`port is listening at ${port}`);
})