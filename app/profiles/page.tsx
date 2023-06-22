'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import useCurrentUser from '@/hooks/use-current-user';
import { AppRoute, AuthStatus } from '@/const';

function Profiles () {
  const session = useSession();
  const router = useRouter();

  const { data: user } = useCurrentUser();

  useEffect(() => {
    if (session?.status === AuthStatus.NoAUTH) {
      router.push(AppRoute.Auth);
    }
  }, [session?.status, router]);

  if (session?.status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <section className='flex items-center justify-center h-full'>
      <div className='flex flex-col'>
        <h1 className='text-3xl text-white text-center'>Who is watching?</h1>
        <ul className='flex items-center justify-center gap-8 mt-10'>
          <li>
            <article className='group relative grid gap-4 w-44 mx-auto'>
              <Link 
                className="
                  row-start-2
                  inline-block w-full
                  text-2xl text-gray-400 text-center 
                  group-hover:text-white
                  before:absolute before:top-0 before:left-0 before:w-full before:h-full
                " 
                href={AppRoute.Root}
              >
                {user?.name}
              </Link>
              <Image 
                className="
                  row-start-1
                  w-44 h-44 
                  rounded-md border-2 border-transparent
                  group-hover:border-white group-hover:cursor-pointer
                  overflow-hidden
                "
                src="/images/default-blue.png" 
                width={44} 
                height={44} 
                alt="Profile"
              />
            </article>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Profiles;