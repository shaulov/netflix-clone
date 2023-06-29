import { useCallback, useMemo } from "react";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useCurrentUser from "@/hooks/use-current-user";
import useFavorites from "@/hooks/use-favorites";
import { ApiRoute } from "@/const";

interface FavoriteButtonProps {
  movieId: string;
}

function FavoriteButton ({ movieId }: FavoriteButtonProps): JSX.Element {
  const { mutate: mutateFavorites } = useFavorites();
  const { data: currentUser, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const favoriteList = currentUser?.favoriteIds || [];

    return favoriteList.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;

    if(isFavorite) {
      response = await axios.delete(`${ApiRoute.Favorite}/?movieId=${movieId}`);
    } else {
      response = await axios.post(ApiRoute.Favorite, { movieId });
    }

    const updatedFavoriteIds = response?.data?.favoriteIds;

    mutate({
      ...currentUser,
      favoriteIds: updatedFavoriteIds,
    });

    mutateFavorites();
  }, [movieId, isFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;

  return (
    <button 
      className="
        group/item
        flex justify-center items-center 
        w-6 h-6 lg:h-10 lg:w-10 
        border-white border-2 rounded-full
        transition
        cursor-pointer
      hover:border-neutral-300
      "
      onClick={toggleFavorites}
    >
      <Icon className="fill-white" size={25} />
    </button>
  );
}

export default FavoriteButton