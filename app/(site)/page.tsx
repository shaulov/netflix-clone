'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/use-current-user';
import { AppRoute, AuthStatus } from '@/const';
import Navbar from '@/components/navbar';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  // const { data: user } = useCurrentUser();

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
        <Navbar />
      </>
    );
  }
}
