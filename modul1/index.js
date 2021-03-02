const express = require('express');
const morgan = require('morgan');
const http = require('http');

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