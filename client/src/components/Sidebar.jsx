import SideLinks from "./SideLinks"

const Sidebar = () => {
    return (
        <div className="w-[18vw] bg-[#22252e] overflow-hidden">
            <div className="flex flex-col 2xl:flex-row items-center justify-between mb-10 xl:p-8 p-6">
                <img src="/404 Found Logo.jpeg" alt="Logo" className="w-16 h-16 rounded-lg"/>
                <span className="font-mono -tracking-widest font-light text-lg 2xl:text-[40px] text-white">Insightly</span>
            </div>

            <SideLinks />


        </div>
    )
}

export default Sidebar