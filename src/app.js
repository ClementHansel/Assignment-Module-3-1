// app.js

// Function to fetch a random recipe from the API
async function getRandomRecipe() {
  try {
    const response = await fetch(
      "https://themealdb.com/api/json/v1/1/random.php"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch recipe. Please try again later.");
    }

    const data = await response.json();

    if (!data.meals || data.meals.length === 0) {
      throw new Error("No recipe found. Please try again.");
    }

    const recipe = data.meals[0];

    // Access the elements that will display the random recipe
    const randomRecipeImage = document.querySelector(".randomrecipe-image");
    const randomRecipeTitle = document.querySelector(".randomrecipe-title");
    const randomRecipeInstruction = document.querySelector(
      ".randomrecipe-instruction"
    );
    const randomRecipeContainer = document.getElementById(
      "randomRecipeContainer"
    );

    // Check if elements exist before accessing their properties
    if (
      !randomRecipeImage ||
      !randomRecipeTitle ||
      !randomRecipeInstruction ||
      !randomRecipeContainer
    ) {
      throw new Error("One or more required elements are missing in the HTML.");
    }

    // Display random recipe details
    randomRecipeImage.src = recipe.strMealThumb;
    randomRecipeImage.alt = recipe.strMeal;
    randomRecipeImage.style.width = "200px";
    randomRecipeTitle.textContent = recipe.strMeal;

    // Split and format the recipe instructions into an ordered list
    const instructions = recipe.strInstructions
      .split("\n")
      .filter((instruction) => instruction.trim() !== "");

    // Clear previous content and create ordered list for instructions
    randomRecipeInstruction.innerHTML = ""; // Clear previous instructions
    const ol = document.createElement("ol"); // Create <ol> element
    ol.style.listStylePosition = "inside"; // Ensures numbers align with text
    ol.style.paddingLeft = "0"; // Remove default padding
    ol.style.margin = "0"; // Remove default margin

    instructions.forEach((instruction) => {
      const li = document.createElement("li"); // Create <li> element for each instruction
      li.textContent = instruction.trim(); // Add instruction text
      ol.appendChild(li); // Append <li> to <ol>
    });

    randomRecipeInstruction.appendChild(ol); // Append <ol> to the instruction area

    randomRecipeContainer.style.display = "block"; // Show the random recipe container

    // Hide the "Get Random Recipe" button and second <h1> after displaying the recipe
    const h1Elements = document.querySelectorAll("h1");
    if (h1Elements[1]) h1Elements[1].style.display = "block"; // Show <h1> (Random Recipe Finder)
    const getRandomRecipeBtn = document.getElementById("getRandomRecipeBtn");
    if (getRandomRecipeBtn) getRandomRecipeBtn.style.display = "none"; // Hide the "Get Random Recipe" button

    // Hide the <h1> and the "Get Recipe" button (for the Suggested Recipe Finder)
    if (h1Elements[0]) h1Elements[0].style.display = "none"; // Hide the first <h1>
    const getRecipeBtn = document.getElementById("getRecipeBtn");
    if (getRecipeBtn) getRecipeBtn.style.display = "none"; // Hide "Get Recipe" button
  } catch (error) {
    console.error("Error fetching recipe:", error);

    // Handle error by displaying a message
    const randomRecipeInstruction = document.querySelector(
      ".randomrecipe-instruction"
    );
    if (randomRecipeInstruction) {
      randomRecipeInstruction.textContent =
        error.message || "Sorry, there was an error fetching the recipe.";
    }

    const randomRecipeContainer = document.getElementById(
      "randomRecipeContainer"
    );
    if (randomRecipeContainer) {
      randomRecipeContainer.style.display = "block";
    }
  }
}

// Function to reset everything to the original state
function resetPage() {
  const randomRecipeContainer = document.getElementById(
    "randomRecipeContainer"
  );
  const randomRecipeImage = document.querySelector(".randomrecipe-image");
  const randomRecipeTitle = document.querySelector(".randomrecipe-title");
  const randomRecipeInstruction = document.querySelector(
    ".randomrecipe-instruction"
  );

  // Check if the elements exist before accessing them
  if (
    randomRecipeContainer &&
    randomRecipeImage &&
    randomRecipeTitle &&
    randomRecipeInstruction
  ) {
    randomRecipeContainer.style.display = "none"; // Hide random recipe container
    randomRecipeImage.src = ""; // Clear image
    randomRecipeTitle.textContent = ""; // Clear title
    randomRecipeInstruction.innerHTML = ""; // Clear instructions
  }

  // Show both headings and buttons again
  const h1Elements = document.querySelectorAll("h1");
  if (h1Elements[0]) h1Elements[0].style.display = "block"; // Show the first <h1>
  if (h1Elements[1]) h1Elements[1].style.display = "block"; // Show the second <h1>

  const getRecipeBtn = document.getElementById("getRecipeBtn");
  const getRandomRecipeBtn = document.getElementById("getRandomRecipeBtn");

  if (getRecipeBtn) getRecipeBtn.style.display = "inline-block"; // Show "Get Recipe" button
  if (getRandomRecipeBtn) getRandomRecipeBtn.style.display = "inline-block"; // Show "Get Random Recipe" button
}

// Event listener when the page is loaded
document.addEventListener("DOMContentLoaded", () => {
  const getRandomRecipeBtn = document.getElementById("getRandomRecipeBtn");

  // Event listener for the "Get Random Recipe" button
  if (getRandomRecipeBtn) {
    getRandomRecipeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      getRandomRecipe();
    });
  }

  // Event listener for double-click anywhere on the document to reset the page
  document.addEventListener("dblclick", resetPage);
});
