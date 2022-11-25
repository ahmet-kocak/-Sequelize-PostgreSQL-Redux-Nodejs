const express= require('express');
const router = express.Router();
const {postCreateBook,postSearchBook,getSelectList}=require("../controllers/AddController")


router.post("/form", postCreateBook);
router.get("/selectlist", getSelectList);

router.post("/list",  postSearchBook);
router.put("/sort", postSearchBook);




module.exports=router;