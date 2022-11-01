export class Recipe {
  /**
   * @param {int} id
   * @param {string} name
   * @param {int} servings
   * @param {RecipeIngredient[]} ingredients
   * @param {int} time
   * @param {string} description
   * @param {Appliance} appliance
   * @param {Ustensil[]} ustensils
   */
  constructor({id, name, servings, ingredients, time, description, appliance, ustensils}) {
    this.id = id;
    this.name = name;
    this.servings = servings;
    this.ingredients = ingredients;
    this.time = time;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
  }
}