import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prismadb from '@/lib/prisma-db';

export async function POST(request: Request) {
  try {
    if (request.method !== 'POST') {
      return new NextResponse('Method Not Allowed', { status: 405 });
    }

    const { email, name, password } = await request.json();

    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      }
    });

    if (existingUser) {
      return new NextResponse('Email taken', { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: '',
        emailVerified: new Date(),
      }
    });
    
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse(`Something went wrong: ${error}}`, { status: 400 });
  }
}