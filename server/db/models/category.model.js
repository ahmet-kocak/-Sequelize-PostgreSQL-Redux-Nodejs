const { DataTypes } = require("sequelize");
const db = require("../index");

const Category = db.sequelize.define("category", {

  category: DataTypes.STRING(50),
  
})

module.exports=Category;
