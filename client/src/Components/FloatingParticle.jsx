import { motion } from "framer-motion";

const FloatingParticle = ({ left, size, duration, delay }) => {
  return (
    <motion.div
      className="absolute bg-white rounded-full"
      style={{
        left,
        width: size,
        height: size,
      }}
      initial={{ bottom: "-5%", opacity: 0 }}
      animate={{
        bottom: "105%",
        opacity: [0, 0.5, 0],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
        delay,
      }}
    />
  );
};

export default FloatingParticle;
