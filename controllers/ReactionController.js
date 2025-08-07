const Reaction = require("../models/Reaction")

const getReactions = async (req,res,next)=>{
    const limit = parseInt(req.query.limit)
    const reactions = await Reaction.findAll();
    if(!isNaN(limit) && limit>0){
        return res.status(200).json(reactions.slice(0,limit))
    }
    else{
        return res.status(200).json(reactions)
    }
}

const getReaction = async (req,res,next)=>{
    try{
    const id = parseInt(req.params.id)
    console.log("id2: ",id)
    const reaction = await Reaction.findByPk(id)
    console.log("h2",reaction)
    if(reaction){
        console.log("h1 ",reaction.toJSON())
        return res.status(200).json(reaction.toJSON())
    }
    else{
        const err = new Error(`Reaction with id: ${id} is not found`)
        err.status=404
        return next(err)
    }
    }
    catch(error){
        console.error("ERROR: ",error);
        return res.status(500).json("Internal Server Error");
    }

}


const createReaction = async (req,res,next)=>{
    const reaction = req.body;
    console.log("Reaction: ", reaction)
    if(reaction && reaction.name){
        const reactionDb = await Reaction.create({name: reaction.name})
        console.log("Reaction Created: ",reactionDb.toJSON())
        return res.status(201).json(reactionDb.toJSON())
    }
    else{
        const err = new Error("Please enter the reaction details")
        err.state=400
        return next(err)
    }
}

const updateReaction = async (req,res,next)=>{
    try{
        const id = parseInt(req.params.id);
        console.log("id: ",id)
        const updateReaction = req.body

        if(updateReaction ){
            if(!isNaN(id)){
                const reactionUpdateNum = await Reaction.update({name:updateReaction.name},{where: {id:id} })
                console.log("R ",reactionUpdateNum[0])

                if(reactionUpdateNum[0]>0){
                    return res.status(200).json(await Reaction.findAll())
                }
                else{
                    const err = new Error(`The Reaction with id: ${id} is not found`)
                    err.status=404
                    return next(err)
                }
            }
            else{
                const err = new Error(`Enter a valid id`)
                err.status=400
                return next(err)
            }
        }
        else{
            const err = new Error("Please enter the details of the updated reaction")
            err.status= 400
            return next(err)
        }

    }
    catch(error){
        console.error("ERROR: ",error);
        return res.status(500).json("Internal Server Error");
    }

}

const deleteReaction = async (req,res,next)=>{
    const id = parseInt(req.params.id)
    if(!isNaN(id)){
        const reactionDeletedNum = await Reaction.destroy({where:{id:id}})
        console.log("r1: ", reactionDeletedNum)
        if(reactionDeletedNum>0){
            return res.status(200).json(await Reaction.findAll())
        }
        else{
            const err = new Error(`The Reaction with id: ${id} is not found`)
            err.status=404
            return next(err)
        }
    }
    else{
        const err = new Error(`Enter a valid id`)
        err.status=400
        return next(err)
    }
}

module.exports = {createReaction, getReactions, getReaction, updateReaction,deleteReaction};