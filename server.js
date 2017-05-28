var express = require('express'),
    app = express(),
    port = process.env.PORT || 9000,
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
 });

//Routes
require('./routes/cart-routes')(app);
require('./routes/order-routes')(app);
require('./routes/user-routes')(app);

app.listen(port);
console.log('The Pizza-api server is running on: ' + port);