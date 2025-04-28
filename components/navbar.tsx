'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus, User, LogOut, Settings, Bell } from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function UserNav() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarFallback className="bg-brand-blue text-white">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="ml-2 h-4 w-4" />
          <span>الملف الشخصي</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Bell className="ml-2 h-4 w-4" />
          <span>الإشعارات</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="ml-2 h-4 w-4" />
          <span>الإعدادات</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-600" onClick={logout}>
          <LogOut className="ml-2 h-4 w-4" />
          <span>تسجيل الخروج</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export function Navbar() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <nav className="w-full bg-brand-dark-blue text-white py-3" style={{ backgroundColor: 'hsl(220, 40%, 20%)' }}>
        <div className="container mx-auto h-12"></div>
      </nav>
    )
  }

  return (
    <nav className="w-full bg-brand-dark-blue text-white py-3" style={{ backgroundColor: 'hsl(220, 40%, 20%)' }}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-xl font-bold">
            مزادي
          </Link>
          <div className="relative hidden md:block w-80">
            <Input
              className="pr-10 border-0 text-white placeholder:text-gray-300"
              placeholder="البحث..."
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
            />
            <Search className="absolute top-1/2 right-3 transform -translate-y-1/2 h-4 w-4 text-gray-300" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {mounted && (
            <>
              {useAuth().isAuthenticated ? (
                <UserNav />
              ) : (
                <>
                  <Button
                    variant="outline"
                    className="text-white"
                    style={{ backgroundColor: 'hsl(214, 100%, 50%)', borderColor: 'hsl(214, 100%, 50%)' }}
                    onClick={() => window.location.href = '/auth/login'}
                  >
                    تسجيل الدخول
                  </Button>
                  <Button
                    variant="outline"
                    className="text-white"
                    style={{ backgroundColor: 'rgb(22, 163, 74)', borderColor: 'rgb(22, 163, 74)' }}
                    onClick={() => window.location.href = '/auth/register'}
                  >
                    مستخدم جديد
                  </Button>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <div className="container mx-auto mt-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-6 text-sm">
            <Link
              href="/"
              className="pb-1"
              style={{ borderBottom: '2px solid hsl(142, 76%, 47%)' }}
            >
              الصفحة الرئيسية
            </Link>
            <Link
              href="/auctions"
              className="hover:text-primary"
              style={{ ':hover': { color: 'hsl(142, 76%, 47%)' } }}
            >
              المزادات
            </Link>
            <Link
              href="/categories"
              className="hover:text-primary"
              style={{ ':hover': { color: 'hsl(142, 76%, 47%)' } }}
            >
              الفئات
            </Link>
            <Link
              href="/watchlist"
              className="hover:text-primary"
              style={{ ':hover': { color: 'hsl(142, 76%, 47%)' } }}
            >
              المفضلة
            </Link>
            <Link
              href="/create-listing"
              className="flex items-center gap-1 hover:text-primary"
              style={{ ':hover': { color: 'hsl(142, 76%, 47%)' } }}
            >
              <Plus className="h-4 w-4" />
              إضافة مزاد
            </Link>
            <Link
              href="/about"
              className="hover:text-primary"
              style={{ ':hover': { color: 'hsl(142, 76%, 47%)' } }}
            >
              تعريف بالموقع
            </Link>
          </div>
          <div className="md:hidden">
            <Search className="h-5 w-5" />
          </div>
        </div>
      </div>
    </nav>
  )
}

