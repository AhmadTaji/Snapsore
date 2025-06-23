'use client';

import AuthForm from '../../components/AuthForm';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = async (data: { email: string; password: string }) => {
    const res = await fetch('/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error?.error || 'Invalid credentials');
    }

    // ✅ Navigate to dashboard after login
    router.push('/products');
  };

  return (
    <AuthForm
      title="Welcome Back"
      submitLabel="Login"
      onSubmit={handleLogin}
      isLogin // 🔑 Important to hide name input
    />
  );
}
