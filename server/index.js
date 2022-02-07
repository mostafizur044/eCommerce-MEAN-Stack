const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const productRoute = require('./api/routes/products');
const dictionaryRoute = require('./api/routes/dictionary');
const cartRoute = require('./api/routes/carts');
// const url = require('url');
const axios = require('axios');
const {
    MONGO_USER,
    MONGO_PASS,
    MONGO_IP,
    MONGO_PORT,
    MONGO_DB,
    NODE_ENV,
    HAS_SRV
} = require('./config/config');

mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);

let mongoUrl = `mongodb://${MONGO_IP}:${MONGO_PORT}/${MONGO_DB}`; // local mongo

if(NODE_ENV !== 'development' || (MONGO_USER !== '' && MONGO_PASS !== '')) {
    mongoUrl = HAS_SRV == '' ? `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}:${MONGO_PORT}/${MONGO_DB}` 
                : `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_IP}/${MONGO_DB}?retryWrites=true&w=majority`
}

mongoose.connect(mongoUrl)
.then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
});

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api/products', productRoute);
app.use('/api/dictionary', dictionaryRoute);
app.use('/api/cart', cartRoute);

app.use('/test', (req, res, next) => {
    axios.get('https://www.metaweather.com/api/location/search/?query=melbourne')
    .then(function (response) {
      // handle success
      return res.send({
        success: true,
        code: 200,
        data : response.data
    });
    })
    .catch(function (error) {
        res.status(500).send({ message, code: 500, success: false, data: null});
    });

})

app.use('/', express.static(__dirname + '/dist/eCommerce'));

app.use('*', express.static(__dirname + '/dist/eCommerce'));

app.listen(PORT, () => {
    console.log(`Server listen from ${PORT}.....`);
});
