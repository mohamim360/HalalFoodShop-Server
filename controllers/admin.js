const Product = require("../models/product");

//adding a new product
exports.postAddProduct = (req, res, next) => {


  const name = req.body.name;
  const imageUrl = req.file.path;
  const price = req.body.price;
  const category = req.body.category;
  const quantity = req.body.quantity;
  const description = req.body.description;
  console.log(imageUrl);
  // Creating a new Product object with the provided data
  const product = new Product({
    name: name,
    imageUrl: imageUrl,
    price: price,
    description: description,
    quantity: quantity,
    category: category,
    userId: req.userId,
  });

  // Saving the new product to the database
  product
    .save()
    .then((result) => {
      console.log("Created Product");

      // Sending a response indicating successful creation
      res.status(201).json({
        alert: "Created Product",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//list of products
exports.getProducts = (req, res, next) => {
  // Finding all products in the database
  Product.find()
    .then((products) => {
      console.log(products);

      // Sending a response with the list of products
      res.status(200).json({
        products: products,
        editing: false,
      });
    })
    .catch((err) => console.log(err));
};

//getting details of a single product by its ID
exports.getEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  console.log(prodId);

  // Finding a product by its ID
  Product.findById(prodId)
    .then((product) => {
      // Sending a response with the product details
      res.status(200).json({
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

// updating the details of a product
exports.putEditProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  console.log(prodId);
  const updatedCategory = req.body.category;
  const updatedQuantity = req.body.quantity;
  const updatedName = req.body.name;
  const updatedPrice = req.body.price;
  const updatedDesc = req.body.description;

  // Finding a product by its ID, updating its details, and saving it
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

      // Sending a response indicating successful update
      res.status(201).json({
        alert: "Updated Product",
      });
    })
    .catch((err) => console.log(err));
};

//deleting a product by its ID
exports.deleteProduct = (req, res, next) => {
  const prodId = req.params.prodId;

  // Finding and removing a product by its ID
  Product.findByIdAndRemove(prodId).then((deletedProduct) => {
    if (!deletedProduct) {
      // If the product wasn't found, send a 404 response
      return res.status(404).json({ message: "Product not found" });
    }

    // Sending a response indicating successful deletion
    res.status(200).json({ message: "Product deleted successfully" });
  });
};
