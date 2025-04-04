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
        const offset = 100; 
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
            <div id="card-section" className="w-full bg-black/30 py-12">
                <h2 className="text-3xl font-bold text-white text-center mb-10">
                    Technologies
                </h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <TechCard title="HTML" description="Learn the structure of web pages with HTML." color="bg-red-500/50" />
                    <TechCard title="CSS" description="Style your web pages beautifully with CSS." color="bg-blue-500/50" />
                    <TechCard title="JavaScript" description="Make your web pages interactive with JavaScript." color="bg-yellow-500/50" />
                    <TechCard title="ReactJS" description="Build modern user interfaces with ReactJS." color="bg-blue-300/50" />
                    <TechCard title="NodeJS" description="Run JavaScript backend services with NodeJS." color="bg-green-500/50" />
                    <TechCard title="MongoDB" description="Store and manage data efficiently with MongoDB." color="bg-green-400/50" />
                </div>
            </div>

            
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
            {/* Our Goals */}
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
