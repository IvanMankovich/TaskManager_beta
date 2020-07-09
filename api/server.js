const express = require('express'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      routes = require('./routes');
      app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(morgan('common'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cookie');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

/********************************************** ATTENTION! **********************************************/
/***************** 2 seconds timer was added with aim to simulate processing request ********************/
/********************************************** ATTENTION! **********************************************/

/************************************************ check *************************************************/
app.use('/api', routes);

app.listen(4000, () => console.log('Server has been started...'));