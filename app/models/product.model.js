const conn = require("./db");

const Product = function(product) {
    this.name = product.name;
    this.price = product.price;
    this.availability = product.availability;
};

Product.getAll = result => {
    conn.query("SELECT * FROM product", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        
        result(null, res);
    });
};

Product.getById = (id, result) => {
    var sql = `SELECT * FROM product WHERE id = "${id}"`;
    conn.query(sql, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length) {
            result(null, res[0]);
            return;
        }
        result({ kind: "not_found" }, null);
    });
};

module.exports = Product;