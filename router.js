const express = require('express')
const jwt=require("jsonwebtoken")
const router = express.Router();
const Auth=require("./middlewares/auth")
const checkLimit=require("./middlewares/checkLimit")
const space=require("./utils/space")
const rateLimitTokens=[];
const emails=["admin_123@gmail.com","admin_12345@hotmail.fr"]

router.post("/justify",(req,res,next)=>{req.rateLimitTokens=rateLimitTokens; next()},Auth,checkLimit,(req,res)=>{

        var text=req.body
        //if req.body is empty
        if (!text) return res.status(200).send('');    
        var longeur = 80;
        var newtext = "";
        text = text.replace(/\s\s+/g, ' ');
        for (let i = 0; i < text.length; i++) {
            //revover text caracter by caractere
            newtext += text[i];
            //if we are in the caractere number 80
            if (i == longeur ) {
                if (text[i] == ' ' || text[i] == ',' || text[i] == '.'|| text[i] == ':' || text[i] == ';') {
                    // new line
                    newtext += '\n';
                    //increment longeur with new line (80)
                    longeur = i+80;
                }
                else {
                    let j = 0;
                    while (text[i] !== ' ' && text[i] !== ',' && text[i] !== '.' && text[i] == ':' && text[i] == ';') {
                        i = i - 1;
                        j++;
                    }
                    newtext = newtext.substr(0, newtext.length - j)+'\n';
                    //increment longeur with new line (80)
                    longeur = i + 80;
                }
            }
        }
        //newtext=space(newtext)
        return res.status(200).type("text/plain").send(space(newtext));
    
})


router.post("/token",(req,res)=>{
    if(emails.indexOf(req.body.email)==-1) return res.status(404).send({message:"email user not found"})
    //generate a token
    const token=jwt.sign({email:req.body.email},process.env.JWT);
    //add the token 
    rateLimitTokens[token]={ words: 0, date: new Date() };
    //return the token to the header and the email to the body
    return res.status(200).header("x-auth-token", token).send({email:req.body.email});
})

module.exports=router;