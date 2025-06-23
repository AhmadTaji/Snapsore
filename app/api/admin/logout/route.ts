// import { NextResponse } from 'next/server';

// export async function POST() {
//   const response = NextResponse.json({ message: 'Logged out' });
//   response.cookies.set('admin-token', '', {
//     httpOnly: true,
//     path: '/',
//     expires: new Date(0), // Expire immediately
//   });

//   return response;
// }
// /app/api/logout/route.ts
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" });
  response.cookies.set("admin-token", "", {
    httpOnly: true,
    expires: new Date(0),
    path: "/",
    sameSite: "lax",
  });
  return response;
}
