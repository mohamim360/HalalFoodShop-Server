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
  const editMode = req.query.edit;
	console.log(editMode);
  if (editMode) {
    const prodId = req.params.prodId;
		console.log(prodId);
    Product.findById(prodId)
      .then((product) => {
        res.status(200).json({
          product: product,
          editing: editMode,
        });
      })
      .catch((err) => console.log(err));
  }
};
