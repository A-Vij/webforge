import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaDatabase } from "react-icons/fa";

const iconMap = {
    HTML: <FaHtml5 className="text-6xl text-orange-500 mx-auto mb-4" />,
    CSS: <FaCss3Alt className="text-6xl text-blue-500 mx-auto mb-4" />,
    JavaScript: <FaJs className="text-6xl text-yellow-500 mx-auto mb-4" />,
    ReactJS: <FaReact className="text-6xl text-blue-300 mx-auto mb-4" />,
    NodeJS: <FaNodeJs className="text-6xl text-green-500 mx-auto mb-4" />,
    MongoDB: <FaDatabase className="text-6xl text-green-400 mx-auto mb-4" />,
};

export default function TechCard({ title, description, color }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            className={`relative p-6 h-72 w-64 rounded-lg shadow-md flex flex-col justify-center items-center cursor-pointer transition-all duration-300 ${color} text-white`}
            onClick={() => setIsOpen(!isOpen)}
        >
            <motion.div layout="position">{iconMap[title]}</motion.div>
            <h3 className="text-xl font-semibold text-center">{title}</h3>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="modal"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 p-4 flex flex-col justify-center items-center bg-black/80 rounded-lg"
                    >
                        <h3 className="text-lg font-bold">{title}</h3>
                        <p className="text-gray-300 text-center mt-2">{description}</p>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            className="mt-4 px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 transition-colors rounded-md"
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
