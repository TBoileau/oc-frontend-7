import {Recipe} from "../models/recipe";
import {RecipeIngredient} from "../models/recipe-ingredient";
import {Ingredient} from "../models/ingredient";
import {Appliance} from "../models/appliance";
import {Ustensil} from "../models/ustensil";

export class RecipeProvider {
  /**
   * @returns {Promise<{recipes: Recipe[], ustensils: Ustensil[], appliances: Appliance[], ingredients: Ingredient[]}>}
   */
  static async getRecipes() {
    return await fetch('/fixtures/recipes.json')
      .then(response => response.json())
      .then(recipes => {
        return {
          recipes,
          ustensils: [...new Set(
            recipes
              .map(recipe => recipe.ustensils)
              .flat()
              .map(ustensil => ustensil.toLowerCase())
          )].map(ustensil => new Ustensil({name: ustensil})),
          appliances: [...new Set(
            recipes
              .map(recipe => recipe.appliance.toLowerCase())
          )].map(appliance => new Appliance({name: appliance})),
          ingredients: [...new Set(
            recipes
              .map(recipe => recipe.ingredients)
              .flat()
              .map(ingredient => ingredient.ingredient.toLowerCase())
          )].map(ingredient => new Ingredient({name: ingredient}))
        }
      })
      .then(({recipes, ustensils, appliances, ingredients}) => {
        return {
          recipes: recipes.map(recipe => new Recipe({
            ...recipe,
            ingredients: recipe.ingredients.map(ingredient => new RecipeIngredient({
              ...ingredient,
              ingredient: ingredients.find(ingredientModel => ingredientModel.name === ingredient.ingredient.toLowerCase())
            })),
            ustensils: recipe.ustensils.map(ustensilName => ustensils.find(ustensil => ustensil.name === ustensilName.toLowerCase())),
            appliance: appliances.find(appliance => appliance.name === recipe.appliance.toLowerCase())
          })),
          ustensils,
          appliances,
          ingredients
        }
      })
  }
}