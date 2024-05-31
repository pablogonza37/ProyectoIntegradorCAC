function validarFormulario() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Verificar si el campo de correo electrónico está vacío
    if (email.trim() === "") {
        alert("Por favor ingrese su correo electrónico");
        return false;
    }

    // Verificar si el campo de contraseña está vacío
    if (password.trim() === "") {
        alert("Por favor ingrese su contraseña");
        return false;
    }

    return true; 
}

// Opciones para las peticiones fetch a la API
const options = {
    method: 'GET', // Método de la petición (GET)
    headers: {
        accept: 'application/json', // Tipo de respuesta esperada (JSON)
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTJjYTAwZDYxZWIzOTEyYjZlNzc4MDA4YWQ3ZmNjOCIsInN1YiI6IjYyODJmNmYwMTQ5NTY1MDA2NmI1NjlhYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4MJSPDJhhpbHHJyNYBtH_uCZh4o0e3xGhZpcBIDy-Y8'
    }
};

const apiUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl, options);
        console.log('Response status:', response.status);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies');
    moviesContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        moviePoster.alt = movie.title;

        const movieDetails = document.createElement('div');
        movieDetails.classList.add('movie-details');

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.title;

        const movieOverview = document.createElement('p');
        movieOverview.textContent = movie.overview;

        movieDetails.appendChild(movieTitle);
        movieDetails.appendChild(movieOverview);
        movieElement.appendChild(moviePoster);
        movieElement.appendChild(movieDetails);
        moviesContainer.appendChild(movieElement);
    });

    const tituloPeliculasPopulares = document.getElementById('tituloPeliculasPopulares');
    if (tituloPeliculasPopulares) {
        tituloPeliculasPopulares.textContent = "Películas Populares";
    }

}

document.addEventListener("DOMContentLoaded", function() {
    const hamburguesa = document.querySelector(".hamburguesa");
    const listaNav = document.querySelector(".listaNav");
  
    hamburguesa.addEventListener("click", function() {
      listaNav.classList.toggle("mostrar");
    });
  });
