const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const accountRoute = require('./api/routes/products');

mongoose.connect('mongodb://mostafiz:mostafiz044@ds243344.mlab.com:43344/accounting');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api/products', accountRoute);

app.get('/', (req, res) => {
    res.send(``);
});

app.listen(PORT, () => {
    console.log(`Server listen from ${PORT}.....`);
});
