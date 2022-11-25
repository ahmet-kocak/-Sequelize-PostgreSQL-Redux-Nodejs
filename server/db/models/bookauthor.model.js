
const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../index");
const Author = require("./author.model");
const Book = require("./book.model");


const Book_Author = db.sequelize.define('book_author', {
 

  selfGranted: DataTypes.BOOLEAN
}, { timestamps: false });







module.exports=Book_Author;


