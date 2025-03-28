import { motion } from "framer-motion";

const HeroTitle = () => {
    const title = "Code Better, Build Faster.";

    return (
        <div className="flex">
            {title.split("").map((char, index) => (
                <motion.span
                    key={index}
                    className="text-white text-3xl md:text-7xl font-bold mb-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.2,
                        delay: index * 0.1, // Sequential blinking effect
                    }}
                >
                    {char === " " ? "\u00A0" : char} {/* Preserve spaces */}
                </motion.span>
            ))}
        </div>
    );
};

export default HeroTitle;
