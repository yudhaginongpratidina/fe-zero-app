"use client";
import { useState } from "react";

import Protected from "@/components/Protected";
import Input from "@/ui/Input";
import Button from "@/ui/Button";

import { IoSearch } from "react-icons/io5";
import { MdDelete, MdCancel } from "react-icons/md";
import { FaEdit, FaEye, FaSave } from "react-icons/fa";

// This is the main functional component for the user management page.
export default function Page() {
    // State to manage the title of the form (e.g., "create" or "edit").
    const [formTitle, setFormTitle] = useState<string>("");

    // State to toggle the visibility of the form.
    const [showForm, setShowForm] = useState<boolean>(false);

    // State to store the form data for user creation or editing.
    const [formData, setFormData] = useState({
        first_name: "",
        username: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    // Function to show the form and set its title.
    const handleShowForm = (title: string) => {
        setFormTitle(title);
        setShowForm(true);
    };

    // Function to hide the form.
    const handleHideForm = () => setShowForm(false);

    // Function to handle input changes and update the form data state.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Function to render the user form for creating or editing users.
    const renderForm = () => (
        <div
            className="absolute z-20 w-full h-full p-4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
            <div className="w-full max-w-screen-sm h-fit bg-white rounded-sm">
                <div className="w-full p-4">
                    {/* Display the form title dynamically based on the action */}
                    <h1 className="text-2xl font-semibold capitalize">form {formTitle} user</h1>
                    <p>This is form user</p>
                    <hr className="text-gray-300" />
                </div>
                <div className="w-full p-4">
                    {/* Form for user input */}
                    <form className="w-full flex flex-col gap-4">
                        {/* Input fields for user details */}
                        <Input type="text" name="first_name" value={formData.first_name} onChange={handleChange} autoFocus required />
                        <Input type="text" name="username" value={formData.username} onChange={handleChange} />
                        <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
                        <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
                        <Input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />
                        <div className="w-full flex justify-start items-center gap-2.5">
                            {/* Save button */}
                            <Button className="flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">
                                <FaSave className="w-5 h-5" />
                                <span className="text-md font-semibold">Save</span>
                            </Button>
                            {/* Cancel button */}
                            <Button onClick={handleHideForm} className="flex items-center py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white">
                                <MdCancel className="w-5 h-5" />
                                <span className="text-md font-semibold">Cancel</span>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    // Function to render table rows dynamically for user data.
    const renderTableRow = () => (
        <>
            {[...Array(10)].map((_, index) => (
                <tr key={index} className="w-full">
                    {/* User code column */}
                    <td className="min-w-[80px] max-w-[80px] p-2 border border-gray-300 text-center uppercase">{`U${String(index + 1).padStart(4, "0")}`}</td>
                    {/* User name and email column */}
                    <td className="min-w-[200px] p-2 border border-gray-300 text-start">
                        <div className="flex items-center gap-2">
                            {/* Placeholder for user avatar */}
                            <div className="w-[50px] h-[50px] rounded-full overflow-hidden bg-black" />
                            <div className="flex flex-col gap-0.5">
                                <h1 className="font-semibold capitalize">{`user ${index + 1}`}</h1>
                                <h2 className="font-medium">{`user${index + 1}@example.com`}</h2>
                            </div>
                        </div>
                    </td>
                    {/* User role column */}
                    <td className="min-w-[100px] max-w-[100px] p-2 border border-gray-300 text-center capitalize">admin</td>
                    {/* Action buttons column */}
                    <td className="w-fit p-2 border border-gray-300 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                            {/* View button */}
                            <button className="p-2 rounded-sm flex items-center gap-1.5 hover:cursor-pointer bg-blue-500 hover:bg-blue-600 text-white duration-200">
                                <FaEye className="w-4 h-4" />
                            </button>
                            {/* Edit button */}
                            <button onClick={() => handleShowForm("edit")} className="p-2 rounded-sm flex items-center gap-1.5 hover:cursor-pointer bg-orange-500 hover:bg-orange-600 text-white duration-200">
                                <FaEdit className="w-4 h-4" />
                            </button>
                            {/* Delete button */}
                            <button className="p-2 rounded-sm flex items-center gap-1.5 hover:cursor-pointer bg-rose-500 hover:bg-rose-600 text-white duration-200">
                                <MdDelete className="w-4 h-4" />
                            </button>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );

    // Main return block rendering the user management page.
    return (
        <>
            <Protected role={"admin"}>
                <div>
                    {/* Page title */}
                    <h1 className="text-2xl font-semibold capitalize">user management</h1>
                    <p>This is user management</p>
                </div>
                <div className="w-full p-4 max-h-[84vh] flex flex-col gap-4 bg-white">
                    {/* Search bar and create button */}
                    <div className="w-full flex justify-between items-center gap-4">
                        <div className="flex items-center gap-2">
                            <input type="search" className="w-fit p-1.5 border border-gray-300 rounded-sm outline-none" />
                            <button className="p-2 rounded-sm flex items-center gap-1.5 hover:cursor-pointer bg-black text-white">
                                <IoSearch className="w-5 h-5" />
                            </button>
                        </div>
                        <button onClick={() => handleShowForm("create")} className="py-1.5 px-4 flex items-center gap-1.5 rounded-sm capitalize hover:cursor-pointer bg-black text-white">
                            create
                        </button>
                    </div>

                    {/* Conditional rendering of the form */}
                    {showForm && renderForm()}

                    {/* User table */}
                    <div className="w-full h-[60vh] overflow-auto">
                        <table className="w-full">
                            <thead className="w-full sticky top-0 bg-black text-white z-10">
                                <tr className="w-full">
                                    <td className="min-w-[80px] max-w-[80px] p-2 border border-gray-300 text-center">Kode</td>
                                    <td className="w-full p-2 border border-gray-300 text-start">Name</td>
                                    <td className="min-w-[100px] max-w-[100px] p-2 border border-gray-300 text-center">Role</td>
                                    <td className="w-fit p-2 border border-gray-300 text-center">Action</td>
                                </tr>
                            </thead>
                            <tbody>{renderTableRow()}</tbody>
                        </table>
                    </div>
                    {/* Pagination buttons */}
                    <div className="w-full flex justify-start items-center">
                        <div className="flex items-center gap-2.5">
                            <button className="py-1.5 px-4 flex items-center gap-1.5 rounded-sm capitalize bg-black text-white">1</button>
                            <button className="py-1.5 px-4 flex items-center gap-1.5 rounded-sm capitalize border border-gray-300">2</button>
                        </div>
                    </div>
                </div>
            </Protected>
        </>
    );
}