import React from "react";
import { ChevronDown } from "lucide-react";
import { SearchField } from "../Components/SearchField";
import TechCard from "../Components/FlipCard";
import { Code } from "../Components/Code"; // Import Code component
import HeroTitle from "../Components/HeroTitle";

export default function Home() {
    const handleSearch = (query) => {
        console.log("Searching for:", query);
    };

    const scrollToContent = () => {
        const section = document.getElementById("card-section");
        const offset = 100; // Adjust this value as needed
        const sectionPosition = section.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: sectionPosition,
            behavior: "smooth",
        });
    };

    return (
        <div className="flex flex-col items-center">
            {/* Hero section */}
            <div
                className="flex flex-col items-center justify-center w-full px-6 text-center relative"
                style={{ minHeight: "calc(100vh)" }}
            >
                {/* <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Code Better, Build Faster.
                </h1> */}
                <HeroTitle />

                <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl">
                    Complete Quests. Earn XP. Level Up.
                </p>

                <SearchField onSearch={handleSearch} />

                <button
                    onClick={scrollToContent}
                    className="absolute bottom-12 animate-bounce p-2 bg-purple-700 rounded-full shadow-md hover:shadow-lg transition-shadow"
                    aria-label="Scroll to content"
                >
                    <ChevronDown className="text-white" size={24} />
                </button>
            </div>

            {/* Flip Cards Section */}
            <div id="card-section" className="w-full py-16 bg-black/30">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">
                        Basics
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <TechCard 
                            title="HTML" 
                            description="Learn the structure of web pages with HTML." 
                            color="bg-red-500/50"
                        />
                        <TechCard 
                            title="CSS" 
                            description="Style your web pages beautifully with CSS." 
                            color="bg-blue-500/50"
                        />
                        <TechCard 
                            title="JavaScript" 
                            description="Make your web pages interactive with JavaScript." 
                            color="bg-yellow-500/50"
                        />
                    </div>
                    <h2 className="text-3xl font-bold text-white text-center mt-16 mb-10">
                        Advanced
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <TechCard 
                            title="ReactJS" 
                            description="Learn the structure of web pages with HTML." 
                            color="bg-blue-300/50"
                        />
                        <TechCard 
                            title="NodeJS" 
                            description="Style your web pages beautifully with CSS." 
                            color="bg-orange-500/50"
                        />
                        <TechCard 
                            title="MongoDB" 
                            description="Make your web pages interactive with JavaScript." 
                            color="bg-green-500/50"
                        />
                    </div>
                </div>
            </div>

            {/* Example Usage of Code Component */}
            <div className="w-full py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-white text-center mb-10">
                        Custom Tutorials
                    </h2>
                    <Code 
                        files={{
                            "/index.html": {
                                code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; background: black; color: white; }
    </style>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to the coding playground.</p>
</body>
</html>`,
                            }
                        }}
                        entryFile="index.html"
                    />
                </div>
            </div>
            <hr className="my-12 border-gray-400/50 mx-auto w-4/5" />
            {/* Our Goals Section */}
            <div id="content-section" className="w-full py-12">
                <div className="container mx-auto px-6">
                     <h2 className="text-3xl font-bold text-white text-center mb-10">
                        Our Goals
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-indigo-500/60 backdrop-blur-lg p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Make Learning Fun
                            </h3>
                            <p className="text-gray-300">
                                We believe coding should be enjoyable. Our quest-based learning
                                approach gamifies the experience, keeping you motivated and
                                engaged.
                            </p>
                        </div>

                        <div className="bg-indigo-500/60 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Build Real Skills
                            </h3>
                            <p className="text-gray-300">
                                Our hands-on challenges focus on practical skills that translate
                                directly to real-world projects and professional development.
                            </p>
                        </div>

                        <div className="bg-indigo-500/60 p-6 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Support All Learners
                            </h3>
                            <p className="text-gray-300">
                                Whether you're a complete beginner or looking to level up existing
                                skills, we provide pathways tailored to your experience level.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
