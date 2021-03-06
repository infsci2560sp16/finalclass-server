var mongoose = require('mongoose');  

var Schema = mongoose.Schema;  

var userSchema = mongoose.Schema({    
     token : String,     
     email: String,  
     hashed_password: String,    
     salt : String,  
     temp_str:String 
});  

var uristring =
    process.env.PROD_MONGODB ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/HelloMongoose';
 
mongoose.connect(uristring); 
module.exports = mongoose.model('users', userSchema);