const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

const apiUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=ec8d1f53446d8567da75d0398f6ecd39&page=1';
const img = 'https://image.tmdb.org/t/p/w1280';
const searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=ec8d1f53446d8567da75d0398f6ecd39&query="'

getMovies(apiUrl);

async function getMovies(url) {
    const res = await fetch(url);

    const data = await res.json();

    showMovies(data.results);
    console.log(data.results);
}

form.addEventListener('submit', (e)=> {
    e.preventDefault();

    const searchMovie = search.value;

    if (searchMovie && searchMovie !== "") {
        getMovies(searchUrl + searchMovie);

        search.value = '';
    }else {
        window.location.reload()
    }
})


function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { title, poster_path, vote_average, overview } = movie

        const movieCont = document.createElement('div');
        movieCont.classList.add('movie-container');

        movieCont.innerHTML = `
        <div class="img">
            <img src="${img + poster_path}" alt="${title}">
        </div>
        <div class="info">
            <h3>${title}</h3>
            <span class="${getRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="description">
            <h4>description</h4>
            <p>${overview}</p>
        </div>
    `
        main.appendChild(movieCont);
    });
}

function getRate(vote) {
    if (vote >= 8) {
        return 'green'
    }else if(vote >= 5 ) {
        return 'orange'
    }else {
        return 'red'
    }
}