const Product = require("../models/product");

// This function is for getting a list of products in the shop
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

// This function is for getting the user's shopping cart
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

// This function is for adding a product to the user's shopping cart
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

// This function is for deleting a product from the user's shopping cart
exports.deleteCartProduct = (req, res, next) => {
  const prodId = req.params.prodId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.status(200).json({ message: "Product deleted from cart successfully" });;
    })
    .catch(err => console.log(err));
};
