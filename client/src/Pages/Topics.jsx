import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const TutorialsPage = () => {
  const navigate = useNavigate();

  // Categorized topics
  const frontEndTopics = [
    { id: 1, name: "HTML Basics", slug: "html-introduction" },
    { id: 2, name: "CSS Styling", slug: "css-styling" },
    { id: 3, name: "JavaScript Essentials", slug: "javascript-essentials" },
    { id: 4, name: "React Fundamentals", slug: "react-fundamentals" },
  ];

  const backEndTopics = [
    { id: 5, name: "Node.js & Express", slug: "node-express" },
    { id: 6, name: "Spring Boot", slug: "spring-boot" },
    { id: 7, name: "Django", slug: "django" },
    { id: 8, name: "GoLang", slug: "golang" },
  ];

  const databaseTopics = [
    { id: 9, name: "MongoDB", slug: "mongodb" },
    { id: 10, name: "PostgreSQL", slug: "postgresql" },
    { id: 11, name: "MySQL", slug: "mysql" },
  ];

  return (
    <motion.div 
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      exit={{ scaleY: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex items-center justify-center"
    >
      <div className="mt-24 min-h-[80vh] w-full max-w-7xl bg-black/40 border border-purple-500/50 rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] p-8 flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-indigo-200 to-indigo-300 text-transparent bg-clip-text">
          Choose a Topic to Learn
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-grow">
          {/* Front-End Section */}
          <div className="bg-indigo-500/10 p-6 rounded-2xl border border-purple-500/50 shadow-md h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4 text-center">Front-End</h3>
            <div className="flex flex-col gap-3 flex-grow">
              {frontEndTopics.map((topic) => (
                <motion.button
                  key={topic.id}
                  onClick={() => navigate(`/tutorials/${topic.slug}`)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.05 }}
                  className="p-3 rounded-xl bg-indigo-500/40 border border-purple-300/30 text-white hover:bg-indigo-400/30 transition"
                >
                  {topic.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Back-End Section */}
          <div className="bg-indigo-500/10 p-6 rounded-2xl border border-purple-500/50 shadow-md h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4 text-center">Back-End</h3>
            <div className="flex flex-col gap-3 flex-grow">
              {backEndTopics.map((topic) => (
                <motion.button
                  key={topic.id}
                  onClick={() => navigate(`/tutorials/${topic.slug}`)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.05 }}
                  className="p-3 rounded-xl bg-indigo-500/40 border border-purple-300/30 text-white hover:bg-indigo-400/30 transition"
                >
                  {topic.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Database Section */}
          <div className="bg-indigo-500/10 p-6 rounded-2xl border border-purple-500/50 shadow-md h-full flex flex-col">
            <h3 className="text-2xl font-semibold text-indigo-300 mb-4 text-center">Databases</h3>
            <div className="flex flex-col gap-3 flex-grow">
              {databaseTopics.map((topic) => (
                <motion.button
                  key={topic.id}
                  onClick={() => navigate(`/tutorials/${topic.slug}`)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.05 }}
                  className="p-3 rounded-xl bg-indigo-500/40 border border-purple-300/30 text-white hover:bg-indigo-400/30 transition"
                >
                  {topic.name}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TutorialsPage;
