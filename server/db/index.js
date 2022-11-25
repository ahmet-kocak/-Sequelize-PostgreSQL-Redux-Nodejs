const { Sequelize } = require('sequelize');
let db={};

const sequelize = new Sequelize({
  host: "localhost",dialect: "postgres",
  database:"task",password:"******",
  username:"postgres",port:****, pool:40,retry:3,logging:true
});


const CONNECTION_DB= async (req,res)=>{
  try {
    await sequelize.authenticate({logging:true});
    console.log("sequlize connect")
  } catch (error) {return console.log(error.message)}
}



const REFRESH_DB= async (req,res)=>{
  try {
    const Book=require("./models/book.model"); 
    const Author=require("./models/author.model"); 
    const Book_Author=require("./models/bookauthor.model"); 
    const Category=require("./models/category.model"); 
    const Publisher=require("./models/publisher.model"); 

    Author.belongsToMany(Book, {through: Book_Author});
    Book.belongsToMany(Author, {through: Book_Author}); 

    Book.hasMany(Publisher);
    Publisher.belongsTo(Book);

    Book.hasOne(Category);
    Category.belongsTo(Book);
    
//sequelize.sync({force:true});

} catch (error) {return console.log(error.message)}} 


db.CONNECTION_DB=CONNECTION_DB;
db.sequelize=sequelize;
db.REFRESH_DB=REFRESH_DB;

module.exports =db;

