import { Code } from "./Code";
import MarkCompleteButton from "./MarkCompleteButton";

const TutorialChallenge = ({ tutorial, desc, starterFiles, entryFile }) => {
  console.log(starterFiles);
  console.log(tutorial);
  
  return (
    <div className="mt-8 p-6 border border-purple-500/30 bg-black/30 rounded-2xl">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h3 className="text-xl font-semibold text-purple-200">Challenge</h3>
        <MarkCompleteButton tutorial={tutorial} />
      </div>

      <p className="text-gray-300 mb-6">
        {desc}
      </p>
      <p className="text-gray-300 mb-6">
        Try solving this on your own before checking the solution.
      </p>

      <Code files={{
          "/index.html": {code : (starterFiles || "")}
        }} 
          entryFile = {entryFile} />
    </div>
  );
};

export default TutorialChallenge;
