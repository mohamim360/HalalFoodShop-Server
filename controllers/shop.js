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