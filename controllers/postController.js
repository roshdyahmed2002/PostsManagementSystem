const db = require("../utils/database")
const Post = require("../models/Post")
const Reaction = require("../models/Reaction")
const PostReaction = require("../models/PostReaction")

const getPosts = async (req,res,next)=>{
    try{
        const limit = parseInt(req.query.limit)
        //const [postsdb] = await db.execute("select * from posts")
        const postsdb = await Post.findAll()
        console.log("here",postsdb)
        if(isNaN(limit) || limit<=0){
            res.status(200).json(postsdb)
        }
        else{
            res.status(200).json(postsdb.slice(0,limit))
        }
    }
    catch(err){
        console.log("ERRORRRRRRRRR")
        //console.log(err)
        const error = new Error(err.sqlMessage)
        error.status=500
        next(error)
    }
}

const getPost = async (req,res,next)=>{
    const id = parseInt(req.params.id)
/*     const [postDb] = await db.execute("Select * from posts where id = ?",[id])
    console.log(postDb[0]) */
    const postDb = await Post.findByPk(id)
    if(postDb){
        const postDbJson = postDb.toJSON();
        res.status(200).json(postDbJson)
    }
    else{
        const err = new Error(`Post with id: ${id} Not Found`)
        err.status=404
        next(err)
        //res.status(404).json(`Post with id: ${id} Not Found`)
    }
}

const createPost = async (req,res,next)=>{
    const post = req.body
    if(post && post.title){
        
/*         const postDb = await db.execute("INSERT INTO posts (title) VALUES (?)",[post.title])
        console.log(postDb) */

        const postDb = await Post.create({title:post.title})
        console.log("heree",postDb.toJSON())



        //const [postsDb] = await db.execute("SELECT * FROM posts")
        const postsDb = await Post.findAll();

        const resp = {
            message:"Post created",
            posts: postsDb
        }
        res.status(201).json(resp)
    }
    else{
        const err = new Error(`Please enter the post details`)
        err.status=400
        next(err)
       // res.status(400).json("Please enter the post details")
    }
}

const updatePost = async (req,res,next)=>{
    const id = parseInt(req.params.id)
    const postUpdate = req.body
    if(postUpdate){
    //    const [postDb] = await db.execute("Select * from posts where id = ?",[id])
        const postDb = await Post.update({title:postUpdate.title},{where:{id:id}})
        console.log("aywa ",postDb)

        if(postDb[0]>0){
                //postDb[0].title=postUpdate.title
    /*             const [postDbUpdate] = await db.execute("UPDATE posts SET title = ? WHERE id = ?",[postUpdate.title, id])
                console.log(postDbUpdate) */

                const postsDb = await Post.findAll()
                const resp = {
                    message : "post updated successfully",
                    posts : postsDb
                }
                res.status(200).json(resp)
        }
        else{
            console.log("here")
            const err = new Error(`post with id: ${id} is not found`)
            err.status=404
            console.log("here")
            next(err)
            //res.status(404).json(`post with id: ${id} is not found`)
        }
    }
    else{
        const err = new Error(`Please enter the updated post details`)
        err.status=400
        next(err)
        //res.status(400).json(`Please enter the updated post details`)
    }
}

const deletePost = async (req,res,next)=>{
    const id = parseInt(req.params.id)
    //const [postDb] = await db.execute("SELECT * FROM posts WHERE id = ?",[id])

    const postDb = await Post.destroy({where:{id:id}})
    console.log("h5 ",postDb)

    if(postDb>0){
        //const postDbDeleted = await db.execute("DELETE FROM posts WHERE id = ?",[id])
//        const [postsDb] = await db.execute("SELECT * FROM posts")
        const postsDb = await Post.findAll();

        const resp = {
            message : "post deleted successfully",
            posts: postsDb
        }
        res.status(200).json(resp)
    }
    else{
        const err = new Error(`post with id: ${id} is not found`)
        err.status=404
        next(err)
        //res.status(404).json(`post with id: ${id} is not found`)
    }
}

const addReactionToPost = async (req,res,next)=>{
    try{
        const postId = parseInt(req.params.postId);
        const reactionId = parseInt(req.params.reactionId)

        const post = await Post.findByPk(postId)
        const reaction = await Reaction.findByPk(reactionId)
        const postReaction = await PostReaction.findOne({where:{postId:postId, reactionId:reactionId}})
        let quantity;
        if(postReaction){
            quantity = postReaction.quantity
            console.log("herea")
        }
        else{
            console.log("hereb")
            quantity = 0
        }
        console.log("postReaction ",postReaction)
        if(post && reaction){
            await post.addReaction(reaction, {through: {quantity: ++quantity}})
            res.status(200).json(await PostReaction.findAll())
        }
        else{
            const err = new Error(`post with id: ${postId} or reaction with id: ${reactionId} is not found`)
            err.status=404
            next(err)
        }

    }
    catch(err){
        console.error("ERROR HNA ", err)
        res.status(500).json("Internal Server Error")
    }
}

const removeReactionFromPost = async (req,res,next)=>{
    const postId = req.params.postId
    const reactionId = req.params.reactionId

    const post = await Post.findByPk(postId)
    console.log("post: ",post.toJSON())
    const reaction = await Reaction.findByPk(reactionId)
    console.log("reaction: ",reaction)


    if(post && reaction){
        const postReaction = await PostReaction.findOne({where : {postId:postId, reactionId: reactionId}})
        if(postReaction){
            if(postReaction.quantity>1){
                const updatedNumRows = await PostReaction.update({quantity:--postReaction.quantity}, {where : {id:postReaction.id}})
                console.log("update ",updatedNumRows)
                const  x = await post.getReactions();
                console.log("x: ",x[0].dataValues.postreactions)
                res.status(200).json(await post.getReactions())
            }
            else{
                const removedNum = await post.removeReaction(reaction)
                console.log("remove ",removedNum)
                res.status(200).json(await post.getReactions())
            }
        }
        else{
            const err = new Error(`No relationship existing between this post and reaction`)
            err.status=404
            next(err)
        }
    }
    else{
        const err = new Error(`Either post id: ${postId} or reaction id: ${reactionId} are not found`)
        err.status=404
        next(err)
    }
}
module.exports = {getPosts,getPost,createPost,updatePost,deletePost,addReactionToPost, removeReactionFromPost}