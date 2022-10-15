var recipeNameEl = document.querySelector(".recipeName");
var recipeImageDivEl = document.querySelector(".recipeImageDiv");
var moreInfoButtonEl = document.getElementById("moreInfoButton");
var nextRecipeButtonEl = document.getElementById("nextRecipeButton");
var recipeDescriptionEl = document.querySelector(".recipeDescription");
var recipeInstructionsEl = document.querySelector(".recipeInstructionsDiv");
var recipeIngredientsEl = document.querySelector(".recipeIngredientsDiv");


const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '9c4e2effe4mshdb57e3901e2dbcap1c3d2djsnc2f16284b672',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

var globalRecipe;
var globalDescription;
var globalTopDescription;
var globalInstructions = [];
var globalIngredients = [];


function getRandomRecipe() {
    var recipeNumber = Math.floor(Math.random() * 100)
    var url = "https://tasty.p.rapidapi.com/recipes/list?from=" + recipeNumber + "&size=1";

    return fetch(url, options)
    .then(response => response.json())
    .then(function (data) {
        console.log(data)
        console.log(data.results[0]);
        return data.results[0];
    });
}

function getRecipeName() {
    return globalRecipe.name;
}

function printRecipeName(name) {
    console.log("Name: " + name);
    recipeNameEl.textContent = name;
}

function getRecipeImage() {
    return globalRecipe.thumbnail_url;
}

function printRecipeImage(image_url) {
    console.log("Image: " + image_url);
    let recipeImageEl = document.createElement("img");
    recipeImageEl.src = image_url;
    recipeImageEl.className = "recipeImage";
    recipeImageEl.setAttribute('width', '800px')
    recipeImageDivEl.appendChild(recipeImageEl);
}

function getRecipeDescription() {
    return globalRecipe.description;
}

function printRecipeDescription() {
    console.log("Description: " + globalTopDescription + " " + globalDescription);
    if (globalDescription || globalTopDescription) {
        //recipeDescriptionEl.innerHTML = "<p>Description</p>" + "<p>" + globalDescription + "</p>";
        let descriptionHeading = document.createElement("h2");
        descriptionHeading.textContent = "Description of this recipe:";
        recipeDescriptionEl.appendChild(descriptionHeading);

        let description = document.createElement("p");
        if (globalDescription) {
            description.innerHTML = globalDescription;
        } else {
            description.innerHTML = globalTopDescription;
        }
        
        recipeDescriptionEl.appendChild(description);
    }
}

function getRecipeInstructions() {
    var instructions = new Array();
    if (globalRecipe.instructions && globalRecipe.instructions.length > 0) {
        for (i=0; i<globalRecipe.instructions.length; i++) {
            instructions.push(globalRecipe.instructions[i].display_text);
        }
    }
    return instructions;
}

function printRecipeInstructions() {
    document.getElementById('moreInfo').style.display = 'block' 
    console.log("Instructions");
    let instructionsHeading = document.createElement("h2");
    instructionsHeading.textContent = "Instructions:";
    recipeInstructionsEl.appendChild(instructionsHeading);

    for (i=0; i<globalInstructions.length; i++) {
        if (globalInstructions[i]) {
            console.log(globalInstructions[i]);
            let instruction = document.createElement("p");
            instruction.textContent = globalInstructions[i];
            recipeInstructionsEl.appendChild(instruction);
        }
    }
}

function getRecipeIngredients() {
    var ingredients = new Array();
    if (globalRecipe.sections && globalRecipe.sections.length > 0) {
        if (globalRecipe.sections[0].components && globalRecipe.sections[0].components.length > 0) {
            for (i=0; i<globalRecipe.sections[0].components.length; i++) {
                ingredients.push(globalRecipe.sections[0].components[i].raw_text);
            }
        }
    }
    return ingredients;
}

function printRecipeIngredients(ingredients) {
    console.log("Ingredients");
    let ingredientHeading = document.createElement("h2");
    ingredientHeading.textContent = "Ingredients:";
    recipeIngredientsEl.appendChild(ingredientHeading);

    for (i=0; i<globalIngredients.length; i++) {
        if (globalIngredients[i]) {
            console.log(globalIngredients[i]);
            let ingredient = document.createElement("p");
            ingredient.textContent = globalIngredients[i];
            recipeIngredientsEl.appendChild(ingredient);
        }
    }
}

function loadRecipe() {
    this.getRandomRecipe()
    .then((recipe) => {
        globalTopDescription = recipe.description;
        if (recipe.recipes && recipe.recipes.length > 0) {
            return recipe.recipes[0];
        } else {
            return recipe;
        }
    })
    .then((recipe) => {
        globalRecipe = recipe;
        var name = getRecipeName();
        printRecipeName(name);

        var image_url = getRecipeImage();
        printRecipeImage(image_url);

        globalDescription = getRecipeDescription();
        printRecipeDescription(globalDescription);


        globalIngredients = getRecipeIngredients();
        globalInstructions = getRecipeInstructions();
    });
}

function handleMoreInfoButtonEvent() {
    console.log("In handleMoreInfoButtonEvent");

    printRecipeInstructions();

    printRecipeIngredients();
}

function handleNextRecipeButtonEvent() {
    console.log("In handleNextRecipeButtonEvent");
    clearElements();
    loadRecipe();
}

function clearElements() {
    recipeImageDivEl.innerHTML = ""; 
    recipeDescriptionEl.innerHTML = "";
    recipeInstructionsEl.innerHTML = "";
    recipeIngredientsEl.innerHTML = "";
}



moreInfoButtonEl.addEventListener('click', handleMoreInfoButtonEvent);
nextRecipeButtonEl.addEventListener('click', handleNextRecipeButtonEvent);

loadRecipe();