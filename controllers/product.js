var Product = require('../models/product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from test controller');
};

exports.product_create = function (req, res) {
    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.product_all = function (req, res) {
    Product
        // .find()
        // .exec(function(err, product) {
        //     if (err)
        //         return next(err);
            
        //     res.json({data:product})
        // })
    Product.find(req.params, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
}

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    })
};

exports.product_update = function (req, res) {
    Product.findOneAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product updated');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.param.id, function (err) {
        if (err) return next(err);
        res.send('Delete successfully');
    })
}