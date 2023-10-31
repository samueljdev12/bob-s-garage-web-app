module.exports = function authorize(req, res, next) {
    if(!req.user.isAdmin) {
        return res.status(401).json({msg: "You are not allowed to access this resource"})
    
    }
}
