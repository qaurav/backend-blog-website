const router = require("express").Router();
const Post = require("../models/Post");

//for creating new post

router.post("/", async (req, res) =>{
   const newPost = new Post(req.body);
   try{
       const savedPost = await newPost.save();
       res.status(200).json(savedPost);
   }catch (err) {
       res.status(500).json(err);
   }
});
//update post
router.put("/:id", async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body, 
                    },
                    { new : true }
                );
                res.status(200).json(updatedPost);
            } catch (err){
                res.status(500).json(err);
            } 
        }else{
            res.status(401).json("you can only update your posts. ");
        }
    }catch (err) {
        res.status(500).json(err);
    }
});


//delete


router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post.username === req.body.username){
            try{
                await post.delete();
                res.status(200).json("post has been deleted");
            } catch (err){
                res.status(500).json(err);
            } 
        }else{
            res.status(401).json("you can only delete your posts. ");
        }
    }catch (err) {
        res.status(500).json(err);
    }
});


//get post  

//for vewing   single post  in front-end
router.get("/:id", async (req,res) => {
    try{
        const post = await Post.findById(req.params.id);
        res.sendStatus(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
});


//get all posts


//for vewing collection of post in homepage

router.get("/", async (req,res) => {
    const username = req.query.user;
    const categoryname = req.query.category;
    try{
        let posts ;
        
        // selecting the group of posts by authername

        if(username){
            posts = await Post.find({username})
        }else if(categoryname){                    //selecting the group of posts by category of post
            posts = await Post.find({categories:{
                $in:[categoryname]
            }})
        }else {
            posts = await Post.find();
        }
        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;