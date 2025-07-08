const Product = require('../models/product.model');

exports.addProduct = async (req, res) => {
  try {
    const { productName, price } = req.body;
    if (!productName || price == null) {
      return res.status(400).json({ message: 'Product name and price are required' });
    }
    const product = new Product({ productName, price });
    await product.save();
    res.status(201).json({ message: 'Product added successfully', data: product });
  } catch (error) {
    res.status(400).json({ message: 'Error adding product', error: error.message });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: 'Products fetched successfully', data: products });
  } catch (error) {
    res.status(400).json({ message: 'Error fetching products', error: error.message });
  }
}; 