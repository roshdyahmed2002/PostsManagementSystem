pageNotFoundHandler = (req,res,next)=>{
    const err = new Error("Page Not Found")
    err.status=404
    next(err)
}
module.exports = pageNotFoundHandler