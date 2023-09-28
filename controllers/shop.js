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

exports.getCart = (req, res, next) => {

  req.user
    .populate('cart.items.productId')
    .then(user => {
			console.log(user.cart.items);
      const products = user.cart.items;
      res.status(200).json({
				products: products,
			});
    })
    .catch(err => console.log(err));
};


exports.postCart = (req, res, next) => {
  const prodId = req.body.prodId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Product added to cart successfully" });
    });
};
