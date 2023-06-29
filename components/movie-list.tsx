import { isEmpty } from "lodash";
import MovieCard from "./movie-card";

interface MovieListProps {
  data: Record<string, any>[];
  title: string;
}

function MovieList ({ data, title }: MovieListProps): JSX.Element | null {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <section className="mt-10 space-y-8 px-4 md:px-12">
      <h2 className="font-semibold text-base md:text-xl lg:text-2xl text-white">{title}</h2>
      <div className="grid grid-cols-4 gap-2">
        {
          data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))
        }
      </div>
    </section>
  );
}

export default MovieList;