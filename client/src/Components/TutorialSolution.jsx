import { useState } from "react";
import { Code } from "./Code";
import { motion } from "framer-motion";

const TutorialSolution = ({ desc, solutionFiles, entryFile }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="mt-8 p-6 border border-indigo-500/30 bg-black/20 rounded-2xl">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="px-4 py-2 bg-purple-600 text-white cursor-pointer rounded-full hover:bg-purple-700 transition-all"
      >
        {show ? "Hide Solution" : "Show Solution"}
      </button>

      {show && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4"
        >

          <Code files={{
              "/index.html": {code : (solutionFiles || "")}
            }} 
              entryFile = {entryFile} 
          />
        </motion.div>
      )}
    </div>
  );
};

export default TutorialSolution;
