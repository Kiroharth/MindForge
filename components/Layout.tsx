'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, PlusCircle, History, Settings, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const SidebarItem = ({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active: boolean }) => (
    <Link
        href={href}
        className={clsx(
            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
            active
                ? "bg-blue-600/10 text-blue-400"
                : "text-gray-400 hover:bg-white/5 hover:text-white"
        )}
    >
        <Icon size={20} className={clsx("transition-colors", active ? "text-blue-400" : "group-hover:text-white")} />
        <span className="font-medium">{label}</span>
    </Link>
);

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    return (
        <div className="min-h-screen flex bg-[#0a0a0a] text-white selection:bg-blue-500/30">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-64 border-r border-white/10 bg-[#0a0a0a] p-6 fixed h-full z-20">
                <div className="mb-10 px-2">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                        MindForge
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem href="/" icon={LayoutDashboard} label="Dashboard" active={pathname === '/'} />
                    <SidebarItem href="/import" icon={PlusCircle} label="Import Quiz" active={pathname === '/import'} />
                    <SidebarItem href="/history" icon={History} label="History" active={pathname === '/history'} />
                </nav>

                <div className="pt-6 border-t border-white/10">
                    {/* Placeholder for future settings or user profile */}
                    <div className="px-4 py-2 text-xs text-gray-500">v1.0.0</div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 z-30 px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    MindForge
                </h1>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-400 hover:text-white">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 top-16 bg-[#0a0a0a] z-20 p-4 md:hidden"
                    >
                        <nav className="space-y-2">
                            <SidebarItem href="/" icon={LayoutDashboard} label="Dashboard" active={pathname === '/'} />
                            <SidebarItem href="/import" icon={PlusCircle} label="Import Quiz" active={pathname === '/import'} />
                            <SidebarItem href="/history" icon={History} label="History" active={pathname === '/history'} />
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-20 md:pt-8 max-w-7xl mx-auto w-full">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
