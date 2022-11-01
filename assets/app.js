import './styles/app.scss';

import {RecipeProvider} from "./providers/recipe-provider";
import {RecipeFilter} from "./filter";
import {recipeFactory} from "./factories/recipe-factory";
import {tagFactory} from "./factories/tag-factory";

(async () => {
  const {recipes, ingredients, appliances, ustensils} = await RecipeProvider.getRecipes();

  const recipeFilter = new RecipeFilter({recipes, ingredients, appliances, ustensils});

  const renderRecipes = () => {
    const recipesContainer = document.querySelector('#recipes');
    recipesContainer.innerHTML = '';
    recipeFilter.filteredRecipes.forEach(recipe => recipesContainer.appendChild(recipeFactory(recipe)));
  }

  renderRecipes();

  /**
   * @param {Ingredient|Appliance|Ustensil} tag
   * @param {string} type
   */
  const selectTag = (tag, type) => {
    recipeFilter.select(tag, type);

    const tagElement = tagFactory(tag);

    tagElement.querySelector('a').addEventListener('click', () => {
      recipeFilter.remove(tag, type);
      tagElement.remove();
      renderRecipes();
    });

    document.querySelector('#tags').appendChild(tagElement);
    renderRecipes();
  };

  const addTags = (tags, type) => {
    const nav = document.createElement('nav');

    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', type);

    const list = document.createElement('ul');

    nav.appendChild(input);
    nav.appendChild(list);

    tags.forEach(tag => {
      const e = document.createElement('li');
      e.innerText = tag.name;
      e.addEventListener('click', () => selectTag(tag, type));
      list.appendChild(e);
    });

    document.querySelector('#nav-tags').appendChild(nav);
  }

  addTags(ingredients, 'ingredients');
  addTags(appliances, 'appliances');
  addTags(ustensils, 'ustensils');
})();
