import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TutorialsPage = () => {
  const navigate = useNavigate();

  // Temporary topic data
  const topics = [
    { id: 1, name: "HTML Basics", slug: "html-introduction" },
    { id: 2, name: "CSS Styling", slug: "css-styling" },
    { id: 3, name: "JavaScript Essentials", slug: "javascript-essentials" },
    { id: 4, name: "React Fundamentals", slug: "react-fundamentals" },
    { id: 5, name: "Node.js & Express", slug: "node-express" },
    { id: 6, name: "MongoDB", slug: "mongodb" },
    { id: 7, name: "Java", slug: "java" },
    { id: 8, name: "Python", slug: "python" },
  ];

  return (
    <motion.div 
    initial={{ scaleY: 0, opacity: 0 }}
    animate={{ scaleY: 1, opacity: 1 }}
    exit={{ scaleY: 0, opacity: 0 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className="min-h-screen  flex items-center mt-10 justify-center">
      <div className="w-full max-w-4xl bg-black/40 border border-purple-500/50 rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] p-8">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-200 to-indigo-300 text-transparent bg-clip-text">
          Choose a Topic to Learn
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {topics.map((topic) => (
            <motion.button
              key={topic.id}
              onClick={() => navigate(`/tutorials/${topic.slug}`)}
              whileHover={{ scale: 1.05 }} 
              transition={{ duration: 0.05 }}
              className="p-4 rounded-xl bg-indigo-500/40 border border-purple-300/30 text-white hover:bg-indigo-400/30 transition"
            >
              {topic.name}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialsPage;
