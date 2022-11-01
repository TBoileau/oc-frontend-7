export const tagFactory = (tag) => {
  const tagElement = document.createElement('li');
  tagElement.innerText = tag.name;

  const removeButton = document.createElement('a');
  removeButton.innerText = 'x';

  tagElement.appendChild(removeButton);

  return tagElement;
}