const jwt=require('jsonwebtoken');
function Auth(req, res, next) {

    const token = req.headers.authorization;
   
    if (token) {
      //verify if the json web token is valid 
      jwt.verify(token, "JWT_SECRET", (err, decode) => {
        if (err) {
          //invalid format token
          return res.status(403).send('Invalid Token');
        }
        req.token = token;
        // next to api
        next();
      });
      
    } 
    else 
    {
      //token doesn't exist
      return res.status(401).send('Token is not supplied');
    }

}
module.exports=Auth