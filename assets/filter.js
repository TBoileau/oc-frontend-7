export class RecipeFilter {
  constructor({recipes, ingredients, appliances, ustensils}) {
    this.recipes = recipes;
    this.ingredients = ingredients;
    this.appliances = appliances;
    this.ustensils = ustensils;

    this.query = null;
    this.selectedTags = {
      ingredients: [],
      ustensils: [],
      appliances: []
    };
  }

  select(tag, type) {
    this.selectedTags[type].push(tag);
  }

  remove(tag, type) {
    this.selectedTags[type] = [...this.selectedTags[type].filter(i => i !== tag)];
  }

  get filteredRecipes() {
    return this.recipes.filter(recipe => {
      const isIngredientMatch = this.selectedTags.ingredients.length === 0
        || this.selectedTags.ingredients.every(tag => recipe.ingredients.some(i => i.ingredient === tag));
      const isApplianceMatch = this.selectedTags.appliances.length === 0
        || this.selectedTags.appliances.some(tag => recipe.appliance === tag);
      const isUstensilMatch = this.selectedTags.ustensils.length === 0
        || this.selectedTags.ustensils.some(tag => recipe.ustensils.some(u => u === tag));

      return isIngredientMatch && isApplianceMatch && isUstensilMatch;
    });
  }
}