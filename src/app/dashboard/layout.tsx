"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { FaRegMessage, FaWallet, FaDiagramProject, FaBlogger, FaUsers, FaRegBell } from "react-icons/fa6";
import { MdOutlineSettings } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { GiTigerHead } from "react-icons/gi";
import { IoMdExit } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FiHome } from "react-icons/fi";

import api from "@/utils/api";
import { removeCookieAuthenticated } from "@/utils/cookie-authenticated";
import { decodeStorageAuthenticated, removeStorageAuthenticated } from "@/utils/secure-storage-authenticated";

// Components
import ProfileSectionSidebar from "@/components/ProfileSectionSidebar";
import SidebarLink from "@/components/SidebarLink";
import NavButton from "@/components/NavButton";

// Constants for navigation items
const NAV_ITEMS = [
    { path: "/dashboard", icon: FiHome, label: "Home" },
    { path: "/messages", icon: FaRegMessage, label: "Messages" },
    { path: "/menu", icon: RxDashboard, label: "Menu" },
    { path: "/wallet", icon: FaWallet, label: "Wallet" },
    { path: "/settings", icon: MdOutlineSettings, label: "Settings" },
];

// Main layout component
export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    const [role, setRole] = useState<string>("");

    const getDecodedStorageAuthenticated = async () => {
        const storageAuthenticated = await decodeStorageAuthenticated();
        setRole(storageAuthenticated.role);
    };

    const handleLogout = async () => {
        try {
            await api.get("/auth/logout");
            await removeCookieAuthenticated();
            await removeStorageAuthenticated();
            window.location.href = "/login";
        } catch (error: any) {
            console.error(error?.response?.data?.message);
        }
    };

    useEffect(() => {
        getDecodedStorageAuthenticated();
    }, []);

    return (
        <div className="select-none">
            {/* Top Navigation */}
            <nav className="w-full p-4 fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-white">
                <div className="flex items-center gap-2.5">
                    <GiTigerHead className="w-7 h-7" />
                    <h1 className="text-lg font-bold hidden md:block">ZERO PANEL</h1>
                </div>
                <div className="flex items-center gap-2.5">
                    {/* Notification Button */}
                    <button className="p-1.5 border border-gray-300 rounded-sm flex items-center gap-1.5 hover:cursor-pointer">
                        <FaRegBell className="w-4 h-4" />
                        <span className="text-sm font-semibold">0</span>
                    </button>
                    {/* Avatar Button */}
                    <Link href={"/dashboard/account"}>
                        <button className="p-2 border border-gray-300 rounded-sm flex items-center gap-1.5 hover:cursor-pointer">
                            <FaUser className="w-4 h-4" />
                        </button>
                    </Link>
                    {/* Mobile Logout Button */}
                    <button onClick={handleLogout} className="lg:hidden p-2 border border-gray-300 rounded-sm flex items-center gap-1.5 hover:cursor-pointer">
                        <IoMdExit className="w-4 h-4" />
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="w-full min-h-screen px-4 flex items-center gap-4 bg-gray-100">
                {/* Sidebar */}
                <aside className="hidden lg:flex flex-col justify-around gap-4 h-[84vh] w-full max-w-xs p-4 rounded-sm bg-white">
                    <ProfileSectionSidebar />
                    {/* Sidebar Links */}
                    <div className="w-full flex flex-col gap-4">
                        <SidebarLink href="/dashboard" icon={FiHome} label="Home" isActive={pathname === "/dashboard"} />
                        <SidebarLink href="/portfolio" icon={FaDiagramProject} label="Portfolio" isActive={pathname === "/portfolio"} />
                        <SidebarLink href="/blogs" icon={FaBlogger} label="Blogs" isActive={pathname === "/blogs"} />
                        <SidebarLink href="/wallet" icon={FaWallet} label="Wallet" isActive={pathname === "/wallet"} />
                        <SidebarLink href="/messages" icon={FaRegMessage} label="Messages" badge="0" isActive={pathname === "/messages"} />
                        {role === "admin" && (
                            <SidebarLink href="/dashboard/users" icon={FaUsers} label="User Management" isActive={pathname === "/dashboard/users"} />
                        )}
                        <SidebarLink href="/settings" icon={MdOutlineSettings} label="Setting" isActive={pathname === "/settings"} />
                    </div>
                    {/* Logout Button */}
                    <button onClick={handleLogout} className="w-full flex items-center gap-4 p-1.5 py-2.5 rounded-sm hover:bg-rose-500 hover:text-white duration-200">
                        <IoMdExit className="w-6 h-6" />
                        <span className="text-sm font-semibold">Logout</span>
                    </button>
                </aside>
                {/* Main Content Area */}
                <div className="h-[84vh] w-full p-2.5 flex flex-col gap-4">{children}</div>
            </div>

            {/* Bottom Navigation */}
            <nav className="lg:hidden w-full max-w-md mx-auto p-4 fixed bottom-0 left-0 right-0 z-10">
                <div className="w-full h-16 rounded-sm shadow-sm flex justify-around items-center border border-gray-100 bg-white">
                    {NAV_ITEMS.map(({ path, icon, label }) => (
                        <NavButton key={path} icon={icon} label={label} isActive={pathname === path} />
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <footer className="hidden lg:block w-full h-14 p-4 fixed bottom-0 left-0 right-0 z-10 text-center bg-white">
                <span className="font-semibold">© 2025 ZERO PANEL</span>
            </footer>
        </div>
    );
}