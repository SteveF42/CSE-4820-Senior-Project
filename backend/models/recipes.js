const mongoose = require('mongoose')


const recipeSchema = new mongoose.Schema({
    category: String,
    author:String,
    category: String,
    image:String,
    ingredients: [String],
    instructions: String,
    instruction_list: [String],
    nutrients: Object,
    title:String,
    total_time: Number,
    yields:String,
    userAuthor: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    }
}) 
// recipeSchema.index({"ingredients":"text"})

const Recipes = mongoose.model('recipes',recipeSchema,'recipes')

module.exports = Recipes;