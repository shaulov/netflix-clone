import { NextApiRequest } from "next";
import { NextResponse } from 'next/server';
import serverAuth from '@/lib/server-auth';

export async function GET(request: NextApiRequest) {
  try {
    if (request.method !== 'GET') {
      return new NextResponse('Method Not Allowed', { status: 405 });
    }

    const currentUser = await serverAuth();

    return NextResponse.json(currentUser);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}