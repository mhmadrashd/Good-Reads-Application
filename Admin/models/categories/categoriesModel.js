const mongoose = require('mongoose');
const categoriesSchema = require('./categoriesSchema');

const CategoriesModel = mongoose.model('Category' , categoriesSchema);

module.exports = CategoriesModel;