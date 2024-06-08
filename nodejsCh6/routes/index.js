const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{
    res.send("Hello, I'm index router.");
});

module.exports = router; 