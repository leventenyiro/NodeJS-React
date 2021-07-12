const express = require('express');
//const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

var corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

//app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: true }));

/*app.get("/", (req, res) => {
    res.json({ message: "Test" });
});*/

require("./app/routes/product.route")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});