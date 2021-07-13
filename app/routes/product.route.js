module.exports = app => {
    const products = require("../controllers/product.controller")

    app.get("/product", products.getAll)

    app.get("/product/:id", products.getById)

    app.post("/product", products.create)

    app.put("/product/:id", products.update)
}