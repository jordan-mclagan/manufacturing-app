const {Ingredient} = require('./IngredientParser/index.js');

class Recipe {
    constructor(filepath, data) {
        this.filepath = filepath;
        this.data = data;
    }

    display() {
        console.log(this.filepath + " " + this.data);
    }

    stripRecipe() {
        // console.log(this.data)
        if (this.data !== "null" && this.data) {
            try {
                let parsedData = JSON.parse(this.data);
                let keys = Object.keys(parsedData);
                keys.map(key => {
                    let newIngredient = new Ingredient(key, parsedData);
                    newIngredient.stripVariant();
                })
            } catch (err) {
                console.log(this.data)
                console.log(err.message)
            } finally {

            }
        }
    }
}

module.exports.Recipe = Recipe;