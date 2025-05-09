import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Menu, X } from "lucide-react";
import toast from "react-hot-toast";

import { useAuthStore } from "../store/authStore";
import ThemeToggle from "./ThemeToggle";

export function Navbar() {
    const { user, logout } = useAuthStore();
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = async () => {        
        await logout();
        toast.success("Logged Out", {
            style: {
                background: "#1a1a2e",  
                color: "#e0e0ff",     
                border: "1px solid #7a00ff",  
                boxShadow: "0 0 10px #7a00ff",
            },
            iconTheme: {
                primary: "#7a00ff",
                secondary: "#1a1a2e",
            },
        });
        setTimeout(() => navigate("/"), 0);
    }
    const toggleMenu = () => setMenuOpen(!menuOpen);

    const isActive = (path) => location.pathname === path;

    
    return (
        <>
            
            <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 px-5 py-3 
                            dark:bg-black/45 dark:border-4 dark:border-purple-600/80 backdrop-blur-lg shadow-lg rounded-2xl 
                            flex items-center space-x-6 z-50 bg-white">
                
                
                <Link className="text-2xl font-bold dark:text-white" to="/">
                    WebForge
                </Link>

                
                <div className="hidden md:inline-flex flex justify-center space-x-4">
                    <Link
                        to="/popular"
                        className={`px-4 py-1 border rounded-full transition-colors ${
                            isActive("/popular")
                                ? "dark:bg-purple-600 text-white border-transparent bg-indigo-500" 
                                : "dark:text-gray-300 dark:border-indigo-500 dark:hover:bg-purple-600 hover:text-white dark:hover:border-transparent hover:bg-indigo-500"
                        }`}
                    >
                        Popular
                    </Link>
                    <Link
                        to="/topics"
                        className={`px-4 py-1 border rounded-full transition-colors ${
                            isActive("/topics")
                                ? "dark:bg-purple-600 text-white border-transparent bg-indigo-500" 
                                : "dark:text-gray-300 dark:border-indigo-500 dark:hover:bg-purple-600 hover:text-white dark:hover:border-transparent hover:bg-indigo-500"
                        }`}
                    >
                        Topics
                    </Link>
                    {user && (
                        <Link
                            to="/profile"
                            className={`px-4 py-1 border rounded-full transition-colors ${
                                isActive("/profile")
                                ? "dark:bg-purple-600 text-white border-transparent bg-indigo-500" 
                                : "dark:text-gray-300 dark:border-indigo-500 dark:hover:bg-purple-600 hover:text-white dark:hover:border-transparent hover:bg-indigo-500"
                            }`}
                        >
                            Profile
                        </Link>
                    )}
                </div>

                
                <div className="hidden md:inline-flex space-x-3">
                    {!user ? (
                        <>
                            <Link
                                to="/signup"
                                className={`px-4 py-1 rounded-full transition-colors cursor-pointer ${
                                    isActive("/signup")
                                        ? "bg-indigo-800 text-white"
                                        : "bg-indigo-500 text-white hover:bg-indigo-700"
                                }`}
                            >
                                Sign Up
                            </Link>
                            <Link
                                to="/login"
                                state={{from: location}}
                                className={`px-4 py-1 rounded-full transition-colors cursor-pointer ${
                                    isActive("/login")
                                        ? "bg-indigo-800 text-white"
                                        : "bg-indigo-500 text-white hover:bg-indigo-700"
                                }`}
                            >
                                Login
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-1 rounded-full bg-indigo-500 text-white hover:bg-indigo-700 transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    )}
                    <ThemeToggle />
                </div>
                
                <button onClick={toggleMenu} className="md:hidden dark:text-white focus:outline-none">
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            
            {menuOpen && (
                <div className="fixed top-22 left-1/2 transform -translate-x-1/2 max-w-xs bg-black/40 
                                backdrop-blur-lg shadow-md rounded-xl z-40 md:hidden">
                    <div className="flex flex-col space-y-2 p-4">
                        <Link
                            to="/popular"
                            className={`px-6 py-3 text-center rounded-full transition-colors ${
                                isActive("/popular")
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-300 hover:bg-black/50 hover:text-white"
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Popular
                        </Link>
                        <Link
                            to="/topics"
                            className={`px-6 py-3 text-center rounded-full transition-colors ${
                                isActive("/topics")
                                    ? "bg-purple-600 text-white"
                                    : "text-gray-300 hover:bg-black/50 hover:text-white"
                            }`}
                            onClick={() => setMenuOpen(false)}
                        >
                            Topics
                        </Link>
                        {user && (
                            <Link
                                to="/profile"
                                className={`px-6 py-3 text-center rounded-full transition-colors ${
                                    isActive("/profile")
                                        ? "bg-purple-600 text-white"
                                        : "text-gray-300 hover:bg-black/50 hover:text-white"
                                }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                Profile
                            </Link>
                        )}
                        {!user ? (
                            <>
                                <Link
                                    to="/signup"
                                    className={`px-6 py-3 text-center rounded-full transition-colors ${
                                        isActive("/signup")
                                            ? "bg-purple-600 text-white"
                                            : "text-gray-300 hover:bg-black/50 hover:text-white"
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    to="/login"
                                    className={`px-6 py-3 text-center rounded-full transition-colors ${
                                        isActive("/login")
                                            ? "bg-purple-600 text-white"
                                            : "text-gray-300 hover:bg-black/50 hover:text-white"
                                    }`}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={() => {
                                    handleLogout();
                                    setMenuOpen(false);
                                }}
                                className="px-6 py-3 text-gray-300 hover:bg-black/50 hover:text-white transition-colors rounded-full text-center"
                            >
                                Logout
                            </button>
                        )}
                        <div className="pt-2 flex justify-center">
                            <ThemeToggle />  {/* 👈 Add this */}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
