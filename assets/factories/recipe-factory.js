export const recipeFactory = (recipe) => {
  const recipeElement = document.createElement('div');
  recipeElement.classList.add('recipe');
  recipeElement.innerHTML = `<div class="recipe__name">${recipe.name}</div>`;
  return recipeElement;
}
