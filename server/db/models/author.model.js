const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../index");



const Author = db.sequelize.define("author", {

  author: DataTypes.STRING(50)
  
})

module.exports=Author;
