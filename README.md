# testAPI-JustifyText

  
 API deployed on the url https://textjustifytest.herokuapp.com  

//singin  
1-POST: https://textjustifytest.herokuapp.com/api/token  
  as request we send a json data { "email":useremail }   
  // only "admin_123@gmail.com","admin_12345@hotmail.fr" can be accepted for testing    
  //if the user try to recoonect with the same email we will not regenerate a new token but we send his old one  
  as result he receive the token in the header (key :X-Auth-Token) and the email in the body   
  
//justifying text    
2-POST :https://textjustifytest.herokuapp.com/api/justify  
  as request we send a text in the body and we pass the token to the header with key called authorization   
  as a result we receive a justified text  
