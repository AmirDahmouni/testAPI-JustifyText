
function checkLimit(req,res,next) {
    
    
    //recover rateLimit using token
    var rateLimit = req.rateLimitTokens[req.rateLimitTokens.findIndex(user=>user.token==req.token)];

    //if the token doesn't exist in rateLimitsToken return  
    if (!rateLimit || !rateLimit.date) return res.status(403).send("forbidden")
    

    let Day = rateLimit.date.getDate();
    let currentDay = new Date().getDate();

    //if the user is a new user initialize the words and date 
    if (currentDay !== Day) {
        rateLimit.words = 0;
        rateLimit.date = new Date();
    }
    
    //calculate number words
    var numWords = 0;
    for (let i = 0; i < req.body.length; i++) {
        let currentCharacter = req.body[i];
        //if we find a space then increment number of words
        if (currentCharacter == " ") numWords += 1;
    }
    numWords += 1;

    //if the user try to justify the text with >80000 words based on to two steps 
    if (rateLimit.words+numWords>=80000 || numWords >= 80000)  return res.status(402).json({ message: '402 Payment Required.' });
    
    //re assign the num words to the user token
    rateLimit.words +=numWords;

    //before updating
    //console.log(req.rateLimitTokens) 

    //update rateLimitTokens
   
    req.rateLimitTokens[req.rateLimitTokens.findIndex(user=>user.token==req.token)] = rateLimit;
  
    //after updating 
    //console.log(req.rateLimitTokens) 
    //pass to next function
    next()
}
module.exports=checkLimit;