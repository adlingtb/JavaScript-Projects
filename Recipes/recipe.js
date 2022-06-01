getRecipeById();

async function getRecipeById(){
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${localStorage.getItem("currentRecipe")}`);
    const recipe = await response.json();
    const meal = recipe.meals[0];

    console.log(meal);

    let recipeEl = document.getElementById("recipeDetails");

    let vid = meal.strYoutube;
    let vidCode = meal.strYoutube.slice(32,vid.length);

    let div = recipeEl.appendChild(document.createElement("div")) 
    div.innerHTML = `
    <div class="recipe">
        <div class="centerWrapper">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        </div>
        <div class="recipeDetails">
            <h1>${meal.strMeal}</h1>
            <div class="recipeSummary">
                <h2>Nationality: ${meal.strArea}</h2>
                <h2>Category: ${meal.strCategory}</h2>
                <h2>Source: <a href="${meal.strSource}">${meal.strSource}</a></h2>
                <h2>Ingredients:</h2>
                <ul id="ingredients"></ul>
            </div>
            <p>${meal.strInstructions}</p>
            <iframe width="100%" height="315" src="https://www.youtube.com/embed/${vidCode}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
    `

    let ingredientsContainer = new DocumentFragment();
    let ingredientsEl = document.getElementById("ingredients");
    
    for (i=1; i < 21; i++){
        let strIng = meal[`strIngredient${i}`];

        if (strIng == "" || strIng == " " || strIng == null){
            continue;
        }

        let fragment = ingredientsContainer.appendChild(document.createElement("div"));
        fragment.innerHTML = `<img src="https://www.themealdb.com/images/ingredients/${meal[`strIngredient${i}`]}.png"><strong>${meal[`strIngredient${i}`]}</strong> ${meal[`strMeasure${i}`]}`

    }

    ingredientsEl.appendChild(ingredientsContainer);

}   



