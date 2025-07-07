"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/lib/auth-context';
import { Hotel, Eye, EyeOff, Mail, Lock, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [goldParticles, setGoldParticles] = useState<{id: number, x: number, y: number, size: number}[]>([]);
  const { login, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Create animated gold particles
  useEffect(() => {
    const particles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
    }));
    setGoldParticles(particles);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Kesalahan",
        description: "Silakan isi semua kolom",
        variant: "destructive",
      });
      return;
    }

    const success = await login(email, password);
    
    if (success) {
      toast({
        title: "Berhasil",
        description: "Selamat datang kembali!",
      });
      router.push('/');
    } else {
      toast({
        title: "Kesalahan",
        description: "Email atau kata sandi salah",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0c0a09] via-[#1e1b18] to-[#0c0a09] px-4 overflow-hidden relative">
      {/* Animated Gold Particles Background */}
      <AnimatePresence>
        {goldParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-gradient-to-r from-[#FFD700] to-[#D4AF37]"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.7, 0],
              y: [0, -20],
              x: [0, (Math.random() * 20) - 10]
            }}
            transition={{ 
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </AnimatePresence>

      {/* Glowing Gold Orb */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-[#FFD700] to-[#D4AF37] opacity-10 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      <motion.div
        className="w-full max-w-md z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div 
          className="text-center mb-8"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Hotel className="h-8 w-8 text-[#FFD700]" />
            </motion.div>
            <motion.span 
              className="text-2xl font-bold bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity 
              }}
            >
              LuxeStay
            </motion.span>
          </Link>
          <motion.h1 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              textShadow: [
                "0 0 5px rgba(212, 175, 55, 0)",
                "0 0 10px rgba(212, 175, 55, 0.5)",
                "0 0 5px rgba(212, 175, 55, 0)"
              ]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity
            }}
          >
            Selamat Datang Kembali
          </motion.h1>
          <motion.p 
            className="text-muted-foreground"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Masuk ke akun Anda untuk melanjutkan
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 300,
            damping: 20
          }}
        >
          <Card className="bg-[#1a1714] border border-[#3d3525] relative overflow-hidden">
            {/* Animated Card Border */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] opacity-20"
              animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
              transition={{ duration: 5, repeat: Infinity }}
            />
            
            {/* Gold Shimmer Effect */}
            <motion.div
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"
              animate={{ left: ['-100%', '100%', '-100%'] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="text-[#D4AF37]" />
                </motion.span>
                Masuk
              </CardTitle>
              <CardDescription className="text-[#c4b998]">
                Masukkan email dan kata sandi untuk mengakses akun Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div 
                  className="space-y-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="email" className="text-[#c4b998]">Email</Label>
                  <div className="relative">
                    <motion.div 
                      animate={{ color: ["#a0a0a0", "#FFD700", "#a0a0a0"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Mail className="absolute left-3 top-3 h-4 w-4" />
                    </motion.div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email Anda"
                      className="pl-10 bg-[#14110d] border border-[#3d3525] text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      disabled={loading}
                    />
                  </div>
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  whileHover={{ y: -3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Label htmlFor="password" className="text-[#c4b998]">Kata Sandi</Label>
                  <div className="relative">
                    <motion.div 
                      animate={{ color: ["#a0a0a0", "#FFD700", "#a0a0a0"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Lock className="absolute left-3 top-3 h-4 w-4" />
                    </motion.div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Masukkan kata sandi Anda"
                      className="pl-10 pr-10 bg-[#14110d] border border-[#3d3525] text-white focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                      disabled={loading}
                    />
                    <motion.button
                      type="button"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {showPassword ? (
                        <motion.div
                          animate={{ color: ["#a0a0a0", "#FFD700", "#a0a0a0"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <EyeOff className="h-4 w-4" />
                        </motion.div>
                      ) : (
                        <motion.div
                          animate={{ color: ["#a0a0a0", "#FFD700", "#a0a0a0"] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Eye className="h-4 w-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] text-black font-bold hover:from-[#D4AF37] hover:to-[#FFD700] relative overflow-hidden"
                    disabled={loading}
                  >
                    <motion.span
                      animate={{ 
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] 
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity 
                      }}
                      className="relative z-10"
                    >
                      {loading ? "Sedang masuk..." : "Masuk"}
                    </motion.span>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#D4AF37] to-[#FFD700] opacity-70"
                      animate={{ 
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        opacity: [0.3, 0.7, 0.3]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity 
                      }}
                    />
                  </Button>
                </motion.div>
              </form>

              <div className="mt-6 text-center text-sm">
                <p className="text-[#c4b998]">
                  Belum punya akun?{' '}
                  <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="/register" className="text-[#FFD700] hover:underline font-medium">
                      Daftar
                    </Link>
                  </motion.span>
                </p>
              </div>

              {/* Demo accounts info */}
              <motion.div 
                className="mt-6 p-4 bg-[#14110d]/80 rounded-lg border border-[#3d3525]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-sm font-medium mb-2 text-[#FFD700]">Akun Demo:</p>
                <div className="text-xs space-y-1 text-[#c4b998]">
                  <p><strong>Pelanggan:</strong> john.smith@email.com / password</p>
                  <p><strong>Admin:</strong> admin@luxestay.com / admin123</p>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}