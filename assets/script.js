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
        recipedetailEl.textContent = "description:"  + description;
        var instructionArray = [];
        if (data.results[0].instructions) {
            console.log("instruction in result");
            instructionArray = data.results[0].instructions;
        } else if (data.results[0].recipes[0].instructions) {
            console.log("instruction in recipes");
            instructionArray = data.results[0].recipes[0].instructions;
        }
        for(var i=0 ; i < instructionArray.length ; i++) {
            var instruction = instructionArray[i].display_text;
            console.log(instruction);
            //instructiondetailEl.textContent = "preparation steps:" + instruction;
          let intstep = document.createElement("p");
          intstep.textContent=i + ": " + instruction;
          instructiondetailEl.appendChild(intstep);
        }
        var ingarr =[];
         ingarr = data.results[0].sections[0].components;
        for(var i=0 ; i<ingarr.length ;i++);
        var inglist=ingarr[i].raw_text;
        console.log(inglist);
    })
	.catch(err => console.error(err));
}

function handleButtonEvent(event) {
    event.preventDefault();
    console.log("des" + description);
    //console.log("ins" + instruction);
    for (var i=0; i<instructionArr.length;i++) {
        console.log(instructionArr[i]);
    }
    recipedetailEl.textContent = "description:"  + description;
    instructiondetailEl.textContent = "preparation steps:" + instructionArr[i];
}

var recipeNameEl = document.querySelector(".todayrecipe");
var recipeImageDivEl = document.querySelector(".recipeDiv");
var buttonEl = document.getElementById("button");
buttonEl.addEventListener('click', handleButtonEvent);
var recipedetailEl = document.querySelector(".recipedetail");
var instructiondetailEl = document.querySelector(".instructiondetail");

fetchRandomRecipe();