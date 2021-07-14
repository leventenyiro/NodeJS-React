const Product = require("../models/product.model")
const languages = require("../../languages.json")

function message(req, msg) {
    let lang = "en"
    let acceptLanguage = req.headers["accept-language"]

    /*if (acceptLanguage != undefined && acceptLanguage.split(";")[0].split(",")[1] in languages)
        lang = acceptLanguage.split(";")[0].split(",")[1]*/
    if (acceptLanguage != undefined && acceptLanguage.split("-")[0][msg] in languages)
        lang = acceptLanguage.split("-")[0]

    return languages[lang][msg]
}

exports.getAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
            res.status(500).send({
                error: message(req, "serverErr")
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
                    error: message(req, "noProductWithId")
                })
            else
                res.status(500).send({
                    error: message(req, "serverErr")
                })
        } else
            res.send(data)
    })
}

exports.create = (req, res) => {
    if (req.body.name == "" || req.body.name == undefined || req.body.price == undefined || req.body.active == undefined)
        res.status(400).send({
            error: message(req, "sthMissing")
        })
    else if (req.body.price < 0)
        res.status(400).send({
            error: message(req, "priceMustMoreThanZero")
        })
    else {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            active: req.body.active
        })
    
        Product.create(product, (err) => {
            if (err)
                res.status(500).send({
                    error: message(req, "serverErr")
                })
            else
                res.send({
                    success: message(req, "successfulCreate")
                })
        })
    }
}

exports.update = (req, res) => {
    if (req.body.name == "" || req.body.name == undefined || req.body.price == undefined || req.body.active == undefined)
        res.status(400).send({
            error: message(req, "sthMissing")
        })
    else if (req.body.price < 0)
        res.status(400).send({
            error: message(req, "priceMustMoreThanZero")
        })
    else {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            active: req.body.active
        })
    
        Product.update(req.params.id, product, (err) => {
            if (err) {
                if (err.kind === "not_found")
                    res.status(404).send({
                        error: message(req, "unsuccessfulUpdate")
                    })
                else
                    res.status(500).send({
                        error: message(req, "serverErr")
                    })
            } else
                res.send({
                    success: message(req, "successfulUpdate")
                })
        })
    }
}

exports.delete = (req, res) => {
    Product.delete(req.params.id, (err) => {
        if (err) {
            if (err.kind === "not_found")
                res.status(404).send({
                    error: message(req, "unsuccessfulDelete")
                })
            else
                res.status(500).send({
                    success: message(req, "serverErr")
                })
        } else
            res.send({
                success: message(req, "successfulDelete")
            })
    })
}

exports.deleteAll = (req, res) => {
    Product.deleteAll((err) => {
        if (err) {
            res.status(500).send({
                success: message(req, "serverErr")
            })
        } else
            res.send({
                success: message(req, "successfulDelete")
            })
    })
}