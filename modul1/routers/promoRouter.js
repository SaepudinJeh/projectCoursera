const { Router } = require('express');

const router = Router()


router
.get('/promotions',(req, res, next) => {
	res.end(`Will send all the promotions to you`);
})
.get('/promotions/:promotionsId',(req, res, next) => {
	res.end(`Will send all the promotions ${req.params.promotionsId} to you`);
})
.post('/promotions/:promotionsId', (req, res, next) => {
	res.end(`Will add the promotions: ${req.body.name}, with details: ${req.body.descriptions}`)
})
.put('/promotions/:promotionsId', (req, res, next) => {
	console.log(req.params.promotionsId)
	res.end(`Updating the promotions: ${req.params.promotionsId} \nWill update the promotions: ${req.body.name}, with details: ${req.body.descriptions}`)
})
.delete('/promotions/:promotionsId', (req, res, next) => {
	res.end(`Deleting promotions: ${promotionsId}`)
})


module.exports = router