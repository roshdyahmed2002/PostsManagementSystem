const express = require("express")
const router = express.Router()
const {createReaction,getReactions, getReaction, updateReaction, deleteReaction} = require("../controllers/ReactionController")

router.get("/",getReactions)
router.get("/:id",getReaction)
router.post("/",createReaction)
router.put("/:id", updateReaction)
router.delete("/:id",deleteReaction)

module.exports = router;