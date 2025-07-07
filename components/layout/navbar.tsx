"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Hotel, 
  User, 
  Calendar,
  LogOut,
  Settings,
  Home,
  Bed,
  Bookmark,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Beranda", icon: Home, show: true },
    { href: "/rooms", label: "Kamar", icon: Bed, show: true },
    { href: "/bookings", label: "Pemesanan Saya", icon: Bookmark, show: isAuthenticated && !isAdmin },
    { href: "/dashboard", label: "Dasbor", icon: LayoutDashboard, show: isAdmin },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-1.5 rounded-lg bg-gradient-to-r from-amber-600 to-amber-400 group-hover:opacity-90 transition-opacity">
              <Hotel className="h-5 w-5 text-amber-100" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
              LuxeStay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              link.show && (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center text-sm font-medium text-foreground/80 hover:text-amber-600 transition-colors group"
                >
                  <link.icon className="h-4 w-4 mr-2 opacity-70 group-hover:opacity-100" />
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full w-9 h-9"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User menu or auth buttons */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="relative h-9 w-9 rounded-full p-0 hover:bg-muted/50"
                  >
                    <span className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary font-medium border border-muted">
                      {user?.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  className="w-56 rounded-lg shadow-lg border" 
                  align="end" 
                  forceMount
                >
                  <div className="flex items-center justify-start gap-3 p-3">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary font-medium">
                      {user?.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                    <div className="flex flex-col space-y-0.5 leading-none">
                      <p className="font-medium text-sm">{user?.name}</p>
                      <p className="w-[180px] truncate text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-muted" />
                  {navLinks
                    .filter(link => link.show && link.href !== "/")
                    .map((link) => (
                      <DropdownMenuItem key={link.href} asChild className="hover:bg-muted/50">
                        <Link href={link.href} className="text-sm">
                          <link.icon className="mr-2 h-4 w-4 opacity-70" />
                          {link.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  <DropdownMenuSeparator className="bg-muted" />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-sm hover:bg-muted/50 text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Masuk</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/register">Daftar</Link>
                </Button>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full w-9 h-9"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden animate-in fade-in slide-in-from-top-2">
            <div className="px-2 pt-2 pb-4 space-y-2 border-t mt-1">
              {navLinks.map((link) => (
                link.show && (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      "hover:bg-muted/50 hover:text-primary"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <link.icon className="h-4 w-4 mr-3 opacity-70" />
                    {link.label}
                  </Link>
                )
              ))}
              
              {!isAuthenticated ? (
                <div className="flex flex-col space-y-2 px-1 pt-2">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                      Masuk
                    </Link>
                  </Button>
                  <Button size="sm" asChild className="w-full">
                    <Link href="/register" onClick={() => setIsMenuOpen(false)}>
                      Daftar
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="px-1 pt-2 border-t">
                  <div className="flex items-center gap-3 px-3 py-3 mb-1 rounded-md bg-muted/30">
                    <div className="flex items-center justify-center h-9 w-9 rounded-full bg-gradient-to-r from-primary/10 to-blue-600/10 text-primary font-medium">
                      {user?.name?.[0]?.toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user?.name}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Keluar
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}