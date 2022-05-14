const express = require('express');
const categoryRouter = express.Router();
const Cateogries = require("../models/categories/categoriesModel")

categoryRouter.get("/",async(req,res,next)=>{
try {
    const categories = await Cateogries.find({});
    res.send(categories);
} catch (error) {
    console.log(error);
}
})

module.exports=categoryRouter;