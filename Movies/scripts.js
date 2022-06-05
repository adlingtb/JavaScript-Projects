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

async function getSelection(type, person){   
    let response = await fetch(`${APIURL}${type}/popular${APIKEY}&language=en-US&page=${currentPage}`)
    let responseData = await response.json();
    let media = responseData.results;

    console.log(media)


    let frag = new DocumentFragment();
    let selectorEl = document.getElementById("selector");

    let src;
    let title;
    let i = 0;
    let m = media[0];
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

        localStorage.setItem(`Person${person}`, m.id )
        i++;
        

    })

}



