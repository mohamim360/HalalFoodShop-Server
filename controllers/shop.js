const Product = require("../models/product");

exports.getShopProducts = (req, res, next) => {
	Product.find()
	.then((products) => {
		console.log(products);
		res.status(200).json({
			products: products,
		});
	})
	.catch((err) => console.log(err));
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
	console.log(prodId);
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Product added to cart successfully" });
    });
};
