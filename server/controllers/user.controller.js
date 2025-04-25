import System from "../models/system.model.js";
import User from "../models/user.model.js";

export const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.userId)
                            .populate({path: "progress.tutorialId", select: "title topic slug"})
                            .populate({path: "completedQuests.questId", select: "requirement name desc "});
        
        if (!user)                  
            return res.status(400).json({message: "error fetching profile"});

        return res.status(200).json({user: user});
    } catch (error) {
        console.log("error in fetching profile", error.message);
        return res.status(400).json({message: "Server error fetching profile"});
    }
}
export const completeTut = async(req, res) => {
    const { tutorial } = req.body;
    
    try {
        const user = await User.findById(req.userId).populate("progress.tutorialId", "topic").populate("completedQuests.questId", "requirement");
        const quests = await System.find({topic: tutorial.topic});

        if (!user)                  
            return res.status(400).json({message: "User Not Found"});
        const alreadyCompleted = user.progress.find(p => p.tutorialId.toString() === tutorial._id.toString());
        if (alreadyCompleted){
            return res.status(200).json({message: "Already Completed"});
        }
        let leveledUp = false;
        user.experiencePoints += 50;
        if (user.experiencePoints >= 200){
            user.level += 1;
            user.experiencePoints = 0;
            leveledUp = true;
        }
        user.progress.push({
            tutorialId: tutorial._id,
            completed: true,
            lastAccessed: new Date(),
        });
        let count = 0;
        
        
        user.progress.forEach((p)=>{
            if (p.tutorialId.topic === tutorial.topic) count++;
        });
        
        // console.log(quests);
        let questCompleted;
        quests.forEach((q) => {
            if (q.topic === tutorial.topic){
                const idx = user.completedQuests.findIndex((cq) => cq.questId._id.toString() === q._id.toString());
                if (idx === -1){
                    user.completedQuests.push({questId: q._id, current: 1});
                } else if (!(user.completedQuests[idx].completed)){
                    user.completedQuests[idx].current += 1;
                    if (user.completedQuests[idx].current >= user.completedQuests[idx].questId.requirement){
                        // console.log("completed");
                        questCompleted = true;
                        user.completedQuests[idx].completed = true;
                        user.completedQuests[idx].completedAt = new Date();
                    }
                }
            }
        });
        await user.save();
        return res.status(200).json({message: "Tutorial Completed", leveledUp, questCompleted});
    } catch (error) {
        console.log("error in complete tut", error);
        return res.status(400).json({message: "Error Completing Tutorial"});
    }
}
export const checkCompletion = async (req, res) => {
    const { tutorialId } = req.body;
    
    try {
        const user = await User.findById(req.userId);
        if (!user)                  
            return res.status(400).json({message: "User Not Found"});
        const alreadyCompleted = user.progress.find(p => p.tutorialId.toString() === tutorialId.toString());
        // console.log(alreadyCompleted);
        return res.status(200).json({completed: alreadyCompleted});
    }catch(error){
        console.log("error in check completion", error.message);
        return res.status(400).json({message: "Error Checking Completion"});
    }
}
export const collectRewards = async (req, res) => {
    const { id } = req.body;
    // console.log(id);
    
    try {
        const user = await User.findById(req.userId).populate("progress.tutorialId", "topic").populate("completedQuests.questId", "requirement reward");
        if (!user)                  
            return res.status(400).json({message: "User Not Found"});
        console.log(user.completedQuests);
        
        let idx = user.completedQuests.findIndex((cq) => cq._id.toString() === id.toString());
        // console.log(idx);
        // console.log(user.completedQuests[idx]);
        
        user.completedQuests[idx].rewardsClaimed = true;
        user.experiencePoints += user.completedQuests[idx].questId.reward;

        let leveledUp;
        if (user.experiencePoints >= 200){
            user.level += 1;
            user.experiencePoints %= 200;
            leveledUp = true;
        }
        
        await user.save();
    
        return res.status(200).json({message: "Rewards Collected", leveledUp, user});
    } catch (error) {
        console.log("error in collecting rewards", error);
        return res.status(400).json({message: "Error Collecting Rewards"});   
    }
}