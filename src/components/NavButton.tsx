export default function NavButton({ icon: Icon, label, isActive }: { icon: React.ElementType; label: string; isActive: boolean }) {
    return (
        <button className={`p-1.5 px-4 flex flex-col justify-center items-center gap-0.5 rounded-sm hover:bg-black hover:text-white duration-200 ${isActive ? "bg-black text-white" : ""}`}> 
            <Icon className="w-6 h-6" /> 
            <span className="text-xs font-semibold">{label}</span> 
        </button> 
    ); 
}