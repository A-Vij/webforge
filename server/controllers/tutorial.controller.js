import System from "../models/system.model.js";
import Tutorial from "../models/tutorial.model.js";

export const createTut = async (req, res) => {
    const {title, author, description, topic, slug, sections} = req.body;
    try {   
        if (!title || !slug || !author || !description || !sections || !topic)
            throw new Error("all fields reqd");

        const tutorial = new Tutorial({
            title,
            author, 
            description,
            topic,
            sections,
            slug,
        });

        await tutorial.save();

        res.status(201).json({
            success: true,
            message: "Tutorial created successfully",
            tutorial,
        });

    } catch (error) {
        console.log("error creating tut", error.message);
        res.status(400).json({success: false, message: "error server creating tut"});
    }
}
export const fetchTitle = async(req, res) => {
    try {
        const { topic } = req.params;
        const titles = await Tutorial.find({topic: topic.toUpperCase() }, "title slug");
    
        if (!titles)
            return res.status(400).json({success: false, message: "Titles Not Found"});
        return res.status(200).json({success: true, titles});
    } catch (error) {
        console.log("error in fetching titles", error.message);
        return res.status(400).json({success: false, message: "error in fetch titles"});
    }
}
export const fetchTut = async (req, res) => {
    try {
        const { slug } = req.params;
        const tutorial = await Tutorial.findOne({ slug });

        if (!tutorial)
            return res.status(400).json({success: false, message: "Tutorial Not Found"});

        const topic = tutorial.topic;
        const tutorials = await Tutorial.find({ topic });


        tutorial.views += 1;
        await tutorial.save();

        return res.status(200).json({success: true, tutorial, tutorials});
    } catch (error) {
        console.log("error in fetching tutorial", error.message);
        return res.status(400).json({success: false, message: "error in fetch tut"});
    }
}
export const updateTut = async (req, res) => {
    try{
        const {slug} = req.params;
        const tutorial = await Tutorial.findOneAndUpdate({slug}, {});
        if (!tutorial)
            return res.status(400).json({success: false, message: "Tutorial Not Found"});

    }catch(error){
        console.log("error in updating tutorial", error.message);
        return res.status(400).json({success: false, message: "error in update tut"});
    }
};
export const fetchPop = async (req, res) => {
    console.log("fetching");
    try {
        const popTuts = await Tutorial.find().sort({views: -1, likes: -1}).limit(10);
        if(!popTuts)
            return res.status(400).json({success: false, message: "Failed to load popular tutorials"});
        
        const topics = [...new Set(popTuts.map(tut => tut.topic))];

        const popQuests = await System.find({topic: {$in: topics} });
        
        return res.status(200).json({success: true, popTuts, popQuests});
    } catch (error) {
        console.error("Error fetching popular tutorials:", error);
        res.status(400).json({ success:false, message: "Server error" });
    }
}
export const searchTut =  async (req, res) => {
    try {
        // console.log("searching");
        
        const q = req.query.q;
        // console.log("Q", q);
        if (!q) return res.json([]);
      
        const matches = await Tutorial.find(
          { title: { $regex: q, $options: 'i' } },
          'title slug topic'
        ).limit(5);
        // console.log(matches);
        res.status(200).json(matches);
    } catch (error) {
        console.log(error);
        res.status(400).json({ success:false, message: "Server error" });
    }

};
  