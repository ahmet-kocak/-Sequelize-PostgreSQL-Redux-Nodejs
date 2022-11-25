const Book = require("../db/models/book.model")
const Author = require("../db/models/author.model")
const Category = require("../db/models/category.model")
const Publisher = require("../db/models/publisher.model")
const {errorHandling} = require('../utils/errorHandling');
const { Op } = require("sequelize");


exports.postCreateBook = async (req, res) => {

    const {author,book,category,publisher}=req.body;
    if (!book) {res.status(400).json({message: "Content can not be empty!"});return;};

    const new_author = await Author.create({author:author.toLowerCase()});
    const new_book = await Book.create({book:book.toLowerCase()});
    await Category.create({category:category.toLowerCase(),bookId:new_book.id});
    await Publisher.create({publisher:publisher.toLowerCase(),bookId:new_book.id});
    await new_author.addBook(new_book,{ through: { selfGranted: false } });

    res.json(req.body)
};




exports.postSearchBook =async (req, res) => {

    const {keyword,sort}=req.body;
    if (!keyword) {res.status(400).json({message: "Content can not be empty!"});return;};
    const myList = await Book.findAll({ 
        where: { book:{[Op.substring]: keyword.toLowerCase() }},
        order: [["book", !sort?"ASC":sort]],
        attributes: ["book"],
        include: [
            {model: Author,attributes: ["author"]},
            {model: Category,attributes: ["category"]},
            {model: Publisher,attributes: ["publisher"]}
        ],
    });

    const result=myList?.map(item=>
        item.authors?.map(par=>
            item.publishers?.map(dat=>({
                "book":item.book,
                "author":par.author,
                "category":item.category,
                "publisher":dat.publisher
            })).flat()
        ).flat()
    ).flat();

    res.json(result)
};



exports.getSelectList =async (req, res) => {


    const myCategory = await Category.findAll({ order: [["category", "ASC"]],attributes: ["category"]});
    const myAuthor = await Author.findAll({ order: [["author", "ASC"]],attributes: ["author"]});
    const myPublisher = await Publisher.findAll({ order: [["publisher", "ASC"]],attributes: ["publisher"]}); 

    const resultCategory= myCategory?.map(item=>item.category).filter((item, i,arr) =>arr.indexOf(item) === i );
    const resultAuthor= myAuthor?.map(item=>item.author).filter((item, i,arr) =>arr.indexOf(item) === i );
    const resultPublisher= myPublisher?.map(item=>item.publisher).filter((item, i,arr) =>arr.indexOf(item) === i );

    res.json({Category:resultCategory,Author:resultAuthor,Publisher:resultPublisher})
};





/* exports.updateSortBook =async (req, res) => {

    const userId = req.params.id;
    await Book.update(req.body, {where: { id: userId }})
      .then(async(num)=>{
          if (num==1) {
            const updatedUser = await Book.findOne({ where: { id: userId } });
            return res.status(200).json({ user: updatedUser });
          } else { return res.json({message: 'User was not found!'});}
      })
      .catch(err=> res.status(500).json({ error: errorHandling(err.message) }))
};
 */



/* exports.deleteUser =async (req, res) => {

  const userId=req.params.id
  await Book.destroy({where:{ id:userId }})
    .then(async(num)=>{
      if (num == 1) {
        return res.json({message: "User was deleted successfully!"});
      } else {
        return  res.json({message: `User was not found!`});
      }

    })
    .catch(err=> res.status(500).json({ error: errorHandling(err.message) }))

}; */

