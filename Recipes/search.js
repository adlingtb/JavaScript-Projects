let searchEl = document.getElementById("searchResults");




function openRecipe(id){

    localStorage.setItem("currentRecipe", id);

    window.open("./View-Recipe.html", "_self");
}

document.getElementById("searchBtn").addEventListener("click", function(){
    let term = document.getElementById("search");
    
    localStorage.setItem("searchTerm", term.value);
    window.open("./Search.html", "_self");
    
});


async function search(term){
    

    
    const response = await fetch(`http://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
    const recipe = await response.json();

    let fragContainer = new DocumentFragment();
    searchEl.innerHTML = "";
    
    
    for(let i =0; i<recipe.meals.length; i++){
        const meal = recipe.meals[i];       
        let frag = fragContainer.appendChild(document.createElement("li"));

        frag.innerHTML = `
        <div onclick='openRecipe(${meal.idMeal})' class="searchResultItem">
            <img src="${meal.strMealThumb}/preview" alt="${meal.strMeal}" onerror="this.onerror=null;this.src='${meal.strMealThumb}';">
            <div>
                <h2>${meal.strMeal}</h2>
                <h2>${meal.strCategory}</h2>
            </div>
        </div>
        `
    }

    searchEl.appendChild(fragContainer);

}