import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import Admin from '@/models/Admin';
import dbConnect from '@/lib/mogodb';
import { signJwt } from '@/lib/jwt';

export async function POST(req: Request) {
  await dbConnect();
  const { email, password } = await req.json();

  const admin = await Admin.findOne({ email });
  if (!admin) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

  // const token = signJwt({ id: admin._id, email: admin.email });
  const token = signJwt({ id: admin._id, email: admin.email, name: admin.name });

  const response = NextResponse.json({ message: 'Login successful' });
  response.cookies.set('admin-token', token, {
    // httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}
export const config = {
  runtime: 'edge',
};



