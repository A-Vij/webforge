import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function TechCard({ title, description, color }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-full">
            {/* Card */}
            <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                className={`p-6 rounded-lg shadow-md cursor-pointer ${color} text-white`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-gray-300">Click to learn more</p>
            </motion.div>

            {/* Dropdown Section */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className={`absolute left-0 mt-2 w-full bg-black/80 text-white p-4 rounded-lg shadow-lg backdrop-blur-md ${
                    isOpen ? "block" : "hidden"
                }`}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <button onClick={() => setIsOpen(false)}>
                        <X className="size-5 text-gray-400 hover:text-white transition-colors" />
                    </button>
                </div>
                <p className="mt-2 text-gray-300">{description}</p>
            </motion.div>
        </div>
    );
}
