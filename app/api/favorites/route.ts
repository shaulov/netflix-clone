import { NextResponse } from "next/server";
import prismadb from '@/lib/prisma-db';
import serverAuth from "@/lib/server-auth";

export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return new NextResponse('Method not allowed', { status: 405 });
  }

  try {
    const currentUser = await serverAuth();

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        }
      }
    });

    return NextResponse.json(favoriteMovies);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}