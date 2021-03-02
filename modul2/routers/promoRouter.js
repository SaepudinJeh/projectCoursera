const { Router } = require('express');

const Promotion = require('../models/promotions');
const router = Router()


router
.get('/promotions',(req, res, next) => {
	Promotion.find({})
	.then((promotions) => {
		res.statusCode = 200;
		res.statusHeader = ('Content-Type', 'application/json');
		res.json(promotions)
	})
	.catch(err => next(err));
})
.get('/promotions/:promotionsId',(req, res, next) => {
	Promotion.findById(req.params.promotionsId)
	.then( leader => {
		res.statusCode = 200;
		res.statusHeader = ('Content-Type', 'application/json');
		res.json(leader)
	})
	.catch(err => next(err));
})
.post('/promotions', (req, res, next) => {
	Promotion.create(req.body)
	.then( leader => {
		res.statusCode = 200;
		res.statusHeader = ('Content-Type', 'application/json');
		res.json(leader)
	})
	.catch(err => next(err));
})
.put('/promotions/:promotionsId', (req, res, next) => {
	Promotion.findByIdAndUpdate(req.params.promotionsId, {
		$set: req.body
	}, { new: true})
	.then( leader => {
		res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
	})
	.catch( err => console.log(err));
})
.delete('/promotions/:promotionsId', (req, res, next) => {
	Promotion.findOneAndRemove(req.params.promotionsId)
	.then( leader => {
		res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
	})
	.catch( err => console.log(err));
})



module.exports = router