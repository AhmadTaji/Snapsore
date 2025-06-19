import { NextRequest, NextResponse } from 'next/server';
import dbConnect from "../../../../lib/mogodb"
import Item from '@/models/Item';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const data = await req.json();
  const updated = await Item.findByIdAndUpdate(params.id, data, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const deleted = await Item.findByIdAndDelete(params.id);
  return NextResponse.json({ deleted });
}