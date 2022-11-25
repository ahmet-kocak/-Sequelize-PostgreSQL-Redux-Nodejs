
const { Sequelize, Model, DataTypes } = require("sequelize");
const db = require("../index");

const Publisher = db.sequelize.define("publisher", {

  publisher: DataTypes.STRING(50),
  
})

module.exports=Publisher;

//const db=require("../index")

/* const PublisherModel = db.sequelize.define('publisher', {

  publisher:{
    type: DataTypes.STRING(50),
 
  }

},);


module.exports=PublisherModel; */