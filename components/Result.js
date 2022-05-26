import Thumbnail from "./Thumbnail";
import FlipMove from "react-flip-move";

function Results({ results, movies }) {

  // console.log(movies)
  // const array = Object.values(movies)
  // console.log(array.filter(a=> a.tmdb_id == 639933))
  return (
    <FlipMove className="px-5 my-10 
                         flex-wrap justify-center
                         sm:grid md:grid-cols-2 
                         xl:grid-cols-3 3xl:flex ">
      {results.map((result) => (
        <Thumbnail key={result.id} result={result} movie={movies.find(movie => movie.tmdb_id === result.id)} />
        
      ))}
    </FlipMove>
  );
}

export default Results;