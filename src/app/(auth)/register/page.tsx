"use client"
import { useState } from "react";
import Input from "@/ui/Input"
import Button from "@/ui/Button";
import { MdOutlineMailOutline } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";

export default function Page() {
    const [formData, setFormData] = useState<{ first_name: string; last_name: string; email: string; password: string; confirm_password: string }>({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
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
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    autoFocus
                    required
                />
                <Input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    icon={<MdOutlineMailOutline className="w-5 h-5" />}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    icon={<MdOutlineLock className="w-5 h-5" />}
                    required
                />
                <Input
                    type="password"
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    icon={<MdOutlineLock className="w-5 h-5" />}
                    required
                />
                <Button className="w-full bg-gray-800 hover:bg-gray-700 text-white">
                    Register
                </Button>
            </form>
        </>
    )
}