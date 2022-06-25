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
 
    console.log(media)
    for(let i=0;i<media.length;i++){
        let m = media[i];
        let src;
        let title;
        console.log(m)
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





async function getContentByID(id){
    let response = await fetch(`${APIURL}${mediaType}/${id}${APIKEY}`)
    let responseData = await response.json();
    let media = await responseData;
    console.log(media.original_title)
    return await media;
}

let mediaType;
let numberOfWatchers = document.getElementById("numberOfWatchers");


document.getElementById("mediaTypeBtn").addEventListener("click", function(){
    if(document.getElementById("movie-radio").checked){
        mediaType = "movie"
    }else if(document.getElementById("tv-radio").checked){
        mediaType = "tv"
    }

})

document.getElementById("mediaTypeBtn").addEventListener("click",function(){
    let div = document.getElementById("mediaTypeDiv")
    if(mediaType){
        div.classList.add("hidden");
        document.getElementById("watchersDiv").classList.remove("hidden");
    }else{
        document.getElementById("mediaTypeRequired").innerText = "required"
    }
    
})

numberOfWatchers.onkeydown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      let arr = [];
      for(let i=0; i<numberOfWatchers.value; i++){
        arr.push([])
      }
      localStorage.setItem("selections", JSON.stringify(arr))

      let persons = document.getElementById("persons")
      let frag = new DocumentFragment();

      for(let i=0; i<numberOfWatchers.value; i++){
        let item = frag.appendChild(document.createElement('a'));
        item.classList.add("person");
        item.dataset.person = `${i}`;
        item.innerHTML = `Person ${i+1}`;
        if (i==0){
            item.dataset.disabled = "false";
        }else{
            item.dataset.disabled = "true";
        }

        }

      persons.appendChild(frag);

      document.getElementById("watchersDiv").classList.add("hidden");
      document.getElementById("personDiv").classList.remove("hidden");
    }
  };


let currentSelection = 0;




document.getElementById("persons").addEventListener("click", function(e){
    currentSelection=0;
    if (e.target.dataset.disabled == "false"){
        getSelection(e.target.dataset.person)
    }
    
    
})

async function getSelection(person){ 

    let response = await fetch(`${APIURL}${mediaType}/popular${APIKEY}&language=en-US&page=${currentPage}`)
    let responseData = await response.json();
    let media = responseData.results;

    let frag = new DocumentFragment();
    let selectorEl = document.getElementById("selector");

    let src;
    let title;
    let m = media[currentSelection];
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
        addLS(person, m.id)
        currentSelection++;
        item.innerHTML = "";
        getSelection(person)

    })

    document.getElementById("dislike").addEventListener("click", function(){

        currentSelection++;
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

document.getElementById("matchesBtn").addEventListener("click", async function(){
    let selections = JSON.parse(localStorage.getItem("selections"));
    let num = numberOfWatchers.value;
    let allSelections = [];

    //adds all user selections to a single array
    for(let i=0;i<num;i++){
        allSelections.push(...selections[i])
    }


    //gets just the unique selections
    let allUnique = [...new Set(allSelections)];

    let matches = [];

    for(let i=0; i<allUnique.length; i++){
        let x = [];
        x.push(checkOccurrence(allSelections, allUnique[i]), allUnique[i])
        matches.push(x)
    }

    console.log("matches before sort", matches)
    matches.sort(function(a, b) {
        return b[0] - a[0];
      });


    let frag = new DocumentFragment();

    //creates a summary of the most popular selections by checking which id occured the most times in people's selections
    for(let i=0; i<matches.length; i++){
        media =  await getContentByID(matches[i][1]);
        console.log(media);

        let src;
        let title;
        if(media.poster_path===null){
            src="./img/nomedia.png"
        }else{
            src = `${IMGPATH}w500${media.poster_path}`
        }
    
        if(media.original_title==null){
            title = media.name;
        }else{
            title = media.original_title;
        }
        let item = frag.appendChild(document.createElement('div'));
        item.innerHTML = `
        <img src="${src}" alt="${title}">
        <h3>${title}</h3>
        <h4>Chosen by ${matches[i][0]} watchers</<h4>`;
        item.classList.add("finalMatchesDiv")
    }

    let matchesEl = document.getElementById("matches");
    matchesEl.innerHTML = ""
    matchesEl.appendChild(frag);
})

function checkOccurrence(arr, val){
    let count = 0;
    arr.forEach(function(v){
        if(v === val){
            count++
        }
    })
    return count;
}






