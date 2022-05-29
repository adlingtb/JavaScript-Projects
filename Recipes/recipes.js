async function getRandomMeal(){
    const response = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
    const recipe = await response.json();
    const meal = recipe.meals[0];
    console.log(meal);


    const rndMealEl = document.getElementById("rndMeal");

    rndMealEl.innerHTML = `
    
    <div class="rndMealLabel">Random Meal</div>
    <div class="rndMeal">
        <img src="${meal.strMealThumb}" alt="${meal}">
        <h2>${meal.strMeal}</h2>
    </div>

    
    `
}
getRandomMeal();