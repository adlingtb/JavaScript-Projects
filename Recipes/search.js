document.getElementById("searchBtn").addEventListener("click", function(){
    let term = document.getElementById("search");
    search(term.value);
});


async function search(term){
    console.log(term)
    //TODO: Add fetch to retrieve recipes for the term, open results page
}