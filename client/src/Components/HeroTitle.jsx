import { motion } from "framer-motion";

const HeroTitle = () => {
    const title = "Code Better, Build Faster.";

    return (
        <div className="flex">
            {title.split("").map((char, index) => (
                <motion.span
                    key={index}
                    className="text-white text-3xl md:text-7xl font-bold mb-10"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.15,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </div>
    );
};

export default HeroTitle;
