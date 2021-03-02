const express = require('express');
const morgan = require('morgan');
const http = require('http');
const mongoose = require('mongoose');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');

const authenticate = require('./authenticate');

const app = express();

const { dishRouter, leaderRouter, promoRouter, userRouter } = require('./routers');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

connect.then(() => {
	console.log('Connected to server');
}).catch(err => console.log(err))


app.use(morgan('dev'));
app.use(express.json());


app.use(session({
	name: 'kosku.com',
	secret: 'adafawvunu8nv345952(*(^(^*&nn',
	saveUninitialized: false,
	resave: false,
	store: new FileStore(),
	cookie: {
		httpOnly: true
	}
}));

app.use(passport.initialize());

// ROuter user
app.use(userRouter);


// Routes
app.use(dishRouter, promoRouter, leaderRouter)

const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
});