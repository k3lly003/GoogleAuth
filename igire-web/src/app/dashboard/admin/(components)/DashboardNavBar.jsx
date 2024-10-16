'use client';

import React from 'react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { Dialog, DialogClose } from '@/components/ui/dialog'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { GoHome } from "react-icons/go";
import { HiOutlineUsers } from "react-icons/hi";
import { LiaTagsSolid } from "react-icons/lia";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { RiLogoutCircleLine } from "react-icons/ri";
import Image from 'next/image'
import { usePathname } from 'next/navigation';

export default function DashboardNavBar({ children }) {

    const pathname = usePathname();
    const getPageTitle = () => {
        switch (pathname) {
            case '/dashboard/admin/users':
                return 'Users';
            case '/dashboard/admin/transactions':
                return 'Transactions';
            case '/dashboard/admin/transactions/compareWithStock':
                return 'Compare';
            case '/dashboard/admin/stock':
                return 'Stock';
            default:
                return 'CEO Dashboard';
        }
    };

    return (
        <div className="flex flex-col">
            <header className="sticky top-0 flex h-14 desktop:h-[55px] items-center gap-4 bg-slate-100 px-6 py-[2.5rem]">
                <Sheet>
                    <SheetTrigger className="min-[1024px]:hidden p-2 transition">
                        <HamburgerMenuIcon />
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <Link href="/">
                                <SheetTitle>Dashboard</SheetTitle>
                            </Link>
                        </SheetHeader>
                        <div className="flex-col items-start space-y-3 mt-[50px] bg-white">
                            <DialogClose asChild>
                                <Link href="/dashboard">
                                    <Button variant="outline" className="w-full flex justify-start pl-4 gap-3">
                                        <GoHome className="h-3 w-3" />
                                        Home
                                    </Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/dashboard/users">
                                    <Button variant="outline" className="w-full flex justify-start pl-4 gap-3">
                                        <HiOutlineUsers className="h-3 w-3" />
                                        Manage Users
                                    </Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/dashboard/transactions">
                                    <Button variant="outline" className="w-full flex justify-start pl-4 gap-3">
                                        <LiaTagsSolid className="h-3 w-3" />
                                        Transactions
                                    </Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/dashboard/stock">
                                    <Button variant="outline" className="w-full flex justify-start pl-4 gap-3">
                                        <HiOutlineArchiveBox className="h-3 w-3" />
                                        Stock
                                    </Button>
                                </Link>
                            </DialogClose>
                            <DialogClose asChild>
                                <Link href="/dashboard/logout">
                                    <Button variant="outline" className="w-full flex justify-start pl-4 gap-3">
                                        <RiLogoutCircleLine className="h-3 w-3" />
                                        Logout
                                    </Button>
                                </Link>
                            </DialogClose>
                        </div>
                    </SheetContent>
                </Sheet>

                <div className="flex-1 px-6">
                    <Link href="/dashboard" className="flex items-center justify-between">
                        <span className="text-lg font-semibold">{getPageTitle()}</span>
                        <span><img src="/userAvatar.png" alt="User Avatar" className="w-8 h-8 rounded-full mb-2" /></span>
                    </Link>
                </div>

                <nav className="hidden items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost">Home</Button>
                    </Link>
                    <Link href="/dashboard/users">
                        <Button variant="ghost">Manage Users</Button>
                    </Link>
                    <Link href="/dashboard/transaction">
                        <Button variant="ghost">Transaction</Button>
                    </Link>
                    <Link href="/dashboard/stock">
                        <Button variant="ghost">Stock</Button>
                    </Link>
                    <Link href="/dashboard/logout">
                        <Button variant="ghost">Logout</Button>
                    </Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
    )
}
