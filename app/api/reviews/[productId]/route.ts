import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mogodb';
import Review from '../../../../models/Review';

export async function GET(req: Request, { params }: { params: { productId: string } }) {
  await dbConnect();

  const { productId } = params;

  try {
    const reviews = await Review.find({ productId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
