const jwt = require('jsonwebtoken');

module.exports = function(role){
    return function(req, res, next) {
        if (req.method === "OPTIONS"){
           next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1] //Bearer asdasdasdgfgbvzxvxcv
            if(!token){
               return res.status(401).json({message: "User did not authorize"});
            }
            const decoded = jwt.verify(token, process.env.SEKRET_KEY);
            if(decoded.role !== role){
                return res.status(403).json({message: "You don't have permission"});
            }
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({message: "User did not authorize"})
        }
    }
}