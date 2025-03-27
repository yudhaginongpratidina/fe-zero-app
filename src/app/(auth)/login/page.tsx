"use client"
import { useState } from "react";
import Input from "@/ui/Input"
import Button from "@/ui/Button";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";

export default function Page() {
    const [formData, setFormData] = useState<{ email: string; password: string }>({
        email: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<MdOutlineMailOutline className="w-6 h-6" />}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<MdOutlineLock className="w-6 h-6" />}
                    required
                />
                <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                    Login
                </Button>
            </form>
        </>
    )
}