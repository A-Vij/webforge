import { motion } from "framer-motion";

const FloatingShape = ({ color, size, left, section, delay }) => {
    let startY, endY;

    
    if (section === "top") {
        startY = "-7vh";
        endY = "110vh"; // Stops in the top third
    } else if (section === "middle") {
        startY = "110vh";
        endY = "210vh"; // Moves within the middle third
    } else {
        startY = "210vh";
        endY = "410vh"; // Moves in the bottom third
    }

    return (
        <motion.div
            className={`absolute ${color} ${size} opacity-20 backdrop-blur-xl`}
            style={{ left }}
            initial={{ top: startY }}
            animate={{ top: endY , rotate: [0, 90, 180, 360]}}
            transition={{
                duration: 8,
                ease: "linear",
                repeat: Infinity,
                delay,
            }}
            aria-hidden="true"
        >
            <div className="w-full h-full rotate-45 shadow-xl rounded-md border border-purple-300"></div>
        </motion.div>
    );
};

export default FloatingShape;
