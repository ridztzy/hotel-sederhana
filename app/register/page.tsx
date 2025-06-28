"use client";

import { AuthProvider } from '@/lib/auth-context';
import RegisterPage from '@/components/pages/register-page';

export default function Register() {
  return (
    <AuthProvider>
      <RegisterPage />
    </AuthProvider>
  );
}