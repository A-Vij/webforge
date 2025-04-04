import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Code } from "../Components/Code";
import LoadingSpinner from "../Components/LoadingSpinner";

import { AlertCircle, ArrowRight } from "lucide-react";

const ContentSection = ({ section, sectionKey }) => {
  return (
    <div className="p-6 border border-white/10 rounded-2xl bg-indigo-300/20">
      <div dangerouslySetInnerHTML={{ __html: section.content }} />

      {section.file && (
        <div className="mt-6 w-full flex justify-center">
          <div className="w-full max-w-4xl"> 
            <Code
              files={{ [`${sectionKey}.html`]: section.file }}
              entryFile={`${sectionKey}.html`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/tutorials" : "/tutorials"

const Tutorials = ({ slug }) => {

  const [title, setTitle] = useState("");
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    axios
      .post(`${API_URL}/${slug}`)
      .then((res) => {
        // console.log(res.data.tutorials);
        
        // setTutorials(res.data.tutorials);
        setTitle(res.data.tutorial.title);
        setSections(res.data.tutorial.sections);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutorials:", err);
        setError(true);
        setLoading(false);
      });

  }, [slug]);

  // if (loading) return <LoadingSpinner />

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center flex-col text-center py-20 bg-black/40 border border-purple-500/50 rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] max-w-4xl p-6"
      >
        <AlertCircle className="h-16 w-16 mx-auto text-purple-400 mb-4" />
        <p className="text-gray-400 font-medium">No tutorials available. Check back later!</p>
        <Link to="/topics">
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all flex items-center gap-2">
                Explore Other Topics
                <ArrowRight className="w-5 h-5" />
            </button>
        </Link>
      </motion.div>
    </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen mt-28">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="w-full max-w-5xl bg-black/40 border border-indigo-500/50 rounded-2xl shadow-[0_0_10px_rgba(100,149,237,0.4)] p-8 "
      >
        {title && (
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-indigo-200 to-indigo-300 text-transparent bg-clip-text">
            {title}
          </h2>
        )}

        <div className="space-y-8">
          {Array.isArray(sections) && sections.map((section, index) => (
            <ContentSection key={index} section={section} sectionKey={`section-${index}`} />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-800 transition duration-200"
            onClick={() => window.history.back()}
          >
            Go Back
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Tutorials;
