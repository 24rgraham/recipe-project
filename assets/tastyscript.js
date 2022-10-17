var recipeNameEl = document.querySelector(".recipeName");
var recipeImageDivEl = document.querySelector(".recipeImageDiv");
var moreInfoButtonEl = document.getElementById("moreInfoButton");
var nextRecipeButtonEl = document.getElementById("nextRecipeButton");
var recipeDescriptionEl = document.querySelector(".recipeDescription");
var recipeInstructionsEl = document.querySelector(".recipeInstructionsDiv");
var recipeIngredientsEl = document.querySelector(".recipeIngredientsDiv");
var pastRecipeDiv = document.querySelector(".pastRecipe");

const options = {
    method: 'GET',
    headers: {
        

        'X-RapidAPI-Key': '2027bdb4a5msh1927092e2140ee1p1ccd38jsn9b4c3fa1c4f5',

        // 'X-RapidAPI-Key': '6cf937361amsh9b432836823a324p17b612jsn8c93f55895ec',

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
        // let descriptionHeading = document.createElement("h2");
        // descriptionHeading.textContent = "Description of this recipe:";
        // recipeDescriptionEl.appendChild(descriptionHeading);

        let description = document.createElement("p");
        if (globalDescription) {
            description.innerHTML = globalDescription;
        } else {
            description.innerHTML = globalTopDescription;
        }
        
        recipeDescriptionEl.appendChild(description);
    } else { console.log('no description'); handleNextRecipeButtonEvent();}
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


    document.getElementById('moreInfo').style.display = 'block';
    moreInfoButtonEl.style.display = 'none';

    console.log("Instructions");
    let instructionsHeading = document.createElement("h2");
    instructionsHeading.textContent = "Instructions:";
    instructionsHeading.setAttribute('class', 'is-size-3');
    recipeInstructionsEl.appendChild(instructionsHeading);

    for (i=0; i<globalInstructions.length; i++) {
        if (globalInstructions[i]) {
            var j = i+1;
            console.log(globalInstructions[i]);
            let instruction = document.createElement("p");
            instruction.innerHTML = j + '. ' + globalInstructions[i] + ' <br />';
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

function printRecipeIngredients() {
    console.log("Ingredients");
    let ingredientHeading = document.createElement("h2");
    ingredientHeading.textContent = "Ingredients:";
    ingredientHeading.setAttribute('class', 'is-size-3');
    recipeIngredientsEl.appendChild(ingredientHeading);

    for (i=0; i<globalIngredients.length; i++) {
        if (globalIngredients[i]) {
            console.log(globalIngredients[i]);
            let ingredient = document.createElement("p");
            ingredient.textContent = '- ' + globalIngredients[i];
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

        printPastRecipes();

        globalIngredients = getRecipeIngredients();
        globalInstructions = getRecipeInstructions();
    });
}

function handleMoreInfoButtonEvent() {
    console.log("In handleMoreInfoButtonEvent");
    addRecipeToSessionStorage();

    printRecipeInstructions();

    printRecipeIngredients();
}

function handleNextRecipeButtonEvent() {
    moreInfoButtonEl.style.display = 'inline';
    document.getElementById('moreInfo').style.display = 'none';
    console.log("In handleNextRecipeButtonEvent");
    clearElements();
    loadRecipe();
}

function addRecipeToSessionStorage() {
    var recipeArray = [globalRecipe.name];
    var sessionStorageArray = JSON.parse(sessionStorage.getItem("pastRecipe"));
    if (sessionStorageArray) {
        recipeArray = recipeArray.concat(sessionStorageArray);
    }
    sessionStorage.setItem("pastRecipe", JSON.stringify(recipeArray));
}

function printPastRecipes() {
    pastRecipeDiv.innerHTML = "";
    let pastRecipeArr = JSON.parse(sessionStorage.getItem("pastRecipe"));

    if (pastRecipeArr && pastRecipeArr.length > 0) {
        let pastRecipeHeading = document.createElement("h2");
        pastRecipeHeading.textContent = "Past searched recipes:";
        pastRecipeHeading.setAttribute('class', 'is-size-3');
        pastRecipeDiv.appendChild(pastRecipeHeading);

        for (i=0; i<pastRecipeArr.length; i++) {
            let pastRecipe = document.createElement("p");
            pastRecipe.textContent = '- ' + pastRecipeArr[i];
            pastRecipeDiv.appendChild(pastRecipe);
        }
    }
}

function clearElements() {
    recipeImageDivEl.innerHTML = ""; 
    recipeDescriptionEl.innerHTML = "";
    recipeInstructionsEl.innerHTML = "";
    recipeIngredientsEl.innerHTML = "";
    pastRecipeDiv.innerHTML = "";
}



moreInfoButtonEl.addEventListener('click', handleMoreInfoButtonEvent);
nextRecipeButtonEl.addEventListener('click', handleNextRecipeButtonEvent);

loadRecipe();