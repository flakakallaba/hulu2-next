// make the request to the backend api

// this is just a variable that calls API_KEY
const API_KEY = process.env.API_KEY

export default {
    fetchTrending : {
        title: 'Trending',
        URL: `/trending/all/week?api_key=${API_KEY}&language=es-US`
    },
    fetchTopRated: {
      title: 'Top Rated',
      URL: `/movie/top_rated?api_key=${API_KEY}&language=es-US`,
    },
    fetchActionMovies: {
      title: 'Action',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    },
    fetchComedyMovies: {
      title: 'Comedy',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    },
    fetchRomanceMovies: {
      title: 'Romance',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    },
    fetchMystery: {
      title: 'Mystery',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
    },
    fetchSciFi: {
      title: 'SciFi',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
    },
    fetchWestern: {
      title: 'Western',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
    },
    fetchAnimation: {
      title: 'Animation',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
    },
    fetchTv: {
      title: 'Tv Movie',
      URL: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
    },
}