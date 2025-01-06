import { ChartNoAxesCombined, ContactRound, UsersRound, Mail } from "lucide-react"
import { HashLink } from "react-router-hash-link"

const SideLinks = () => {

    const links = [{
        name: "Home",
        link: '/',
        icon: <ChartNoAxesCombined className="text-white group-hover/link:text-secondary" size={'30'} />,
    }, {
        name: 'Dashboard',
        link: '/dashboard',
        icon: <ContactRound className="text-white group-hover/link:text-secondary" size={'30'} />,
    },
    {
        name: 'Team',
        link: '/#team',
        icon: <UsersRound className="text-white group-hover/link:text-secondary" size={'30'} />,
    },
    ]

    return (
        <div>
            <ul>
                {
                    links.map((item) => (
                        <li key={item} className="group px-4 mb-4 py-[auto] flex items-center justify-between overflow-hidden">
                            <div className="rounded-md bg-gradient-to-r w-[150px] 2xl:w-[290px] h-[50px] 2xl:h-[80px] from-transparent to-transparent group-hover:from-[white]/20 group-hover:to-transparent px-4 group-hover:px-6 py-3 2xl:py-5 flex justify-between text-lg 2xl:text-[26px] transition-all duration-300">
                                <HashLink smooth to={item.link} className="group/link flex justify-between">
                                    {item.icon}
                                    <div className="w-[80%] mx-3 2xl:mx-5">
                                        <span className="text-white font-light group-hover/link:text-secondary">{item.name}</span>
                                    </div>
                                </HashLink>
                            </div>
                            <div className="opacity-0 group-hover:opacity-80 w-1 2xl:w-2 h-[30px] 2xl:h-[60px] rounded-lg bg-secondary transition-all duration-300"></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SideLinks