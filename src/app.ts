app.ts

// Define the structure of the API response
interface Meal {
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
}

interface ApiResponse {
  meals: Meal[] | null;
}

// Function to check HTML elements 
function getElement<T extends HTMLElement>(selector: string): T {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element with selector "${selector}" not found.`);
  }
  return element as T;
}

// Function to fetch a random recipe from the API
async function getRandomRecipe(): Promise<void> {
  try {
    // Fetch a random recipe from the API and catch error when fetching
    const response = await fetch("https://themealdb.com/api/json/v1/1/random.php");
    if (!response.ok) {
      throw new Error("Failed to fetch recipe. Please try again later.");
    }

    // Catch error if API recipe data not available
    const data: ApiResponse = await response.json();
    if (!data.meals || data.meals.length === 0) {
      throw new Error("No recipe found. Please try again.");
    }

    const recipe = data.meals[0];

    // Access the elements to display the recipe
    const randomRecipeImage = getElement<HTMLImageElement>(".randomrecipe-image");
    const randomRecipeTitle = getElement<HTMLHeadingElement>(".randomrecipe-title");
    const randomRecipeInstruction = getElement<HTMLDivElement>(".randomrecipe-instruction");
    const randomRecipeContainer = getElement<HTMLDivElement>("#randomRecipeContainer");

    // Display the recipe details
    randomRecipeImage.src = recipe.strMealThumb;
    randomRecipeImage.alt = recipe.strMeal;
    randomRecipeImage.style.width = "200px";
    randomRecipeTitle.textContent = recipe.strMeal;

    // Format instructions as an ordered list
    const instructions = recipe.strInstructions
      .split("\n")
      .filter((instruction) => instruction.trim() !== "");

    // Clear previous instructions and display the new ones
    randomRecipeInstruction.innerHTML = ""; // Clear content
    const ol = document.createElement("ol");
    ol.style.listStylePosition = "inside";
    ol.style.paddingLeft = "0";
    ol.style.margin = "0";

    instructions.forEach((instruction) => {
      const li = document.createElement("li");
      li.textContent = instruction.trim();
      ol.appendChild(li);
    });

    randomRecipeInstruction.appendChild(ol);
    randomRecipeContainer.style.display = "block";

    // Manage the layout of elements. If [1] = display, if [0] = hide
    const h1Elements = document.querySelectorAll<HTMLHeadingElement>("h1");
    if (h1Elements[1]) h1Elements[1].style.display = "block";
    const getRandomRecipeBtn = document.getElementById("getRandomRecipeBtn");
    if (getRandomRecipeBtn) getRandomRecipeBtn.style.display = "none";

    if (h1Elements[0]) h1Elements[0].style.display = "none";
    const getRecipeBtn = document.getElementById("getRecipeBtn");
    if (getRecipeBtn) getRecipeBtn.style.display = "none";
  } catch (error) {
    console.error("Error fetching recipe:", error);

    const randomRecipeInstruction = document.querySelector<HTMLDivElement>(".randomrecipe-instruction");
    if (randomRecipeInstruction) {
      randomRecipeInstruction.textContent =
        (error as Error).message || "Sorry, there was an error fetching the recipe.";
    }

    const randomRecipeContainer = document.getElementById("randomRecipeContainer");
    if (randomRecipeContainer) {
      randomRecipeContainer.style.display = "block";
    }
  }
}

// Function to reset the page to its original state
function resetPage(): void {
  try {
    const randomRecipeContainer = getElement<HTMLDivElement>("#randomRecipeContainer");
    const randomRecipeImage = getElement<HTMLImageElement>(".randomrecipe-image");
    const randomRecipeTitle = getElement<HTMLHeadingElement>(".randomrecipe-title");
    const randomRecipeInstruction = getElement<HTMLDivElement>(".randomrecipe-instruction");

    randomRecipeContainer.style.display = "none";
    randomRecipeImage.src = "";
    randomRecipeTitle.textContent = "";
    randomRecipeInstruction.innerHTML = "";

    const h1Elements = document.querySelectorAll<HTMLHeadingElement>("h1");
    if (h1Elements[0]) h1Elements[0].style.display = "block";
    if (h1Elements[1]) h1Elements[1].style.display = "block";

    const getRecipeBtn = document.getElementById("getRecipeBtn");
    const getRandomRecipeBtn = document.getElementById("getRandomRecipeBtn");

    if (getRecipeBtn) getRecipeBtn.style.display = "inline-block";
    if (getRandomRecipeBtn) getRandomRecipeBtn.style.display = "inline-block";
  } catch (error) {
    console.error("Error resetting page:", error);
  }
}

// Initialize event listeners when the page loads

// Click getRandomRecipeBtn to get the random recipe
document.addEventListener("DOMContentLoaded", () => {
  const getRandomRecipeBtn = document.getElementById("getRandomRecipeBtn");
  if (getRandomRecipeBtn) {
    getRandomRecipeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      getRandomRecipe();
    });
  }

  // Double Click anywhere to reset the page
  document.addEventListener("dblclick", resetPage);
});
