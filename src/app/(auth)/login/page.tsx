"use client"
import { useState } from "react";

import LoadingSpinner from "@/ui/LoadingSpinner";
import Button from "@/ui/Button";
import Input from "@/ui/Input"

import { BiSolidMessageSquareError } from "react-icons/bi";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { MdOutlineLock } from "react-icons/md";

import api from "@/utils/api";
import { setCookieAuthenticated } from "@/utils/cookie-authenticated";
import { setStorageAuthenticated } from "@/utils/secure-storage-authenticated";

type FormDataType = {
    credential: string;
    password_credential: string;
};

const initialFormData: FormDataType = {
    credential: "",
    password_credential: "",
};

export default function Page() {
    const [formData, setFormData] = useState(initialFormData);
    const [status, setStatus] = useState({ isError: false, isLoading: false, message: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const displayMessage = (isError: boolean, message: string) => {
        setStatus({ isError, isLoading: false, message });
        setTimeout(() => setStatus({ isError: false, isLoading: false, message: "" }), 3000);
    };

    const loginWithEmail = async (email: string, password: string) => {
        const response = await api.post("/auth/login", { email, password });
        await setCookieAuthenticated(true);
        await setStorageAuthenticated(response?.data?.data);
        return response?.data?.message;
    };

    const loginWithUsername = async (username: string, password: string) => {
        const response = await api.post("/auth/login", { username, password });
        await setCookieAuthenticated(true);
        await setStorageAuthenticated(response?.data?.data);
        return response?.data?.message;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus((prev) => ({ ...prev, isLoading: true }));

        try {
            const { credential, password_credential } = formData;
            const isEmail = credential.includes("@");
            const message = isEmail
                ? await loginWithEmail(credential, password_credential)
                : await loginWithUsername(credential, password_credential);

            displayMessage(false, message);
            setFormData(initialFormData);
            window.location.href = "/dashboard";
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                {status.message && (
                    <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                        {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                        <span className="text-sm font-medium">{status.message}</span>
                    </div>
                )}
                <Input type="text" name="credential" value={formData.credential} onChange={handleChange} icon={<MdOutlineMailOutline className="w-6 h-6" />} required />
                <Input type="password" name="password_credential" value={formData.password_credential} onChange={handleChange} icon={<MdOutlineLock className="w-6 h-6" />} required />
                <Button className="w-full flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-white">
                    {status.isLoading ? <LoadingSpinner /> : "Login"}
                </Button>
            </form>
        </>
    );
}