const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    .get(async (req, res, next)=>{
        try{
            const users = await User.findAll();
            res.json(users);
        }catch(err){
            console.error(err);
            next(arr);
        }
    })
    .post(async (req, res, next)=>{
        try{
            const user = await User.create({
                name: req.body.name,
                age: req.body.age,
                married: req.body.married
            });
            res.status(201).json(user);
        }catch(err){
            console.error(err);
            next(arr);
        };
    });

router.get('/:id/comments', async (req, res, next)=>{
    try{
        const comments = await Comment.findAll({
            include:{
                model:User,
                where:{id:req.params.id}
            }
            // select * from users where id = 3;
        });
        res.json(comments);
    }catch(err){
            console.error(err);
            next(arr);
        };
});
module.exports = router;