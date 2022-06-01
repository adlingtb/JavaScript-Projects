let starStyle = "regular";


async function getRandomMeal(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const recipe = await response.json();
    const meal = recipe.meals[0];
    console.log(meal);

    const rndMealEl = document.getElementById("rndMeal");
    



    rndMealEl.innerHTML = `
    
    <div class="rndMealLabel">Random Meal</div>
    <a id="star" class="rndMealLabel">
        <i  class="fa-${starStyle} fa-star"></i>
    </a>
    <a id="newMeal" class="rndMealLabel">
        <i  class="fa-solid fa-arrows-rotate"></i>
    </a>
    <div class="rndMeal" onclick="openRecipe(${meal.idMeal});">
        <img src="${meal.strMealThumb}" alt="${meal}">
        <div class="centerVertical">
            <h2>${meal.strMeal}</h2>

        </div>
    </div>

    
    `

    const starEl = document.getElementById("star");
    const newMealEl = document.getElementById("newMeal");

    starEl.addEventListener("click", function(){
        if(starStyle === "regular"){
            starStyle = "solid"
            addLS(meal.idMeal)
        }else{
            starStyle = "regular"
            removeLS(meal.idMeal)
        }
        starEl.innerHTML = "";
        let i = starEl.appendChild(document.createElement("i")) 
        i.innerHTML = `
        <i  class="fa-${starStyle} fa-star"></i>
        `
    })

    newMealEl.addEventListener("click", function(){
        starStyle = "regular";
        getRandomMeal()
    });
}

function addLS(id){
    let currentLS = JSON.parse(localStorage.getItem("favs"));
    let allFavs= [id]; 
    let merge;
    
    if(currentLS === null){
        merge = allFavs;
    }else{
        merge = [].concat(currentLS, allFavs);
    }
    localStorage.setItem("favs", JSON.stringify(merge));
    
    updateFav();

}

function removeLS(id){
    let currentLS = JSON.parse(localStorage.getItem("favs"));

    for(let i=0; i<currentLS.length; i++){
        if(currentLS[i]===id){
            currentLS.splice(i,1)
        }
    }

    localStorage.setItem("favs", JSON.stringify(currentLS));

    updateFav();


}




async function updateFav(){
    let currentLS = JSON.parse(localStorage.getItem("favs"));
    let favEl = document.getElementById("fav");


    favEl.innerHTML = "";

    let favContainer = new DocumentFragment();

    for(let i = 0; i<currentLS.length; i++){

        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${currentLS[i]}`);
        const recipe = await response.json();
        const meal = recipe.meals[0];


        let div = favContainer.appendChild(document.createElement("div")) 
        div.innerHTML = `
        <div onclick="openRecipe(${meal.idMeal});" href="./View-Recipe.html" class="favIcon">
            <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}">
            <h2>${meal.strMeal}</h2>
            <a href="#" onclick=" event.stopImmediatePropagation(); removeLS('${meal.idMeal}'); ">x</a>
        </div>

        `
    }
    favEl.appendChild(favContainer)
    
}


function openRecipe(id){

    localStorage.setItem("currentRecipe", id);

    window,open("./View-Recipe.html", "_self");
}



getRandomMeal();
updateFav();








