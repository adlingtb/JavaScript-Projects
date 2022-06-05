document.getElementById('nav').innerHTML = `
<div class='navbar'>
<input placeholder='Search for Movies or TV Shows...' id='searchBar'>
<div class='navButtons'>
    <div class='navBtn'>
        Movies
        <div class='navBtnDropdown'>
            <a href='./Movie-Popular.html'>Popular</a>
            <a href='./Movie-Top.html'>Top Rated</a>
            <a href='./Movie-New.html'>New Releases</a>
        </div>
    </div>
    <div class='navBtn'>
        TV Shows
        <div class='navBtnDropdown'>
            <a href='./TV-Popular.html'>Popular</a>
            <a href='./TV-Top.html'>Top Rated</a>
            <a href='./TV-New.html'>New Releases</a>
        </div>
    </div>
    <div class='navBtn'><a href='./Now-Showing.html'>Now Showing</a></div>
    <div class='navBtn'><a href='./What-to-Watch.html'>What to Watch</a></div>
</div>
</div>
`