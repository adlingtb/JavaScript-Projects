let APIKEY = "?api_key=a80c2729a61824d814de4e1d62263a53";
let APIURL = "https://api.themoviedb.org/3/"
let IMGPATH = "https://image.tmdb.org/t/p/"

let currentPage = 1;

let search = document.getElementById("searchBar");
search.onkeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      localStorage.setItem("searchTerm", search.value)
      window.open("./Search.html", "_self")
    }
  };


async function getPopular(type){   
    let response = await fetch(`${APIURL}${type}/popular${APIKEY}&language=en-US&page=${currentPage}`)
    let responseData = await response.json();
    let media = responseData.results;

    addToPage(media, "Popular");
}

async function getSearch(){   
    let searchTerm = localStorage.getItem("searchTerm");
    let response = await fetch(`https://api.themoviedb.org/3/search/multi${APIKEY}&language=en-US&query=${searchTerm}&page=${currentPage}&include_adult=false`)
    let responseData = await response.json();
    let media = responseData.results;

    addToPage(media, "Results");
}




function addToPage(media, title){
    let content = new DocumentFragment();
    let contentEl = document.getElementById("content");
    document.getElementById("heading").innerText = title
 
    for(i=0;i<media.length;i++){
        let m = media[i];
        let src;
        let title;
        if(m.poster_path===null){
            src="./img/nomedia.png"
        }else{
            src = `${IMGPATH}w500${m.poster_path}`
        }

        if(m.original_title==null){
            title = m.name;
        }else{
            title = m.original_title;
        }

        let item = content.appendChild(document.createElement('div'));
        item.classList.add("mediaContainer")
        item.innerHTML = `
        <div class="mediaImageCont">
            <img src="${src}">
            <div class="mediaDesc"><p>${m.overview}</p></div>
        </div>
        <div class="mediaDiv">
            <h3>${title}</h3>
            <span>${m.vote_average}</span>
        </div>
        `
    }
    contentEl.appendChild(content);
}



let numberOfPlayers = document.getElementById("numberOfPlayers");
let mediaType;

document.getElementById("mediaTypeBtn").addEventListener("click", function(){
    if(document.getElementById("movie-radio").checked){
        mediaType = "movie"
    }else if(document.getElementById("tv-radio").checked){
        mediaType = "tv"
    }
})

numberOfPlayers.onkeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      let arr = [];
      for(i=0; i<numberOfPlayers.value; i++){
        arr.push([])
      }
      localStorage.setItem("selections", JSON.stringify(arr))

      let persons = document.getElementById("persons")
      let frag = new DocumentFragment();

      for(i=0; i<numberOfPlayers.value; i++){
        let item = frag.appendChild(document.createElement('a'));
        item.classList.add("person");
        item.dataset.person = `${i}`;
        item.innerHTML = `Person ${i+1}`   
        }

      persons.appendChild(frag);
    }
  };


let currentSelection = 0;




document.getElementById("persons").addEventListener("click", function(e){
    i=0;
    getSelection(e.target.dataset.person)
})

async function getSelection(person){ 

    let response = await fetch(`${APIURL}${mediaType}/popular${APIKEY}&language=en-US&page=${currentPage}`)
    let responseData = await response.json();
    let media = responseData.results;

    console.log(media)


    let frag = new DocumentFragment();
    let selectorEl = document.getElementById("selector");

    let src;
    let title;
    let m = media[i];
    if(m.poster_path===null){
        src="./img/nomedia.png"
    }else{
        src = `${IMGPATH}w500${m.poster_path}`
    }

    if(m.original_title==null){
        title = m.name;
    }else{
        title = m.original_title;
    }

    let item = frag.appendChild(document.createElement('div'));
    item.innerHTML = `
        <img src="${src}" alt="${title}">
        <h3>${title}</h3>
        <a id="like">Like</a><a id="dislike">Dislike</a>
    `

    selectorEl.appendChild(frag);

    document.getElementById("like").addEventListener("click", function(){

        //localStorage.setItem(`Person${person}`, m.id )
        addLS(person, m.id)
        i++;
        item.innerHTML = "";
        getSelection(person)

    })

    document.getElementById("dislike").addEventListener("click", function(){

        i++;
        item.innerHTML = "";
        getSelection(person)

    })

}

function addLS(person, id){
    let currentLS = JSON.parse(localStorage.getItem("selections"));
    let currentPerson = currentLS[person];
    let selection = [id]; 
    let merge;
    
    if(currentLS === null){
        merge = selection;
    }else{
        merge = [].concat(currentPerson, selection);
    }

    currentLS[person] = merge;

    localStorage.setItem("selections", JSON.stringify(currentLS));
    

}




