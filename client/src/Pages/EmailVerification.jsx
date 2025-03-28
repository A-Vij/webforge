import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

const EmailVerification = () => {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const inputRefs = useRef([]);
    const { error, isLoading, verifyEmail } = useAuthStore();

    const location = useLocation();
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        const newCode = [...code];
        if (value.length > 1) {
            const pastedCode = value.slice(0, 6).split("");
            for (let i = 0; i < 6; i++) {
                newCode[i] = pastedCode[i] || "";
            }
            setCode(newCode);
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        } else {
            newCode[index] = value;
            setCode(newCode);
            if (value && index < 5) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0)
            inputRefs.current[index - 1].focus();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const verificationCode = code.join("");
        try {
            await verifyEmail(verificationCode);
            toast.success("Email Verified", {
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
            navigate(location.state?.from?.pathname || "/", {replace: true});
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (code.every(digit => digit !== "")) {
            handleSubmit(new Event("submit"));
        }
    }, [code]);

    return (
    <div className="flex items-center justify-center min-h-screen">
        <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="max-w-md w-full bg-black/40 border border-white/10 rounded-2xl shadow-lg overflow-hidden"
        >
            <div className="p-8">
                <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-purple-600 text-transparent bg-clip-text">
                    Verify Your Email
                </h2>
                <p className="text-center text-gray-300 mb-6">
                    Enter the 6-digit code sent to your email address.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between">
                        {code.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type="text"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className="w-12 h-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-purple-500 focus:outline-none"
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isLoading || code.some((digit) => !digit)}
                        className="w-full bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-50"
                    >
                        {isLoading ? "Verifying..." : "Verify Email"}
                    </motion.button>
                </form>
            </div>
        </motion.div>
    </div>
    );
};

export default EmailVerification;
