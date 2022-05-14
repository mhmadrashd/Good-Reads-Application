const mongoose =require ('mongoose');
// const DBconnect =require ('./DBconnection/DBconnect.js')
const dbconnect=() =>{
    
mongoose.connect('mongodb+srv://mern:mern145@goodreadsapplication.q1c0m.mongodb.net/test' ,{
    
    useUnifiedTopology :true,

    useNewUrlParser :true
}).then (()=>console.log('DB is Connected  successfully'))
.catch(error =>(console.log(error)))

}
module.exports =dbconnect;