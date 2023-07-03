const express = require('express');
const app = express()
const mongoose = require('mongoose');
const Product = require('./models/productModel');
const port = 3001
app.use(express.json());

//routes

//Fetch all records from database
app.get('/products', async(req,res)=>{
try {
    const products= await Product.find({})
    res.status(200).json(products);
} catch (error) {
    // console.error(error);
    res.status(500).json({message:error.message})
}
})

//Fetch a record from database
app.get('/products/:id', async(req, res)=>{
    try{
        const {id}=req.params;
        const product= await Product.findById(id)
        res.status(200).json(product);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//Create a record to database
app.post('/products', async(req, res) => {
    try {
        const product= await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message})
    }
})

//Update a record from database
app.put('/products/:id',    async(req, res) => {
    try{
        const {id}=req.params;
        const product= await Product.findByIdAndUpdate(id,req.body)
        if (!product) {
            return res.status(404).json({message:`Cannnot find any product with ${id}`});
        }
        const updateProduct= await Product.findById(id)
        res.status(200).json(updateProduct);
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
})

//Delete a record from database
app.delete('/products/:id', async(req,res)=>{
    try{
        const {id} =req.params;
        const product = await Product.findByIdAndDelete(id)
        if (!product) {
            return res.status(404).json({message:`Cannot find any product with ${id}`})
        }
        res.status(200).json({data:product,message:'Product deleted succesfully.'});
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})


mongoose.connect("mongodb+srv://ruyadav11:gGtLY6jfwbg3p1Lx@cluster0.vgwmr3y.mongodb.net/Node-Mongo-Express-API?retryWrites=true&w=majority")
    .then(() => {
        console.log("connection successfull with MongoDb");
        app.listen(port, () => {
            console.log('my node app is running...');
        })
    }).catch((error) => {
        console.error(error);
    })