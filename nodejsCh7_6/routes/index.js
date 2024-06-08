const express = express();
const user = require('../modules/user');

const router = express.router();

router.get('/', async(req, res, next)=>{
    try{
        const users = await User.findAll();
        // caching ...
        // }
        res.render('sequelize', {users});
    }catch(err){
        console.error(err);
        next(arr);
    }
});

module.exports = router();