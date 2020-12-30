const express = require('express');
const router = express.Router();

// Controladores
const postsController = require('../controllers/postsController');

router.get('/', postsController.getPosts);
router.get('/:id', postsController.getPosts);
router.post('/', postsController.postPosts);
router.put('/:id', postsController.putPosts);
router.delete('/:id', postsController.deletePosts);

module.exports = router;
