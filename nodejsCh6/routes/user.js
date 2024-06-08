const express = require('express');

const router = express.Router();

router.get('/', (req, res)=>{ //http://127.0.0.1:3000/user
    res.send("Hello, I'm user router.");
});

router.get('/user/:id',                // http://127.0.0.1:3000/user/user/n(정수)
(req, res)=>{            
    res.send(`<p>user ${req.params.id} page</p>`);
});

router.get('/abc', (req, res)=>{
    res.send('get /abc')
});
router.post('/abc', (req, res)=>{
    res.send('post /abc')
});

router.route('/abc2')
    .get((req, res)=>{
        res.send("get /abc2");
    })
    .post((req, res)=>{
        res.send("post /abc2");
    });
    

module.exports = router; 