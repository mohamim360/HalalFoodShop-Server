const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  // const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const description = req.body.description;

  const product = new Product({
    name: name,
    price: price,
    description: description,
    quantity: quantity,
    category: category,
    userId: req.userId,
  });
  product
    .save()
    .then((result) => {
      console.log("Created Product");

      res.status(201).json({
        alert: "Created Product",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find()
    .then((products) => {
      console.log(products);
      res.status(200).json({
        products: products,
        editing: false,
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  console.log(prodId);
  Product.findById(prodId)
    .then((product) => {
      res.status(200).json({
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.putEditProduct = (req, res, next) => {

  const prodId = req.params.prodId;
  console.log(prodId);
  const updatedCategory = req.body.category;
  const updatedQuantity = req.body.quantity;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  Product.findById(prodId)
    .then((product) => {
      product.name = updatedName;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.quantity = updatedQuantity;
      product.category = updatedCategory;
      return product.save();
    })
    .then((result) => {
      console.log("UPDATED PRODUCT!");
      res.status(201).json({
        alert: "Updated Product",
      });
    })
    .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.prodId; 
  Product.findByIdAndRemove(prodId)
    .then((deletedProduct) => {
      if (!deletedProduct) {
 
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    })

};