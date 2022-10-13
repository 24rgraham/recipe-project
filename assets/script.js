var searchBtn = document.getElementById('search-byn');
var mealList = document.getElementById('meal');
var mealDetailsContent = documentquerySelector('.meal-details-content');
var recipeCloseBtn = document.getElementById('recipe-close-byn');
var ingredients = document.querySelector('ingredients');

searchBtn.addEventListener('click', getMealList);

//matched meal list with the ingredient
function getMealList(){
    var searchInputTxt = document.getElementById('search-input').value.trim();
    console.log(searchInputTxt.length);

    function getApi(e){
        e.preventDefault();
        console.log('getApi')
        var url = "https://tasty.p.rapidapi.com/recipes/list?i=${searchInputTxt}";
    }

    fetch('url')
    .then(function(Response){
        return response.json();
    })
    .then(function (data){
        // for (var i = 0; i < data.length; i++){
        //     var ingredients = textContent = data[i].html_url;
            
        }
        console.log(data);
    })
}

const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://tasty.p.rapidapi.com/recipes/auto-complete?i=${searchInputTxt}",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "9c4e2effe4mshdb57e3901e2dbcap1c3d2djsnc2f16284b672",
		"X-RapidAPI-Host": "tasty.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});