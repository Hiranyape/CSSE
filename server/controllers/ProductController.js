const ProductModel = require("../models/ProductModel")
const cloudinary = require('cloudinary')
const ProductFactory = require("../models/ProductFactory");
const productFactory = new ProductFactory();

cloudinary.config({
    cloud_name: "daxiby67v",
    api_key: "239243262657564",
    api_secret: "9mMH_qDU-VCPGyaRGpbHfJjfUx4"
});

const addProduct = async (req, res) => {
  const { name, description, image, imageUrl, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ error: "Please fill out all required fields" });
  }

  let newProduct;

  if (image) {
    newProduct = productFactory.createProductWithImage(
      name,
      description,
      image,
      price
    );
  } else if (imageUrl) {
    newProduct = productFactory.createProductWithImageUrl(
      name,
      description,
      imageUrl,
      price
    );
  } else {
    return res.status(400).json({ error: "Invalid product creation request" });
  }

  try {
    // Attempt to create and save the new product
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create a new product" });
  }
};

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

const deleteProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(204).send(); // Respond with a 204 No Content status
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the product" });
  }
};

// Function to delete all products
const deleteAllProducts = async (req, res) => {
  try {
    await ProductModel.deleteMany({}); // Delete all products from the collection
    res.status(204).send(); // Respond with a 204 No Content status
  } catch (error) {
    res.status(500).json({ error: "Failed to delete all products" });
  }
};

module.exports={
    addProduct,
    getAllProducts,
    getProduct,
    deleteProductById,
    deleteAllProducts,
}