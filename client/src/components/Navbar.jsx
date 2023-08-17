import { Link } from "react-router-dom";

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
        <nav className="sticky bottom-0 z-50 col-[1/4] w-full bg-neutral-900 p-4">
            {/* <ul className="grid grid-cols-3 mx-auto max-w-lg font-medium"> */}
            <ul className="flex justify-center font-medium">
                {navItems.map((items, index) => (
                    <li key={index} className="w-32">
                        <Link
                            to={items.herf}
                            // hover:bg-neutral-950
                            className="flex flex-col items-center justify-center p-2 group"
                        >
                            <span className="w-6 h-6 text-gray-500 group-hover:text-white material-symbols-outlined">
                                {items.iconName}
                            </span>
                            <span className="text-sm text-gray-500 group-hover:text-white dark:group-hover:text-white">
                                {items.herfName}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
