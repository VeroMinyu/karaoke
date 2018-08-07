const express = require("express");
const router = express.Router();
const Performance = require('../models/Performance');

router.post('/', (req, res, next) => {
    const { comment, performanceId, userId } = req.body;
    Performance.findByIdAndUpdate(performanceId, {$push: {"comments": {comment: comment, date:new Date(), user:userId}}},{new:true})
    .populate('comments.user')
    .then(newPerformance => res.status(200).json(newPerformance))
    .catch(e => res.status(500).json({ message: e.message }));
})

module.exports = router;