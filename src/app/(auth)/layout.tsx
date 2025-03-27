"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    const pathname = usePathname();

    const getLinkPath = () => (pathname === "/register" ? "/login" : "/register");
    const getLinkText = () => (
        pathname === "/register" 
            ? (
                <>
                    Already have an account?{" "}
                    <span className="text-gray-800 font-semibold hover:underline hover:underline-offset-4 duration-200">Login</span>
                </>
            ) 
            : (
                <>
                    Don&apos;t have an account?{" "}
                    <span className="text-gray-800 font-semibold hover:underline hover:underline-offset-4 duration-200">Register</span>
                </>
            )
    );

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4 p-4">
            <div className="w-full max-w-sm p-4 shadow-sm border border-gray-50 rounded-sm">
                {children}
            </div>
            <Link href={getLinkPath()}>
                <span className="text-sm text-gray-600">
                    {getLinkText()}
                </span>
            </Link>
        </div>
    );
}