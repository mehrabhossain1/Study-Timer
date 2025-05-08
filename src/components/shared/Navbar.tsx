import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const { pathname } = useLocation();

    const navItemClass = (path: string) =>
        `px-4 py-2 rounded transition ${
            pathname === path
                ? "bg-blue-600 text-white"
                : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-700">📘 Focus Track</h1>
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
