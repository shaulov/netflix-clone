import { NextResponse } from 'next/server';
import prismadb from '@/lib/prisma-db';
import serverAuth from '@/lib/server-auth';

export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return new NextResponse('Method not allow', { status: 405 });
  }

  try {
    await serverAuth();

    const { searchParams } = new URL(request.url);
    const movieId = searchParams.get('movieId');

    if (typeof movieId !== 'string' || !movieId) {
      throw new Error('Invalid ID');
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if (!movie) {
      throw new Error('Invalid ID');
    }

    return NextResponse.json(movie);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}`, { status: 400 });
  }
}