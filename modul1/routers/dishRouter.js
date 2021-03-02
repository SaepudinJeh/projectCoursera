const { Router } = require('express');

const router = Router()


router
.get('/dishes',(req, res, next) => {
	res.end(`Will send all the dished to you`);
})
.get('/dishes/:dishesId',(req, res, next) => {
	res.end(`Will send all the dished ${req.params.dishesId} to you`);
})
.post('/dishes/:dishesId', (req, res, next) => {
	res.end(`Will add the dish: ${req.body.name}, with details: ${req.body.descriptions}`)
})
.put('/dishes/:dishesId', (req, res, next) => {
	console.log(req.params.dishesId)
	res.end(`Updating the dish: ${req.params.dishesId} \nWill update the dish: ${req.body.name}, with details: ${req.body.descriptions}`)
})
.delete('/dishes/:dishesId', (req, res, next) => {
	res.end(`Deleting dish: ${dishesId}`)
})


module.exports = router