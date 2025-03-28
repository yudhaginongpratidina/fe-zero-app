import { useState, useEffect } from "react";
import { decodeStorageAuthenticated } from "@/utils/secure-storage-authenticated";

export default function Protected({ role, children }: { role: string, children: React.ReactNode }) {
    const [authenticatedRole, setAuthenticatedRole] = useState<string | null>(null);

    useEffect(() => {
        const fetchAuthenticatedRole = async () => {
            const storageAuthenticated = await decodeStorageAuthenticated();
            setAuthenticatedRole(storageAuthenticated.role);
        };
        fetchAuthenticatedRole();
    }, []);

    return (
        <>
            {authenticatedRole === role ? <>{children}</> : (
                <div className="w-full p-4 max-h-[84vh] flex flex-col items-center justify-center gap-4 bg-white text-center">
                    <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
                    <p className="text-gray-600">You are not allowed to access this page.</p>
                </div>
            )}
        </>
    );
}