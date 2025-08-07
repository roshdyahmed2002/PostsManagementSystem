const express = require("express")
const app = express()
const postsRoutes = require("./routes/postsRoutes")
const logger = require("./middleware/logger")
const errorHandler = require("./middleware/errorHandler")
const pageNotFoundHandler = require("./middleware/pageNotFoundHandler")
const sequelize = require("./utils/database")
const Post = require("./models/Post")
const Reaction = require("./models/Reaction")
const PostReaction = require("./models/PostReaction")
const User = require("./models/User")
const reactionsRoutes = require("./routes/reactionsRoutes")
const usersRoutes = require("./routes/usersRoutes")

const port = process.env.PORT || 8080
app.use(express.json())

app.use(logger)

app.get("/",(req,res)=>{
    res.status(200).json(`SERVER IS UP ON ${port}`)
})

app.use("/api/posts",postsRoutes)
app.use("/api/reactions",reactionsRoutes)
app.use("/api/users", usersRoutes)

app.use(pageNotFoundHandler)

app.use(errorHandler)

Post.belongsToMany(Reaction, {through : PostReaction})
Reaction.belongsToMany(Post,{through:PostReaction})

User.hasMany(Post)
Post.belongsTo(User)


sequelize.sync(/* {force : true }*/)
.then(() => console.log("Database synced ✅"))
//.then(result=>console.log(result))
.catch(err=>console.log(err))

app.listen(port, ()=>console.log(`SERVER IS RUNNING ON PORT: ${port}`))