const Product = require("../models/product.model");

exports.getAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Server error!"
            });
        else
            res.send(data);
    });
};

exports.getById = (req, res) => {
    Product.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    message: `Not found product with id ${req.params.id}`
                });
            else
                res.status(500).send({
                    message: "Server error!"
                });
        } else
            res.send(data);
    })
};