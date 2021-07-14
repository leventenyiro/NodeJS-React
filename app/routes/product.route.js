module.exports = app => {
    const product = require("../controllers/product.controller")

    app.get("/product", product.getAll)

    app.get("/product/:id", product.getById)

    app.post("/product", product.create)

    app.put("/product/:id", product.update)

    app.delete("/product/:id", product.delete)

    app.delete("/product/", product.deleteAll)
}