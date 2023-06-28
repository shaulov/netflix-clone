import { NextResponse } from "next/server";
import { without } from "lodash";
import prismadb from '@/lib/prisma-db';
import serverAuth from "@/lib/server-auth";

export async function POST(request: Request) {
  try {
    if (request.method === 'POST') {
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
    }

    if (request.method === 'DELETE') {
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
    }

    return new NextResponse('Method Not Allowed', { status: 405 }); 
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}