"use client"
import { useState } from "react";
import LoadingSpinner from "@/ui/LoadingSpinner";
import Button from "@/ui/Button";
import Input from "@/ui/Input";

import { MdOutlineMailOutline, MdOutlineLock } from "react-icons/md";
import { BiSolidMessageSquareError } from "react-icons/bi";
import { BsFillInfoSquareFill } from "react-icons/bs";

import api from "@/utils/api";

type FormDataType = {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    confirm_password: string;
};

const initialFormData: FormDataType = {
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirm_password: "",
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { first_name, last_name, username, email, password, confirm_password } = formData;

        if (password !== confirm_password) {
            return displayMessage(true, "Passwords do not match");
        }

        setStatus((prev) => ({ ...prev, isLoading: true }));

        try {
            const response = await api.post("/auth/register", {
                firstName: first_name,
                lastName: last_name,
                username : username,
                email : email,
                password : password,
                passwordConfirmation: confirm_password,
            });

            displayMessage(false, response?.data?.message);
            setFormData(initialFormData);
            window.location.href = "/login";
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.response?.data[0]?.message || "An error occurred";
            displayMessage(true, errorMessage);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            {status.message && (
                <div className={`w-full p-2.5 rounded-sm flex items-center gap-2 ${status.isError ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {status.isError ? <BiSolidMessageSquareError className="w-6 h-6" /> : <BsFillInfoSquareFill className="w-5 h-5" />}
                    <span className="text-sm font-medium">{status.message}</span>
                </div>
            )}
            <Input type="text" name="first_name" value={formData.first_name} onChange={handleChange} autoFocus required />
            <Input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
            <Input type="text" name="username" value={formData.username} onChange={handleChange} />
            <Input type="email"name="email" value={formData.email} onChange={handleChange} icon={<MdOutlineMailOutline className="w-5 h-5" />} required/>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} icon={<MdOutlineLock className="w-5 h-5" />} required />
            <Input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} icon={<MdOutlineLock className="w-5 h-5" />} required/>
            <Button className="w-full flex justify-center items-center bg-gray-800 hover:bg-gray-700 text-white">
                {status.isLoading ? <LoadingSpinner />  : "Register"}
            </Button>
        </form>
    );
}