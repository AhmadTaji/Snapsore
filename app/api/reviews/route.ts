import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Review from '@/models/Review';
import dbConnect from '@/lib/mogodb';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
  await dbConnect();
  const cookie = req.headers.get('cookie') || '';
  const token = cookie
    .split('; ')
    .find((c) => c.startsWith('token='))
    ?.split('=')[1];

  if (!token) {
  return NextResponse.json(
    { error: 'Authentication required. Please sign in to continue.' },
    { status: 401 }
  );
}

  try {
    const { productId, rating, comment } = await req.json();
    const decoded: any = jwt.verify(token, JWT_SECRET);

    const newReview = new Review({
      userId: decoded.id,
      userName: decoded.name,
      productId,
      rating,
      comment,
    });

    await newReview.save();

    return NextResponse.json({ message: 'Review posted successfully' });
  } catch (err) {
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
