const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('nunhome', {title:'CJCHO', fruits:['사과','배','오렌지','바나나','복숭아'], isloggedin:1

});
});

module.exports = router;