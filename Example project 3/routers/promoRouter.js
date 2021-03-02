const { Router } = require('express');

const Promotion = require('../models/promotions');
const authenticate = require('../authenticate');
const router = Router()

// Promotion Route
router
	// Get All Promotion
	.get('/promotions', authenticate.verifyOrdinaryUser, authenticate.verifyAdmin, (req, res, next) => {
		console.log(req.decoded._id);
		Promotion.find({})
			.populate('comments.author')
			.then((promotion) => {
				res.statusCode = 200;
				res.statusHeader = ('Content-Type', 'application/json');
				res.json(promotion)
			})
			.catch(err => next(err))
	})
	// Get By Id Promotion
	.get('/:promotionsId', (req, res, next) => {
		Promotion.findById(req.params.promotionsId)
			.populate('comments.author')
			.then(promotion => {
				res.statusCode = 200;
				res.statusHeader = ('Content-Type', 'application/json');
				res.json(promotion)
			})
			.catch(err => next(err));
	})
	// POST Promotion
	.post('/promotion', authenticate.verifyUser, (req, res, next) => {
		Promotion.create(req.body)
			.then(promotion => {
				res.statusCode = 200;
				res.statusHeader = ('Content-Type', 'application/json');
				res.json(promotion)
			})
			.catch(err => next(err));
	})
	// Update Promotion
	.put('/promotion/:promotionsId', authenticate.verifyUser, (req, res, next) => {
		Promotion.findByIdAndUpdate(req.params.promotionsId, {
			$set: req.body
		}, { new: true })
			.then(promotion => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotion)
			})
			.catch(err => console.log(err));
	})
	// Delete by Id Promotion
	.delete('/promotion/:promotionsId', authenticate.verifyUser, (req, res, next) => {
		Promotion.findOneAndRemove(req.params.promotionsId)
			.then(promotion => {
				res.statusCode = 200;
				res.setHeader('Content-Type', 'application/json');
				res.json(promotion)
			})
			.catch(err => console.log(err));
	})

	// Comment Route
router.route('/:promotionId/comments')
	// Get All Comment by Id Promotion
	.get((req, res, next) => {
		Promotion.findById(req.params.promotionId)
			.populate('comments')
			.then((promotions) => {
				res.statusCode = 200;
				res.statusHeader = ('Content-Type', 'application/json');
				res.json(promotions)
			})
			.catch(err => next(err));
	})
	// Post Comment
	.post(authenticate.verifyUser, (req, res, next) => {
		Promotion.findById(req.params.promotionId)
		.then(comment => {
			if (comment !== null) {
				req.body.author = req.user._id;
				comment.comments.push(req.body)
				comment.save()
				.then(comment => {
					Promotion.findById(comment._id)
					.populate('comment.author')
					.then(comment => {
						res.statusCode = 200;
						res.setHeader('Content-Type', 'application/json')
						res.json(comment)
					})
				}, (err) => next(err))
			} else {
				err = new Error (`Comment ${req.params.promotionId} Not Found`)
				err.status = 404;
				return next(err)
			}
		}, (err) => next(err))
		.catch(err => next(err))
	})

// Get comment by 
router
.get('/:promotionId/comments/:commentId', (req,res,next) => {
    Promotion.findById(req.params.promotionId)
    .populate('comments.author')    
    .then((dish) => {
        if (dish != null && dish.comments.id(req.params.commentId) != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(dish.comments.id(req.params.commentId));
        }
        else if (dish == null) {
            err = new Error('Dish ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
        else {
            err = new Error('Comment ' + req.params.commentId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})



module.exports = router