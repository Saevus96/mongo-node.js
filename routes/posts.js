const express = require('express');

const router = express.Router();
const Post = require('../models/Post')

//Pobieranie postow
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
        //res.send(req.body.title);
    } catch (err) {
        res.json({ message: err });
    }
});


// wysyłanie do bazy posta
router.post('/', async (req, res) => {
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

//Specific post
router.get('/:postId', async (req, res) => {
    try {
        console.log(req.params.postId);
        const post = await Post.findById(req.params.postId);
        res.json(post);
    }
    catch (err) {
        res.json({ message: err });
    }

});

//Delete 
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:postId', async (req, res) => {
    try {
       const updatedPost = await Post.updateOne(
           {_id: req.params.postId},
           {$set: {title : req.body.title}}
       )
       res.json(updatedPost);
    } catch (err) {
        res.json({ message: err });
    }
});
module.exports = router;