const recipe = {
  title: "Spaghetti Carbonara",
  instructions: [
    "1. Cook spaghetti according to package instructions.",
    "2. In a separate pan, cook pancetta until crispy.",
    "3. In a bowl, whisk eggs and grated cheese.",
    "4. Combine spaghetti, pancetta, and egg mixture, stirring quickly.",
    "5. Serve immediately with additional cheese and black pepper.",
  ],
  image: "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg",
};

const getRecipeBtn = document.getElementById("getRecipeBtn");
const recipeTitle = document.querySelector(".recipe-title");
const recipeInstruction = document.querySelector(".recipe-instruction");
const recipeImage = document.querySelector(".recipe-image");
const recipeContainer = document.getElementById("recipeContainer");

function onRandomRecipe() {
  recipeTitle.textContent = recipe.title;

  recipeInstruction.innerHTML = "";

  const ul = document.createElement("ul");

  ul.style.paddingLeft = "0";
  ul.style.listStyleType = "none";

  recipe.instructions.forEach((instruction) => {
    const li = document.createElement("li");
    li.textContent = instruction;
    li.style.marginBottom = "10px";
    ul.appendChild(li);
  });

  recipeInstruction.appendChild(ul);

  recipeImage.src = recipe.image;

  recipeImage.style.width = "200px";

  getRecipeBtn.style.display = "none";
}

function resetPage() {
  recipeTitle.textContent = "";
  recipeInstruction.innerHTML = "";
  recipeImage.src = "";

  recipeImage.style.width = "auto";

  getRecipeBtn.style.display = "inline-block";
}

getRecipeBtn.addEventListener("click", onRandomRecipe);

recipeContainer.addEventListener("click", resetPage);
