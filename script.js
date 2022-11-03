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

  let movieDataResults = movieData.data.results.at(0);

  const extraData = await getData(`https://api.themoviedb.org/3/movie/${movieDataResults.id}`, {
    params: {
      api_key: "ba4adcc4706ed37650e0a813de11a08f",
      append_to_response: "videos",
    }
  });

  let extraDataResults = extraData.data;

  console.log(movieDataResults);
  console.log(extraDataResults);

  
  
  
  const trailer = document.getElementById('trailer');
  const movie_title = document.getElementById('movie_title');
  const overview = document.getElementById('overview');
  const poster = document.getElementById('poster');
  const genres = document.getElementById('genres')
  
  genres.innerHTML = '';

  let genresInfo = extraDataResults.genres.forEach(element => {
    let genresNames = element.name;
    console.log(genresNames)
    
    genres.innerHTML += `<li> ${genresNames} </li>`
  }); 

  movie_title.innerHTML = `${movieDataResults.title}`;
  overview.innerHTML = `${movieDataResults.overview}`
  // genres.innerHTML = `${extraDataResults.genres.for(0,1,3,4).name}`
  poster.src = `https://image.tmdb.org/t/p/w500${movieDataResults.poster_path}`
  trailer.src = `https://www.youtube.com/embed/${extraDataResults.videos.results.filter((video) => video.type === "Trailer").at(0).key}`

}


