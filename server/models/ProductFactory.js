const ProductModel = require("../models/ProductModel");

class ProductFactory {
  createProductWithImage(name, description, image, price) {
    // Create a new product with an image
    return new ProductModel({
      name,
      description,
      image,
      price,
    });
  }

  createProductWithImageUrl(name, description, imageUrl, price) {
    // Create a new product with an image URL
    return new ProductModel({
      name,
      description,
      imageUrl,
      price,
    });
  }
}

module.exports = ProductFactory;