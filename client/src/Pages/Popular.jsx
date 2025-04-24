import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Eye, Flame, AlertCircle, ArrowRight } from "lucide-react";
import LoadingSpinner from "../Components/LoadingSpinner";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/tutorials/popular" : "/tutorials/popular";

const Popular = () => {
    const [popularTutorials, setPopularTutorials] = useState([]);
    const [popularQuests, setPopularQuests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API_URL)
            .then(res => {
                setPopularTutorials(res.data.popTuts);
                setPopularQuests(res.data.popQuests);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching data:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <LoadingSpinner />;

    if (popularTutorials?.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center flex flex-col justify-center bg-black/30 items-center py-20 border border-purple-600/50 rounded-2xl shadow-lg max-w-4xl p-6"
                >
                    <AlertCircle className="h-16 w-16 mx-auto text-purple-400 mb-4" />
                    <p className="text-gray-300 font-medium text-center">No popular tutorials available. Check back later!</p>
                    <Link to="/topics">
                        <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all flex items-center gap-2 cursor-pointer">
                            Explore Other Tutorials
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full items-center mx-auto py-10 px-4 min-h-screen">
            <h2 className="text-4xl font-bold mt-18 mb-10 text-center dark:bg-gradient-to-r dark:from-indigo-300 dark:to-indigo-300 dark:text-transparent bg-clip-text flex items-center gap-2">
                Popular Tutorials
            </h2>

            <div className="w-full max-w-6xl space-y-6">
                {popularTutorials?.map((tutorial, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.1, delay: idx * 0.1 }}
                        className="flex flex-col lg:flex-row gap-4 bg-black/50 dark:bg-black/30 border border-indigo-500/50 rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] p-6 transition-all duration-150 hover:scale-105 hover:shadow-indigo-500/40"
                    >
                        <div className="lg:w-2/3">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 border border-purple-500">
                                    {tutorial.profileImg ? (
                                        <img
                                            src={tutorial.profileImg}
                                            alt={`${tutorial.author}'s profile`}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="w-6 h-6 text-purple-400" />
                                    )}
                                </div>
                                <div>
                                    <span className="font-medium text-white">{tutorial.author}</span>
                                    <p className="text-xs text-purple-400">Expert Coder</p>
                                </div>
                                <div className="ml-auto bg-purple-800/40 px-3 py-1 rounded-full text-xs text-purple-300 font-medium flex items-center gap-1">
                                    <Flame className="w-4 h-4" />
                                    Trending
                                </div>
                            </div>

                            <h3 className="text-xl text-white font-bold mb-2 hover:text-indigo-400 transition-colors">
                                {tutorial.title}
                            </h3>

                            <p className="text-indigo-300 leading-relaxed">
                                {tutorial.description}
                            </p>

                            <div className="mt-6 pt-4 border-t border-purple-800 flex justify-between items-center">
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm text-white flex items-center">
                                        <Eye className="mr-1 text-purple-500 w-5 h-5" />
                                        {tutorial.views}
                                    </span>
                                    <span className="text-sm text-purple-300">
                                        {tutorial.date || "Recently popular"}
                                    </span>
                                </div>
                                <Link to={`/tutorials/${tutorial.topic.toLowerCase()}/${tutorial.slug}`}>
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-md cursor-pointer">
                                        Explore
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="lg:w-1/3 bg-black/20 border border-purple-700/40 p-4 rounded-lg">
                            <h4 className="text-sm text-purple-400 font-semibold mb-2">Related Quests</h4>
                            <ul className="space-y-1 list-disc list-inside text-indigo-200 text-sm">
                                {popularQuests
                                    ?.filter(q => q.topic === tutorial.topic)
                                    .map((quest, index) => (
                                        <li key={index}>
                                            <span className="font-semibold">{quest.name}</span> — {quest.desc}
                                        </li>
                                    ))}
                                {popularQuests?.filter(q => q.topic === tutorial.topic).length === 0 && (
                                    <li className="text-purple-500">No quests found for this topic.</li>
                                )}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Popular;
