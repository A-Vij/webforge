import { motion } from "framer-motion";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Input from "../Components/Input";
// import PasswordStrengthMeter from "../Components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const location = useLocation();

    const { signup, error, isLoading } = useAuthStore();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            navigate("/verify-email", {state: {from: location.state?.from?.pathname }});
        } catch (error) {
            console.log(error);
        }
    };

    return (
    <div className="flex items-center justify-center min-h-screen">
        <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-md w-full bg-black/50 border border-purple-500/50 
                       rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] overflow-hidden mt-22"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center 
                               bg-gradient-to-r from-purple-400 to-purple-600 
                               text-transparent bg-clip-text">
                    Create Account
                </h2>

                <form onSubmit={handleSignUp}>
                    <Input 
                        icon={User}
                        type="text"
                        placeholder="Enter Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="username"
                    />
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

                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

                    {/* <PasswordStrengthMeter password={password} /> */}

                    <motion.button
                        className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-700 
                                   text-white font-bold rounded-lg shadow-lg hover:from-purple-600
                                   hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 
                                   focus:ring-offset-2 focus:ring-offset-black transition duration-200"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader className="animate-spin mx-auto size-6" /> : "Sign Up"}
                    </motion.button>
                </form>
            </div>

            <div className="px-8 py-4 bg-black/40 border-t border-white/10 flex justify-center">
                <p className="text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link to="/login" state= {{from: location.state?.from?.pathname || "/" }} className="text-purple-400 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </motion.div>
    </div>
    );
};

export default SignUp;
