import Image from "next/image";
import Link from "next/link";
import { BsFillPlayFill } from "react-icons/bs";
import FavoriteButton from "./favorite-button";

interface MovieCardProps {
  data: Record<string, any>
}

function MovieCard ({ data }: MovieCardProps): JSX.Element {
  const src = data.thumbnailUrl;
  return (
    <article className="relative col-span-1 group bg-zinc-900">
      <h3>
        <Link
          className="before:absolute before:top-0 before:left-0 before:z-10 before:w-full before:h-full" 
          href=""
        >
          <span className="sr-only">{data.title}</span>
        </Link>
      </h3>
      <Image 
        className="
          w-full h-[12vw]
          object-cover 
          rounded-md 
          shadow-xl 
          transition duration-100 delay-300
          group-hover:opacity-90
          sm:group-hover:opacity-0
        " 
        loader={() => src} 
        src={src} 
        width={200} height={150} 
        alt={`Movie ${data.title}`}
      />
      <div
        className="
          absolute top-0 left-0 z-10
          w-full
          opacity-0
          transition duration-200 delay-300
          invisible
          sm:visible
          group-hover:scale-110 group-hover:-translate-y-[6vw] 
          group-hover:translate-x-[2vw] group-hover:opacity-100
        "
      >
        <Image 
          className="
            w-full h-[12vw]
            object-cover 
            rounded-t-md 
            shadow-xl
            cursor-pointer
            transition duration-100
          " 
          loader={() => src} 
          src={src} 
          width={200} height={150} 
          alt={`Movie ${data.title}`}
        />
        <div
          className="
            absolute z-10
            w-full p-2 lg:p-4
            bg-zinc-800
            rounded-b-md
            shadow-md
            transition
          "
        >
          <div className="flex flex-row items-center gap-3">
            <Link 
              className="
                flex justify-center items-center 
                w-6 h-6 lg:h-10 lg:w-10 
                bg-white rounded-full
                transition
                hover:bg-neutral-300
              " 
              href="#"
            >
              <BsFillPlayFill className="shrink-0 fill-black" size={30} />
            </Link>
            <FavoriteButton movieId={data?.id} />
          </div>
          <p className="mt-4 font-semibold text-green-400">
            New <span className="text-white">2023</span>
          </p>
          <p className="mt-2 text-[10px] lg:text-sm text-white">
            {data.duration}
          </p>
          <p className="mt-2 text-[10px] lg:text-sm text-white">
            {data.genre}
          </p>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;