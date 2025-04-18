import User from "../models/user.model.js";

export const getProfile = async(req, res) => {
    try {
        const user = await User.findById(req.userId).populate({path: "progress.tutorialId", select: "title topic slug"});
        // console.log(user.name);
        if (!user)                  
            return res.status(400).json({message: "error fetching profile"});

        return res.status(200).json({user: user});
    } catch (error) {
        console.log("error in fetching profile", error.message);
        return res.status(400).json({message: "Server error fetching profile"});
    }
}
