let APIKEY = "?api_key=a80c2729a61824d814de4e1d62263a53";
let APIURL = "https://api.themoviedb.org/3/"
let IMGPATH = "https://image.tmdb.org/t/p/"

let currentPage = 1;




async function getPopular(type){

    
    let response = await fetch(`${APIURL}${type}/popular${APIKEY}&language=en-US&page=${currentPage}`)
    let responseData = await response.json();
    let media = responseData.results;

    console.log(media)
    

    let popular = new DocumentFragment();
    let popularEl = document.getElementById("popular");
    document.getElementById("heading").innerText = "Popular";

    

    

    for(i=0;i<media.length;i++){
        let m = media[i];
        let src;
        if(m.poster_path===null){
            src="./img/nomedia.png"
        }else{
            src = `${IMGPATH}w500${m.poster_path}`
        }

        let item = popular.appendChild(document.createElement('div'));
        item.classList.add("mediaContainer")
        item.innerHTML = `
        

        <div class="mediaImageCont">
        <img src="${src}">
        <div class="mediaDesc"><p>${m.overview}</p></div>
        </div>

        
        <div class="mediaDiv">
            <h3>${m.original_title}</h3>
            <span>${m.vote_average}</span>
        </div>

        `
    }

    popularEl.appendChild(popular);
    

}