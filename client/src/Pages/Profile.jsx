import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Check } from "lucide-react";

import toast from "react-hot-toast";
import axios from "axios";

import { AvatarModal } from "../Components/AvatarModal";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/user" : "/user"

const Profile = () => {

    const [user, setUser] = useState({});
    const [badges, setBadges] = useState([]);
    const [completedQuests, setCompletedQuests] = useState([]);
    const [completedTutorials, setCompletedTutorials] = useState([]);

    const [selectedAvatar, setSelectedAvatar] = useState(user?.profileImage || '');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAvatarSelect = (newAvatar) => {
        setSelectedAvatar(newAvatar);
    };
    const handleClick = (e) => {
        axios.post(`${API_URL}/collect-rewards`, {id: e.target.value})
        .then((res) => {
            setCompletedQuests(res.data.user.completedQuests);
            toast.success(`${res.data.message}`, {
                style: {
                    background: "#1a1a2e",  
                    color: "#e0e0ff",     
                    border: "1px solid #7a00ff",  
                    boxShadow: "0 0 10px #7a00ff",
                },
                iconTheme: {
                    primary: "#7a00ff",
                    secondary: "#1a1a2e",
                },
            });
            if (res.data.leveledUp){
                toast.success(`Levelled Up!!`, {
                  style: {
                      background: "#1a1a2e",  
                      color: "#e0e0ff",     
                      border: "1px solid #7a00ff",  
                      boxShadow: "0 0 10px #7a00ff",
                  },
                  iconTheme: {
                      primary: "#7a00ff",
                      secondary: "#1a1a2e",
                  },
                });
              }
        })
    }
    useEffect(()=>{
        axios.get(`${API_URL}/get-profile`)
        .then((res) => {
            // console.log(res.data.user);
            setUser(res.data.user);
            // console.log(user);
            setBadges(res.data.user.badges);
            setCompletedTutorials(res.data.user.progress);
            setCompletedQuests(res.data.user.completedQuests);

        })
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen mt-28">
            <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-5xl bg-black/30 border border-purple-500/50 rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] p-8"
            >
                <div className="flex flex-col items-center w-full p-6 text-white">
                    <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
                        
                    <div className="md:w-1/3 w-full p-6 rounded-xl border-4 border-black/70 shadow-lg backdrop-blur-lg bg-indigo-600/20 flex flex-col items-center">
                        <div onClick = {() => setIsModalOpen(true)} className="w-24 h-24 rounded-full border-4 border-purple-500 shadow-lg bg-black/20 flex items-center justify-center cursor-pointer">
                        {selectedAvatar ? (
                                <img src={selectedAvatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <User size={40} className="text-purple-400" />
                            )}
                        </div>
                        <h1 className="text-2xl font-bold text-purple-300 mt-3">{user?.name}</h1>
                    </div>
                    
                    <AvatarModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSelect={handleAvatarSelect}
                    />

                        <div className="md:w-2/3 w-full p-6 rounded-xl border-4 border-black/70 shadow-lg backdrop-blur-lg bg-indigo-600/20 flex items-center justify-center">
                            { (
                                <div className="flex flex-wrap justify-center items-center gap-4 w-full">
                                    {badges.map((badge, index) => (
                                        <div key={index} className="w-16 h-16 flex items-center justify-center bg-black/50 border-2 border-purple-500 rounded-full shadow-lg text-2xl">
                                            {badge.icon}
                                        </div>
                                    ))}
                                    {[...Array(6 - badges.length)].map((_, index) => (
                                        <div key={index} className="w-16 h-16 flex items-center justify-center bg-black/50 border-2 border-purple-500 rounded-full shadow-lg opacity-40">
                                            -
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>


                    <div className="w-full max-w-4xl mt-6 p-4 rounded-xl border-4 border-black/70 shadow-lg backdrop-blur-lg bg-transparent">
                        <h2 className="text-lg font-bold mb-2 text-purple-300">Level {user?.level}</h2>
                        <div className="w-full h-6 bg-black/40 rounded-full overflow-hidden border-2 border-purple-500">
                            <div 
                                className="h-full bg-purple-500 rounded-full transition-all duration-500"
                                style={{ width: `${(user?.experiencePoints)/2}%` }}
                            ></div>
                        </div>
                    </div>

                    
                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl mt-6">
                        
                    <div className="md:w-1/2 w-full p-4 rounded-xl border-4 border-black/70 shadow-lg bg-indigo-600/20 backdrop-blur-lg flex flex-col overflow-y-auto max-h-[300px] custom-scrollbar">

                        {completedTutorials.length > 0 ? (
                            <>
                                <h2 className="text-lg font-bold text-purple-300 mb-4 text-center">Progress</h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {completedTutorials.map((tutorial, index) => (
                                        <div key={index} className="flex items-center p-3 rounded-lg bg-black/30 border-2 border-purple-500">
                                            {/* <span className="text-xl mr-3">{tutorial.icon}</span> */}
                                            <div>
                                                <h3 className="font-semibold text-purple-200 text-center flex items-center">
                                                    <Check size={18} className="text-green-400 mr-2" />
                                                    {tutorial.tutorialId.title}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                            ) : (
                                <div className="flex flex-1 items-center justify-center text-purple-300 text-center h-full">
                                    No Tutorials Completed
                                </div>
                            )}
                        </div>
                            
                        <div className="md:w-1/2 w-full p-4 rounded-xl border-4 border-black/70 shadow-lg bg-indigo-600/20 backdrop-blur-lg flex flex-col overflow-y-auto max-h-[300px] custom-scrollbar">
                            {completedQuests.length > 0 ? (
                                <>
                                <h2 className="text-lg font-bold text-purple-300 mb-4 text-center">Current Quests</h2>
                                <ul className="space-y-3">
                                    {completedQuests.map((quest, index) => (
                                    <li key={index} className="flex items-center justify-between p-3 rounded-lg bg-black/30 border-2 border-purple-500">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${quest.completed ? 'bg-purple-500' : 'border-2 border-purple-500'}`}>
                                            {quest.completed && <span className="text-white text-xs">✓</span>}
                                        </div>
                                        <span className="font-semibold text-purple-200 truncate">{quest.questId?.name}</span>
                                        </div>

                                        <div className="flex items-center gap-4 ml-4 shrink-0">
                                        {quest.completed && <button value = {quest._id} onClick = {handleClick} disabled={quest.rewardsCollected} className="bg-purple-600 hover:bg-purple-500 text-white text-xs px-3 py-1 rounded-lg cursor-pointer">
                                            {!quest.rewardsCollected ? "Collect" : "Collected"}
                                        </button>}
                                        <div className="flex items-center text-sm text-purple-300 font-medium whitespace-nowrap">
                                            <span>{quest.current}</span>
                                            <span className="mx-1 text-purple-400">/</span>
                                            <span>{quest.questId?.requirement}</span>
                                        </div>
                                        </div>
                                    </li>
                                    ))}
                                </ul>
                                </>
                            ) : (
                                <div className="flex flex-1 items-center justify-center text-purple-300 text-center h-full">
                                No Quests Started Yet
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Profile;
