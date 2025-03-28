import React from "react";
import { motion } from "framer-motion";

const Profile = () => {
    const user = {
        name: "Username",
        level: 12,
        exp: 75, // EXP percentage
        profileImage: "https://via.placeholder.com/100", // Placeholder profile image
    };

    const badges = [
        { name: "Explorer", icon: "" },
        { name: "Elite Coder", icon: "" },
        { name: "Debugger", icon: "" }
    ];

    return (
        <div className="flex items-center justify-center min-h-screen mt-28">
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full max-w-5xl bg-black/30 border border-purple-500/50 rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] p-8"
            >
                <div className="flex flex-col items-center w-full p-6 text-white">
                    {/* Profile & Badges Container */}
                    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
                        {/* Profile Section (1/3 width on large screens) */}
                        <div className="md:w-1/3 w-full p-6 rounded-xl border-4 border-black/70 shadow-lg backdrop-blur-lg bg-indigo-600/20 flex flex-col items-center">
                            <img 
                                src={user.profileImage} 
                                alt="User Avatar" 
                                className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg" 
                            />
                            <h1 className="text-2xl font-bold text-purple-300 mt-3">{user.name}</h1>
                        </div>

                        {/* Badges Section (2/3 width on large screens) */}
                        <div className="md:w-2/3 w-full p-6 rounded-xl border-4 border-black/70 shadow-lg backdrop-blur-lg bg-indigo-600/20 flex flex-wrap justify-center items-center gap-4">
                            {badges.map((badge, index) => (
                                <div key={index} className="w-16 h-16 flex items-center justify-center bg-black/50 border-2 border-purple-500 rounded-full shadow-lg text-2xl">
                                    {badge.icon}
                                </div>
                            ))}
                            {/* Empty slots for future badges */}
                            {[...Array(6 - badges.length)].map((_, index) => (
                                <div key={index} className="w-16 h-16 flex items-center justify-center bg-black/50 border-2 border-purple-500 rounded-full shadow-lg opacity-40">
                                    ❔
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* EXP Bar */}
                    <div className="w-full max-w-4xl mt-6 p-4 rounded-xl border-4 border-black/70 shadow-lg backdrop-blur-lg bg-transparent">
                        <h2 className="text-lg font-bold mb-2 text-purple-300">Level {user.level}</h2>
                        <div className="w-full h-6 bg-black/40 rounded-full overflow-hidden border-2 border-purple-500">
                            <div 
                                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${user.exp}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Achievements & Quests */}
                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mt-6">
                        {/* Achievements Section */}
                        <div className="md:w-1/2 w-full p-4 rounded-xl border-4 border-black/70 shadow-lg bg-indigo-600/20 backdrop-blur-lg">
                            <h2 className="text-lg font-bold text-purple-300 mb-4">Achievements</h2>
                            <div className="grid grid-cols-1 gap-3">
                                {[ 
                                    { name: "Code Warrior", description: "Completed 10 challenges", icon: "" },
                                    { name: "Fast Learner", description: "Finished a course in record time", icon: "" },
                                    { name: "Bug Hunter", description: "Fixed 5 critical bugs", icon: "" }
                                ].map((achievement, index) => (
                                    <div key={index} className="flex items-center p-3 rounded-lg bg-black/30 border-2 border-purple-500">
                                        <span className="text-xl mr-3">{achievement.icon}</span>
                                        <div>
                                            <h3 className="font-semibold text-purple-200">{achievement.name}</h3>
                                            <p className="text-sm text-purple-400">{achievement.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Current Quests Section */}
                        <div className="md:w-1/2 w-full p-4 rounded-xl border-4 border-black/70 shadow-lg bg-indigo-600/20 backdrop-blur-lg">
                            <h2 className="text-lg font-bold text-purple-300 mb-4">Current Quests</h2>
                            <ul className="space-y-3">
                                {[ 
                                    { name: "Master Flexbox", completed: false },
                                    { name: "JavaScript Algorithms", completed: true },
                                    { name: "React Hooks Basics", completed: false }
                                ].map((quest, index) => (
                                    <li key={index} className="flex items-center p-3 rounded-lg bg-black/30 border-2 border-purple-500">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${quest.completed ? 'bg-purple-500' : 'border-2 border-purple-500'}`}>
                                            {quest.completed && <span className="text-white text-xs">✓</span>}
                                        </div>
                                        <span className="text-purple-400">{quest.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
