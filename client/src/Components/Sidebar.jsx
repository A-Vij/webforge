import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import LoadingSpinner from "./LoadingSpinner";

const Sidebar = ({ tutorials, onSelect, isOpen, onClose }) => {
  const [expandedTutorial, setExpandedTutorial] = useState(null);
  // const navigate = useNavigate();
  
  const toggleTutorial = (tutorialId) => {
    
    setExpandedTutorial(expandedTutorial === tutorialId ? null : tutorialId);
  };

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ duration: 0.3 }}
      className="max-h-screen fixed inset-y-0 left-0 z-50 bg-black/80 md:bg-black/60 border border-white/10 p-6 rounded-r-2xl shadow-lg min-h-screen w-64 flex flex-col"
    >
      {/* Close Button (Replaces Collapse Button) */}
      {/* <div className="flex justify-end mb-4">
        <button
          className="text-white bg-purple-500 rounded-full px-3"
          onClick={onClose}
        >
          ✕
        </button>
      </div> */}

      {/* Sidebar Content */}
      {tutorials.length < 0 ? <LoadingSpinner />  : 
      <h2 className="text-xl mt-14 font-bold text-indigo-300">{tutorials[0].topic}</h2>}
      <div className="overflow-y-auto flex-grow pr-2 mt-4 space-y-2">
        {tutorials.map((tutorial, index) => (
          <div key={index}>
            <button
              onClick={() => {toggleTutorial(tutorial.id); }}
              className="w-full text-left px-3 py-2 rounded-lg bg-black/30 border border-purple-500 text-white"
            >
              {tutorial.title}
            </button>

            {/* Expandable Pages */}
            {expandedTutorial === tutorial.id && (
              <div className="mt-2 space-y-1 pl-4">
                {tutorial.pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      onSelect(page.slug);
                      onClose(); // Close when a tutorial is selected
                    }}
                    className="w-full text-left px-3 py-1 text-sm text-purple-300 hover:underline"
                  >
                    {page.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Sidebar;
