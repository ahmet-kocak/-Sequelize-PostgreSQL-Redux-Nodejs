
const {DataTypes } = require("sequelize");

const db = require("../index");



const Book = db.sequelize.define("book", {

  book: DataTypes.STRING(50)
  
})


module.exports=Book;



//const db=require("../index")
//const BookModel = db.sequelize.define('book', {
 /*  id:{
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  }, */
 // book: {
  //  type: DataTypes.STRING(50),
  
 // }

//});


//module.exports=BookModel;