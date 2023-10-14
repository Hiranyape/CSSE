const ProductModel = require("../models/ProductModel")
const cloudinary = require('cloudinary').v2
const mongoose = require("mongoose")

cloudinary.config({
    cloud_name: "daxiby67v",
    api_key: "239243262657564",
    api_secret: "9mMH_qDU-VCPGyaRGpbHfJjfUx4"
});

const addProduct = async(req,res) =>{
    const { name,description } = req.body;
    let image;
  
    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image" });
    }
  
    if (!name || !description ) {
      return res.status(400).json({ error: "Please fill out all fields" });
    }
  
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'products',
    });
    image = result.secure_url;
  
    try {
      const newProduct = await ProductModel.create({ name,description,image });
      res.status(200).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: "Failed to create new Product blog" });
    }

}

const getProduct = async (req, res) => {
    const { id } = req.params
    const product = await ProductModel.findById(id)

    if (!product) {
        return res.status(400).json({ error: ' No such Product' })
    }

    res.status(200).json(disease)
}

const getAllProducts = async(req, res) => {

    const products = await ProductModel.find({}).sort({ createdAt: -1 })
    res.status(200).json(products)
}

module.exports={
    addProduct,
    getAllProducts,
    getProduct
}