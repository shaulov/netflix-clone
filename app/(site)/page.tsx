'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import useCurrentUser from '@/hooks/use-current-user';
import { AppRoute, AuthStatus } from '@/const';

export default function Home() {
  const session = useSession();
  const router = useRouter();

  // const { data: user } = useCurrentUser();

  console.log(session);

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
        <h1 className="text-4xl text-red-600">Netflix Clone</h1>
        <p className='text-white'>Logged in as: {session?.data?.user?.name}</p>
        {/* <p className='text-white'>Logged in as: {user?.name}</p> */}
        <button className="w-full h-10 text-black bg-white" onClick={() => signOut()}>Logout!</button>
      </>
    );
  }
}
