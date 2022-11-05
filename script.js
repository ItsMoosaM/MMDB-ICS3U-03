// api_key= ba4adcc4706ed37650e0a813de11a08f;


function getSelected() {
  let selectedMovie = document.getElementById("movies").value;
  console.log(selectedMovie)
  getMovie(selectedMovie)
}

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

const getMovie = async (selectedMovie) => {
  const movieData = await getData("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "ba4adcc4706ed37650e0a813de11a08f",
      query: selectedMovie,
    }
  });

  let lessMovieDataResults = movieData.data.results.at(0);

  const extraData = await getData(`https://api.themoviedb.org/3/movie/${lessMovieDataResults.id}`, {
    params: {
      api_key: "ba4adcc4706ed37650e0a813de11a08f",
      append_to_response: "videos",
    }
  });

  let movieDataResults = extraData.data;

  console.log(lessMovieDataResults);
  console.log(movieDataResults);

  
  
  
  const movie_title = document.getElementById('movie_title');
  const tagline = document.getElementById('tagline');
  const poster = document.getElementById('poster');
  const trailer = document.getElementById('trailer');
  const overview = document.getElementById('overview');
  const genreTitle = document.getElementById('genreTitle')
  const genres = document.getElementById('genres');
  const releaseDate = document.getElementById('releaseDate');
  const productionCompany = document.getElementById('productionCompany');
  const movieCollection = document.getElementById('movieCollection');
  const backdropImg = document.getElementById('backdropImage');
  const backdropImageLink = document.getElementById('backdropImageLink');
  const website = document.getElementById('movieWebsite');


  
  movie_title.innerHTML = `${movieDataResults.title}`;
  tagline.innerHTML = `${movieDataResults.tagline}`;
  poster.src = `https://image.tmdb.org/t/p/w500${movieDataResults.poster_path}`
  trailer.src = `https://www.youtube.com/embed/${movieDataResults.videos.results.filter((video) => video.type === "Trailer").at(0).key}`
  overview.innerHTML = `${movieDataResults.overview}`
  
  genreTitle.innerHTML = 'Genres';
  genres.innerHTML = '';
  let genresInfo = movieDataResults.genres.forEach(element => {
    let genresNames = element.name;
    console.log(genresNames)
    genres.innerHTML += `<li> ${genresNames} </li>`
  }); 

  releaseDate.innerHTML = `Release Date: ${movieDataResults.release_date}`;
  productionCompany.innerHTML = `Production Company: ${movieDataResults.production_companies[0].name}`;
  backdropImg.src = `https://image.tmdb.org/t/p/w500${movieDataResults.backdrop_path}`
  backdropImageLink.href = `${movieDataResults.homepage}`
  website.innerHTML = `${movieDataResults.homepage}`
  website.href = `${movieDataResults.homepage}`
  movieCollection.innerHTML = `Collection: ${movieDataResults.belongs_to_collection.name}`;
}


