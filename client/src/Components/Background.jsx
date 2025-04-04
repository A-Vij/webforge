import { useState, useEffect } from "react";
import FloatingParticle from "./FloatingParticle";

const Background = ({ children }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generateParticles = () => {
      return Array.from({ length: 40 }).map(() => ({
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 5 + 3}px`, // Vary size between 3px to 8px
        duration: Math.random() * 5 + 4, // 4s - 9s duration
        delay: Math.random() * 6, // Staggered appearances
      }));
    };

    setParticles(generateParticles());
  }, []);

  return (
<div className="relative min-h-screen flex flex-col bg-gradient-to-b from-indigo-300 via-gray-300 to-indigo-300 dark:from-black dark:via-purple-800 dark:to-black bg-fixed overflow-hidden">
  {/* Floating Dust Particles */}
  {particles.map((particle, index) => (
    <FloatingParticle key={index} {...particle} />
  ))}

  {/* Main Content */}
  <div className="relative z-10 flex-grow">{children}</div>
</div>

  );
};

export default Background;
