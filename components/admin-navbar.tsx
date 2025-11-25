'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminNavbarProps {
  title?: string;
  subtitle?: string;
}

export default function AdminNavbar({ title = "Admin Dashboard", subtitle }: AdminNavbarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = '/admin';
  };

  const navItems = [
    { href: '/admin/plans', label: 'Plans' },
    { href: '/admin/reviews', label: 'Reviews' },
    { href: '/admin/blogs', label: 'Blogs' },
    { href: '/admin/messages', label: 'Messages' },
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/about', label: 'About' },
    { href: '/admin/social-media', label: 'Social' },
    { href: '/admin/comparisons', label: 'Comparisons' }
  ];

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center py-4 lg:py-6 gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{title}</h1>
            {subtitle && <p className="text-gray-600 text-sm lg:text-base">{subtitle}</p>}
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end gap-1 sm:gap-2 lg:gap-4 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base rounded-lg font-medium border transition-colors ${
                  pathname === item.href
                    ? 'bg-[#D7263D] text-white hover:bg-[#B91C3C] border-[#D7263D]'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border-gray-200'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Button 
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 lg:gap-2 px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm lg:px-4 lg:text-base"
            >
              <LogOut className="w-3 h-3 lg:w-4 lg:h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}