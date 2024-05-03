import { NavLink } from "react-router-dom";

export const Navbar = () => {
    const navItems = [
        {
            herf: "/",
            herfName: "Queue",
            iconName: "home",
        },
        {
            herf: "/addSong",
            herfName: " Add song",
            iconName: "playlist_add",
        },
        {
            herf: "/info",
            herfName: "Info",
            iconName: "settings",
        },
    ];

    return (
        <nav className="sticky bottom-0 z-50 col-[1/4] w-full bg-neutral-950 p-4">
            <ul className="flex justify-center font-medium">
                {navItems.map((items, index) => (
                    <li key={index} className="w-32">
                        <NavLink
                            to={items.herf}
                            className={({ isActive, isPending }) =>
                                (isPending ? "pending" : isActive ? "active " : "") +
                                "text-neutral-400 flex flex-col items-center justify-center p-2 group"
                            }
                        >
                            <span className="w-6 h-6 group-hover:text-white material-symbols-outlined">
                                {items.iconName}
                            </span>
                            <span className="text-sm group-hover:text-white dark:group-hover:text-white">
                                {items.herfName}
                            </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
