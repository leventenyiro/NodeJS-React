const sql = require("./db");

const Product = function(product) {
    this.name = product.name;
    this.price = product.price;
    this.availability = product.availability;
};

Product.getAll = result => {
    sql.query("SELECT * FROM product", (err, res) => {
        if (err) {
            result(null, err);
            return;
        }
        
        result(null, res);
    })
}