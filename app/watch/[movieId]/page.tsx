'use client';

import { useParams } from "next/navigation";
import Link from "next/link";
import useMovie from "@/hooks/use-movie";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AppRoute } from "@/const";

function Watch () {
  const { movieId } = useParams();
  const { data } = useMovie(movieId as string);

  return (
    <div 
      className="
        w-screen
        h-screen
        bg-black
      "
    >
      <nav
        className="
          fixed z-10
          flex flex-row items-center gap-8
          w-full
          p-4
          bg-black
          bg-opacity-70
        "
      >
        <Link href={AppRoute.Root}>
          <AiOutlineArrowLeft size={40} />
        </Link>
        <p className="text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span>
          {data?.title}
        </p>
      </nav>
      <video 
        className="h-full w-full" 
        src={data?.videoUrl}
        autoPlay
        controls
      >  
      </video>
    </div>
  );
}

export default Watch;