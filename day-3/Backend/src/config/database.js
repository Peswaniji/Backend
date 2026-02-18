const mongoose =require('mongoose')

function connecttodb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(() =>{
        console.log("DataBase Connected Sucessfully...");
    })
}


module.exports=connecttodb