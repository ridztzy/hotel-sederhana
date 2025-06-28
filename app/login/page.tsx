"use client";

import { AuthProvider } from '@/lib/auth-context';
import LoginPage from '@/components/pages/login-page';

export default function Login() {
  return (
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );
}