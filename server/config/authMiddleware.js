const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token = req.headers.authorization.split(" ")[1];
            const user = jwt.verify(token, "secret key");
            req.body.user = user;
            next();
        } catch (error) {
            console.log(error);
            res.status(500).send({success: false, error: error});
        }
    }else{
        res.send({success: false, message: "Not authorized"});
    }
    if(!token){
        return res.status(401).send({success: false, message: "Not authorized"});
    }else{
        res.send({success: true, message: "Authorized"});
    }
}