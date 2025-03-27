import Image from "next/image";
import { FaUsers, FaLocationDot } from "react-icons/fa6";
import AvatarImage from "../../public/images/avatar.svg";

export default function ProfileSectionSidebar() {
    return (
        <div className="w-full h-[280px] p-1.5 flex flex-col items-center justify-center gap-4">
        <div className="w-[150px] h-[150px] p-1.5 border-4 border-gray-200 rounded-full flex justify-center items-center overflow-hidden bg-white">
            <Image src={`${AvatarImage.src}`} alt="avatar" width={100} height={100} className="w-full h-full rounded-full" />
        </div>
        <div className="text-center">
            <h1 className="text-2xl font-semibold capitalize">exel doe</h1>
            <h2 className="text-md font-medium capitalize">Developer</h2>
        </div>
        <div className="flex items-center gap-4">
            <button className="py-1.5 px-4 flex items-center gap-1.5 border rounded-sm border-gray-300">
                <FaUsers className="w-5 h-5" />
                <span>0</span>
            </button>
            <button className="py-1.5 px-4 flex items-center gap-1.5 border rounded-sm border-gray-300">
                <FaLocationDot className="w-5 h-5" />
                <span>Indonesia</span>
            </button>
        </div>
    </div>
    )
}