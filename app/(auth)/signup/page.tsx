// app/(auth)/register/page.tsx
'use client';

import AuthForm from "../../components/AuthForm";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    const res = await fetch("/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to register");

    router.push("/loginuser"); // Redirect to login after successful registration
    // Optionally, you can show a success message or toast here 
    // e.g., toast.success("Registration successful! Please log in.");  
  };

  return (
    <AuthForm
      title="Create Your Account"
      submitLabel="Register"
      onSubmit={handleRegister}
    />
  );
}
