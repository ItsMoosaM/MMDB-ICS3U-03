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

  console.log(movieData.data.results.at(0));


  const movie_title = document.getElementById('movie_title');
  const poster = document.getElementById('poster');

  movie_title.innerHTML = `${movieData.data.results.at(0).title}`;

  poster.src = `https://image.tmdb.org/t/p/w500${movieData.data.results.at(0).poster_path}`


}


