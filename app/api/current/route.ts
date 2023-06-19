import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from 'next/server';
import serverAuth from '@/lib/server-auth';

export default async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    if (request.method !== 'GET') {
      return new NextResponse('Method Not Allowed', { status: 405 });
    }

    const { currentUser } = await serverAuth(request, response);

    return NextResponse.json(currentUser);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}