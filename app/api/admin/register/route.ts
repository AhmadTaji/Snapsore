import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Admin from '@/models/Admin';
import dbConnect from "../../../../lib/mogodb"

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    return NextResponse.json({ error: 'Admin already exists' }, { status: 400 });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create admin
  const newAdmin = new Admin({ email, password: hashedPassword });
  await newAdmin.save();

  return NextResponse.json({ message: 'Admin registered successfully' }, { status: 201 });
}
