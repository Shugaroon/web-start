const express = require('express');

const { verifyToken, deprecated } = require('../middlewares');
const { createToken, tokenTest, getMyPosts, getPostsByHashtag } = require('../controllers/v1');

const router = express.Router();

router.use(deprecated);

// POST /v1/token -> 토큰 발급 라우터
router.post('/token', createToken);

// POST /v1/test -> 사용자가 토큰 테스트하는 라우터
router.get('/test', verifyToken, tokenTest);

// GET /v1/posts/my
router.get('/posts/my', verifyToken, getMyPosts);

// GET /v1/posts/hashtag/:title
router.get('/posts/hashtag/:title', verifyToken, getPostsByHashtag);

module.exports = router;