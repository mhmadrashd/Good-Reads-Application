const express = require('express');
const categoryRouter = express.Router();
const Cateogries = require("../models/categories/categoriesModel")

categoryRouter.get("/", async (req, res, next) => {
    try {
        const categories = await Cateogries.find({});
        console.log(categories)
        res.send(categories);
    } catch (error) {
        console.log(error);
    }
})

// const getLastId =()=>{
//     return Cateogries.findOne().sort({ '_id': 1 });
// }

// categoryRouter.post("/",async (req, res,next)=>{
//     const {Name}=req.body;
//     console.log(req.body);
//     const lastCategory = await getLastId();
//     const id = lastCategory._id +1;
//     console.log(lastCategory);
//     await Cateogries.create({id, Name});
//     console.log("..............");
//     res.send({success: true});
// })


module.exports = categoryRouter;
