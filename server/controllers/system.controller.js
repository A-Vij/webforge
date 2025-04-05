import System from "../models/system.model.js";
import User from "../models/user.model.js";

export const createQuest = async (req, res) => {
    const { name, desc, exp } = req.body;
    try {
        if (!name || !desc || !exp)
            return res.status(400).json({success: false, message: "all fields reqd"});
        const quest = new System({
            name, desc, exp
        });
        await quest.save();

        res.status(201).json({
            success: true,
            message: "Quest created successfully",
            quest,
        });
    } catch (error) {
        console.log("error creating quest", error.message);
        res.status(400).json({success: false, message: "error server creating quest"});
    }
}

export const completeQuest = async (req, res) => {
    const { userId, questId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) return {success: false, message: "user not found"};

        const quest = await System.findById(questId);
        if (!quest) return {success: false, message: "quest not found"};

        if (user.completedQuests.some(q => q.questId.equals(questId)))
            return {success: false, message: "quest already completed"};

        user.completedQuests.push({questId});
        user.experiencePoints += quest.exp;

        await user.save();
        return res.status(200).json({message: "quest completed successfully", user});

    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "error completing quest"});
    }
}