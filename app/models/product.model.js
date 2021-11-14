const conn = require("./db")

const Product = function(product) {
    this.name = product.name
    this.price = product.price
    this.active = product.active
}

Product.getAll = result => {
    conn.query("SELECT * FROM product", (err, res) => {
        if (err) {
            return result(err, null)
        }
        
        result(null, res)
    })
}

Product.getById = (id, result) => {
    var sql = `SELECT * FROM product WHERE id = "${id}"`
    conn.query(sql, (err, res) => {
        if (err)
            return result(err, null)
        if (res.length)
            return result(null, res[0])
        result({ kind: "not_found" }, null)
    })
}

Product.create = (product, result) => {
    conn.query("INSERT INTO product SET ?", product, (err, res) => {
        if (err)
            return result(err, null)
        result(null)
    })
}

Product.update = (id, product, result) => {
    conn.query("UPDATE product SET name = ?, price = ?, active = ? WHERE id = ?", [product.name, product.price, product.active, id], (err, res) => {
        if (err)
            return result(null, err) 
        if (res.affectedRows == 0)
            return result({ kind: "not_found" }, null)
        result(null)
    })
}

Product.delete = (id, result) => {
    conn.query("DELETE FROM product WHERE id = ?", id, (err, res) => {
        if (err)
            return result(err, null)
        if (res.affectedRows == 0)
            return result({ kind: "not_found" }, null)
        result(null)
    })
}

Product.deleteAll = result => {
    conn.query("DELETE FROM product", (err, res) => {
        if (err)
            return result(err, null)
        result(null)
    })
}

module.exports = Product