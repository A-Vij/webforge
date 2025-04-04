import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Input from "../Components/Input";
import { useAuthStore } from "../store/authStore";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    const { login, error, isLoading } = useAuthStore();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            toast.success("Logged in Successfully", {
                style: {
                    background: "#1a1a2e",  // Dark background
                    color: "#e0e0ff",     // Light text
                    border: "1px solid #7a00ff",  // Purple border
                    boxShadow: "0 0 10px #7a00ff",
                },
                iconTheme: {
                    primary: "#7a00ff",
                    secondary: "#1a1a2e",
                },
            });
            navigate(location.state.from.pathname || "/", {replace: true});
        } catch (error) {
            console.log(error);
            toast.error(err.message || "Login failed!", {
                style: {
                    background: "#1a1a2e",
                    color: "#e0e0ff",
                    border: "1px solid red",
                    boxShadow: "0 0 10px red",
                },
                iconTheme: {
                    primary: "red",
                    secondary: "#1a1a2e",
                },
            });
        }
    };

    return (
    <div className="flex items-center justify-center min-h-screen">
        <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-md w-full bg-black/50 border border-purple-500/50 
                       rounded-2xl shadow-[0_0_10px_rgba(10,149,237,0.4)] overflow-hidden mt-22"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center 
                               bg-gradient-to-r from-purple-400 to-purple-600 
                               text-transparent bg-clip-text">
                    Welcome Back
                </h2>

                <form onSubmit={handleLogin}>
                    <Input 
                        icon={Mail}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                    <Input 
                        icon={Lock}
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <div className="flex items-center mb-6">
                        <Link to="/forgot-password" className="text-sm text-purple-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-700 
                                   text-white font-bold rounded-lg shadow-lg hover:from-purple-600
                                   hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 
                                   focus:ring-offset-2 focus:ring-offset-black transition duration-200"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Login"}
                    </motion.button>
                </form>
            </div>

            <div className="px-8 py-4 bg-black/40 border-t border-white/10 flex justify-center">
                <p className="text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link to="/signup"  className="text-purple-400 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </motion.div>
    </div>
    );
};

export default Login;
