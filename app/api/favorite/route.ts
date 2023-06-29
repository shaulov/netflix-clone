import { NextResponse } from "next/server";
import { without } from "lodash";
import prismadb from '@/lib/prisma-db';
import serverAuth from "@/lib/server-auth";

export async function POST(request: Request) {
  if (request.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 }); 
  }
  try {
    const currentUser = await serverAuth();
    const { movieId } = await request.json();

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if(!existingMovie) {
      throw new Error('Invalid ID');
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: {
          push: movieId,
        }
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  if (request.method !== 'DELETE') {
    return new NextResponse('Method Not Allowed', { status: 405 }); 
  }

  try {
    const currentUser = await serverAuth();
    const { searchParams } = new URL(request.url)
    const movieId = searchParams.get('movieId')

    if (!movieId || typeof movieId !== 'string') {
      throw new Error('Invalid ID');
    }

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });

    if(!existingMovie) {
      throw new Error('Invalid ID');
    }

    const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favoriteIds: updatedFavoriteIds,
      }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}