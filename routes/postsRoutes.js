const express = require("express")
const { getPosts, getPost, updatePost, deletePost, createPost, addReactionToPost, removeReactionFromPost } = require("../controllers/postController")
const router = express.Router()

router.get("/",getPosts)

router.get("/:id",getPost)

router.post("/", createPost)

/* app.put("/api/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const postUpdate = req.body
    const post = posts.find((post)=>post.id===id)
    if(post){
        if(postUpdate){
            posts.filter((post,index)=>{
                if(post.id===id){
                    return posts.splice(index,1)
                }
            })
            post.title=postUpdate.title
            posts.push(post)
            const resp = {
                message : "post updated successfully",
                posts : posts
            }
            res.status(200).json(resp)
        }
        else{
            res.status(400).json(`Please enter the updated post details`)
        }
    }
    else{
        res.status(404).json(`post with id: ${id} is not found`)
    }
}) */

/*     app.put("/api/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const postUpdate = req.body
    const post = posts.find((post)=>post.id===id)
    if(post){
        if(postUpdate){
            const postIndex = posts.findIndex((posts)=>post.id===id);
            posts.splice(postIndex,1)
            post.title=postUpdate.title
            posts.push(post)
            const resp = {
                message : "post updated successfully",
                posts : posts
            }
            res.status(200).json(resp)
        }
        else{
            res.status(400).json(`Please enter the updated post details`)
        }
    }
    else{
        res.status(404).json(`post with id: ${id} is not found`)
    }
}) */

    /* app.delete("/api/posts/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const postIndex = posts.findIndex((post)=>post.id===id)
    console.log(postIndex)
    if(postIndex>=0){
        posts.splice(postIndex,1)
        const resp = {
            message : "post deleted successfully",
            posts:posts
        }
        res.status(200).json(resp)
    }
    else{
        res.status(404).json(`post with id: ${id} is not found`)
    }
}) */

router.put("/:id", updatePost)

router.delete("/:id",deletePost)

router.post("/:postId/reaction/:reactionId",addReactionToPost)

router.delete("/:postId/reaction/:reactionId", removeReactionFromPost)


module.exports = router