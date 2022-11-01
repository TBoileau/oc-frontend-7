export class RecipeIngredient {
  /**
   * @param {Ingredient} ingredient
   * @param {string|null} quantity
   * @param {string|null} unit
   */
  constructor({ingredient, quantity = null, unit = null}) {
    this.ingredient = ingredient;
    this.quantity = quantity;
    this.unit = unit;
  }
}