import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "../../../lib/mogodb"; // Adjust the path as necessary
import Item from "../../../models/Item";

export async function GET() {
  await dbConnect();
  const items = await Item.find();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const newItem = await Item.create(body);
  return NextResponse.json(newItem, { status: 201 });
}
