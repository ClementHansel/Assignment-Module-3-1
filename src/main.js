const recipe = {
  title: "Spaghetti Carbonara",
  instructions: [
    "Cook spaghetti according to package instructions.",
    "In a separate pan, cook pancetta until crispy.",
    "In a bowl, whisk eggs and grated cheese.",
    "Combine spaghetti, pancetta, and egg mixture, stirring quickly.",
    "Serve immediately with additional cheese and black pepper.",
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

  const ol = document.createElement("ol");

  recipe.instructions.forEach((instruction) => {
    const li = document.createElement("li");
    li.textContent = instruction;
    ol.appendChild(li);
  });

  recipeInstruction.appendChild(ol);

  // Set the recipe image
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
