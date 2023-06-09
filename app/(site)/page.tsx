'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useMovieList from '@/hooks/use-movie-list';
import useFavorites from '@/hooks/use-favorites';
import { AppRoute, AuthStatus } from '@/const';
import Navbar from '@/components/navbar';
import Billboard from '@/components/billboard';
import MovieList from '@/components/movie-list';
import InfoModal from '@/components/info-modal';
import useInfoModal from '@/hooks/use-info-modal';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  const { data: movies = [] } = useMovieList();
  const { data: favoriteMovies = [] } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  useEffect(() => {
    if (session?.status === AuthStatus.NoAUTH) {
      router.push(AppRoute.Auth);
    }
  }, [session?.status, router]);

  if (session?.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session?.status === "authenticated") {
    return (
      <>
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
        <Billboard />
        <div className="pb-40">
          <MovieList title="Trending Now" data={movies} />
          <MovieList title="My List" data={favoriteMovies} />
        </div>
      </>
    );
  }
}
