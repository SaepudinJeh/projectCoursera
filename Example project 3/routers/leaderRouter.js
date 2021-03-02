const { Router } = require('express');

const Leaders = require('../models/leaders');

const router = Router()


router
.get('/leaders',(req, res, next) => {
	Leaders.find({})
	.then((leaders) => {
		res.statusCode = 200;
		res.statusHeader = ('Content-Type', 'application/json');
		res.json(leaders)
	})
	.catch(err => next(err));
})
.get('/leaders/:leadersId',(req, res, next) => {
	Leaders.findById(req.params.leadersId)
	.then( leader => {
		res.statusCode = 200;
		res.statusHeader = ('Content-Type', 'application/json');
		res.json(leader)
	})
	.catch(err => next(err));
})
.post('/leaders', (req, res, next) => {
	Leaders.create(req.body)
	.then( leader => {
		res.statusCode = 200;
		res.statusHeader = ('Content-Type', 'application/json');
		res.json(leader)
	})
	.catch(err => next(err));
})
.put('/leaders/:leadersId', (req, res, next) => {
	Leaders.findByIdAndUpdate(req.params.leadersId, {
		$set: req.body
	}, { new: true})
	.then( leader => {
		res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
	})
	.catch( err => console.log(err));
})
.delete('/leaders/:leadersId', (req, res, next) => {
	Leaders.findOneAndRemove(req.params.leadersId)
	.then( leader => {
		res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(leader)
	})
	.catch( err => console.log(err));
})


module.exports = router