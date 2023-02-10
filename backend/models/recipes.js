const mongoose = require('mongoose')


const recipeSchema = new mongoose.Schema({
    directions: [String],
    fat:Number,
    date:Date,
    categories:[String],
    calories:Number,
    desc:String,
    protein:Number,
    rating: "Decimal128",
    title:String,
    ingredients:[String],
    sodium:Number
}) 

const Recipe = mongoose.model('recipes',recipeSchema)

module.exports = Recipe;