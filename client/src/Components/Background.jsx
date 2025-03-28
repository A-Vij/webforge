import { useState, useEffect } from "react";
import FloatingShape from "./FloatingShape";

const Background = ({ children }) => {
    const [floatingShapes, setFloatingShapes] = useState([]);
    const genDelay = () => { return Math.random() * 6 };

    useEffect(() => {
        const generateShapes = () => {
            const d1 = genDelay();
            const d2 = genDelay();
            const d3 = genDelay();
            const d4 = genDelay();
            const d5 = genDelay();
            const d6 = genDelay();
            return [
                // Top third (0% - 33%)
                { color: "bg-indigo-500", size: "w-12 h-12", left: "10%", section: "top", delay: d1 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "25%", section: "top", delay: d2 },
                { color: "bg-indigo-500", size: "w-8 h-8", left: "40%", section: "top", delay: d3 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "55%", section: "top", delay: d4 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "70%", section: "top", delay: d5 },
                { color: "bg-indigo-500", size: "w-8 h-8", left: "85%", section: "top", delay: d6 },

                // Middle third (33% - 66%)
                { color: "bg-indigo-500", size: "w-12 h-12", left: "10%", section: "middle", delay: d1 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "25%", section: "middle", delay: d2 },
                { color: "bg-indigo-500", size: "w-8 h-8", left: "40%", section: "middle", delay: d3 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "55%", section: "middle", delay: d4 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "70%", section: "middle", delay:d5  },
                { color: "bg-indigo-500", size: "w-8 h-8", left: "85%", section: "middle", delay: d6 },

                // Bottom third (66% - 100%)
                { color: "bg-indigo-500", size: "w-12 h-12", left: "10%", section: "bottom", delay: d1 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "25%", section: "bottom", delay: d2 },
                { color: "bg-indigo-500", size: "w-8 h-8", left: "40%", section: "bottom", delay: d3 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "55%", section: "bottom", delay: d4 },
                { color: "bg-indigo-500", size: "w-12 h-12", left: "70%", section: "bottom", delay:d5 },
                { color: "bg-indigo-500", size: "w-8 h-8", left: "85%", section: "bottom", delay: d6 },
            ];
        };

        // Generate initial floating shapes
        setFloatingShapes(generateShapes());

        // Update floating shapes every 6 seconds to keep them dynamic
        // const interval = setInterval(() => {
        //     console.log("regend");
            
        //     setFloatingShapes(generateShapes());
        // }, 3000);

        return () => console.log("unmounted");; // Cleanup interval on unmount
    }, []);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-purple-900 to-black relative overflow-hidden">
            {/* Floating Diamonds in Sections with Dynamic Delays */}
            {floatingShapes.map((shape, index) => (
                <FloatingShape key={index} {...shape} />
            ))}

            {/* Main Content */}
            <div className="relative z-10 flex-grow">{children}</div>
        </div>
    );
};

export default Background;
