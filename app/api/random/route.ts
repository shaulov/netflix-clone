import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma-db';
import serverAuth from '@/lib/server-auth';

export default async function GET(request: Request) {
  if (request.method !== 'GET') {
    return new NextResponse('Method not allow', { status: 405 });
  }

  try {
    await serverAuth();

    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    return NextResponse.json(randomMovie[0]);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 }); 
  }
}