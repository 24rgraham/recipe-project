const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'da4c2a888amshc0a3faa09c1e7b5p15d91djsn6bdd906fb36b',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

var description;

function fetchRandomRecipe() {
    var recipeNumber = Math.floor(Math.random() * 100)
    console.log(recipeNumber);
    var url = "https://tasty.p.rapidapi.com/recipes/list?from=" + recipeNumber + "&size=1";

    fetch(url, options)
	.then(response => response.json())
	.then(function (data) {
        console.log(data);
        console.log(data.results[0].name + " " + data.results[0].thumbnail_url+ " " + data.results[0].description);

        recipeNameEl.textContent = "Today's recipe: " + data.results[0].name;
        let recipeImageEl = document.createElement("img");
        recipeImageEl.src = data.results[0].thumbnail_url;
        recipeImageEl.className = "recipeImage";
        recipeImageDivEl.appendChild(recipeImageEl);

        description = data.results[0].description;
    })
	.catch(err => console.error(err));
}

function handleButtonEvent(event) {
    event.preventDefault();
    console.log("des" + description);
    recipedetailDivEl.textContent = description;
}

var recipeNameEl = document.querySelector(".todayrecipe");
var recipeImageDivEl = document.querySelector(".recipeDiv");
var buttonEl = document.getElementById("button");
buttonEl.addEventListener('click', handleButtonEvent);
var recipedetailDivEl = document.querySelector(".recipedetail");
fetchRandomRecipe();