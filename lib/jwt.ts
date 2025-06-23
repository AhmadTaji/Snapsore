import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!; // Must be set in .env.local

export function signJwt(payload: object, expiresIn = '1d') {
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, secret);
}
// export function decodeJwt(token: string) {
//   return jwt.decode(token);
// }                  
