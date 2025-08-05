const errorHandler = (err,req,res,next)=>{
    console.log(`here ${err}`)
    res.status(err.status).json(err.message)
}
module.exports = errorHandler;