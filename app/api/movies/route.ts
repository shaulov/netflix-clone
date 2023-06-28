import { NextResponse } from "next/server";
import prismadb from '@/lib/prisma-db';
import serverAuth from "@/lib/server-auth";

export async function GET(request: Request) {
  if (request.method !== 'GET') {
    return new NextResponse('Method not allowed', { status: 405 });
  }

  try {
    await serverAuth();

    const movies = await prismadb.movie.findMany();

    return NextResponse.json(movies);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}