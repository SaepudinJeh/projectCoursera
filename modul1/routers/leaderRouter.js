const { Router } = require('express');

const router = Router()


router
.get('/leaders',(req, res, next) => {
	res.end(`Will send all the leaders to you`);
})
.get('/leaders/:leadersId',(req, res, next) => {
	res.end(`Will send all the leaders ${req.params.leadersId} to you`);
})
.post('/leaders/:leadersId', (req, res, next) => {
	res.end(`Will add the leaders: ${req.body.name}, with details: ${req.body.descriptions}`)
})
.put('/leaders/:leadersId', (req, res, next) => {
	console.log(req.params.leadersId)
	res.end(`Updating the leaders: ${req.params.leadersId} \nWill update the leaders: ${req.body.name}, with details: ${req.body.descriptions}`)
})
.delete('/leaders/:leadersId', (req, res, next) => {
	res.end(`Deleting leaders: ${leadersId}`)
})


module.exports = router