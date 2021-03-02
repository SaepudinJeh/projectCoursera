const express = require('express');
const morgan = require('morgan');
const http = require('http');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

connect.then((db) => {
	console.log('Connected to server');
}).catch(err => console.log(err))


// Routes
const {dishRouter, leaderRouter, promoRouter} = require('./routers');


const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(dishRouter, promoRouter, leaderRouter)

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});