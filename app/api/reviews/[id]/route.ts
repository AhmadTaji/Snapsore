import { NextResponse } from 'next/server';
import { productReviews } from "../../../../utils/reviews";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const reviews = productReviews[parseInt(id)] || [];
  return NextResponse.json(reviews);
}
