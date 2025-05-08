import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const { pathname } = useLocation();

    const navItemClass = (path: string) =>
        `px-4 py-2 rounded transition ${
            pathname === path
                ? "bg-[#9941FF] text-white rounded-full font-semibold"
                : "text-gray-700 hover:bg-gray-200 hover:text-gray-900 hover:rounded-full rounded-full font-semibold"
        }`;

    return (
        <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-[#9941FF]">
                📘 Be Productive
            </h1>
            <div className="flex gap-4">
                <Link to="/" className={navItemClass("/")}>
                    Study Timer
                </Link>
                <Link to="/expenses" className={navItemClass("/expenses")}>
                    Expense Tracker
                </Link>
            </div>
        </nav>
    );
}
