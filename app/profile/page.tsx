'use client';

import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

type UserPayload = {
  name: string;
  email: string;
};

export default function ProfilePage() {
  const [user, setUser] = useState<UserPayload | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];

    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token);
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token:', err);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500 text-lg">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">Account Overview</h1>

      <div className="bg-white shadow-md rounded-xl p-6 md:p-10 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-xl font-medium text-gray-900">{user.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-xl font-medium text-gray-900">{user.email}</p>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={() => {
              document.cookie = 'token=; Max-Age=0; path=/';
              window.location.href = '/products';
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
          <button
            onClick={() => alert('Edit profile coming soon!')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-medium"
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}
