import Input from "@/ui/Input"
import Button from "@/ui/Button"

export default function Page() {
    return (
        <>
            <div>
                {/* Page title */}
                <h1 className="text-2xl font-semibold capitalize">account</h1>
                <p>This is account page</p>
            </div>
            <div className="w-full h-[80vh] overflow-auto flex flex-col gap-4">
                <div className="w-full p-4 h-fit flex flex-col gap-4 bg-white">
                    <form action="" className="w-full flex flex-col gap-4">
                        {/* Input fields for user details */}
                        <div>
                            <h1 className="text-xl font-semibold">User Details</h1>
                            <p>This is user details</p>
                        </div>
                        <Input type="text" name="first_name" required />
                        <Input type="text" name="last_name" required />
                        <Input type="text" name="username" disabled required />
                        <Input type="email" name="email" disabled required />
                        <Button className="w-fit flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">Save</Button>
                    </form>
                </div>
                <div className="w-full p-4 h-fit flex flex-col gap-4 bg-white">
                    <form action="" className="w-full flex flex-col gap-4">
                        <div>
                            <h1 className="text-xl font-semibold">Change Password</h1>
                            <p>This is change password</p>
                        </div>
                        <Input type="password" name="password" required />
                        <Input type="password" name="confirm_password" required />
                        <Button className="w-fit flex items-center py-2.5 px-4 bg-gray-800 hover:bg-gray-700 text-white">Change Password</Button>
                    </form>
                </div>
                <div className="w-full p-4 h-fit flex flex-col gap-4 bg-white">
                    <div>
                        <h1 className="text-xl font-semibold">Delete Account</h1>
                        <p>This is delete account</p>
                    </div>
                    <div>
                        <Button className="flex items-center py-2.5 px-4 bg-red-500 hover:bg-red-600 text-white">Delete Account</Button>
                    </div>
                </div>
            </div>
        </>
    )
}