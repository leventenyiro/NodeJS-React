const Product = require("../models/product.model")

exports.getAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Server error!"
            })
        else
            res.send(data)
    })
}

exports.getById = (req, res) => {
    Product.getById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    message: `Not found product with id ${req.params.id}`
                })
            else
                res.status(500).send({
                    message: "Server error!"
                })
        } else
            res.send(data)
    })
}

exports.create = (req, res) => {
    if (!req.body)
        res.status(404).send({
            message: "You forgot something!"
        })

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        active: req.body.active
    })

    Product.create(product, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Server error!"
            })
        else
            res.send(data)
    })
}

exports.update = (req, res) => {
    console.log(req.body)
    if (!req.body)
    res.status(404).send({
        message: "You forgot something!"
    })

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        active: req.body.active
    })

    Product.update(req.params.id, product, (err, data) => {
            if (err) {
                if (err.kind === "not_found")
                    res.status(404).send({
                        message: "Unsuccessful update!"
                    })
                else
                    res.status(500).send({
                        message: err.message || "Server error!"
                    })
            } else
                res.send(data)
        })
}