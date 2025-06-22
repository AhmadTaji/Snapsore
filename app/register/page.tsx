'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function AdminRegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/admin/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      alert('Admin registered successfully!');
      router.push('/login'); // redirect to login
    } else {
      const data = await res.json();
      alert(data.error || 'Registration failed');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-center">Register Admin</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        className="w-full border p-2 rounded"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        className="w-full border p-2 rounded"
      />
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Register
      </button>
    </form>
  );
}
