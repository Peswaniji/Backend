const mongoose =require('mongoose')

function connectToDB(){
    mongoose.connect("mongodb+srv://peswaniji999_db_user:Qi7281QOFD3x7Wg6@cluster0.t0axb6n.mongodb.net/test")
    .then(() => {
        console.log("DataBase Connection established sucessfully");
        
    })
}

module.exports = connectToDB