import { useRouter } from "next/navigation";
import { BsFillPlayFill } from "react-icons/bs";

interface PlayButtonProps {
  movieId: string;
}

function PlayButton ({ movieId }: PlayButtonProps) {
  const router = useRouter();
  return (
    <button 
      className="
        flex flex-row items-center
        w-auto
        px-2 md:px-4
        py-1 md:py-2
        text-xs lg:text-lg
        font-semibold
        text-black
        bg-white
        rounded-md
        transition
        hover:bg-neutral-300
      "
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <BsFillPlayFill className="mr-1" size={25} />
      Play
    </button>
  );
}

export default PlayButton;