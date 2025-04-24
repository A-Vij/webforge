import axios from "axios";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/user" : "/user"

const MarkCompleteButton = ({ tutorial }) => {
  const [completed, setCompleted] = useState(false);
  console.log(tutorial);
  
  useEffect(() => {
    const checkCompletion = async() => {
        const res = await axios.post(`${API_URL}/check-completion`, {
          tutorialId: tutorial._id
        });
        console.log(res.data);
        setCompleted(res.data.completed);
    };
    checkCompletion();
  }, []);
  const handleMarkComplete = async () => {
    try {
      const res = await axios.post(`${API_URL}/mark-completed`, {
        tutorial,
      });
      setCompleted(true);
      toast.success(`${res.data.message}`, {
        style: {
            background: "#1a1a2e",  // Dark background
            color: "#e0e0ff",     // Light text
            border: "1px solid #7a00ff",  // Purple border
            boxShadow: "0 0 10px #7a00ff",
        },
        iconTheme: {
            primary: "#7a00ff",
            secondary: "#1a1a2e",
        },
      });
      toast.success(`Gained 50XP`, {
        style: {
            background: "#1a1a2e",  // Dark background
            color: "#e0e0ff",     // Light text
            border: "1px solid #7a00ff",  // Purple border
            boxShadow: "0 0 10px #7a00ff",
        },
        iconTheme: {
            primary: "#7a00ff",
            secondary: "#1a1a2e",
        },
      });
    } catch (err) {
      setCompleted(false);  
      toast.error(err.message || "Completion Failed!", {
          style: {
              background: "#1a1a2e",
              color: "#e0e0ff",
              border: "1px solid red",
              boxShadow: "0 0 10px red",
          },
          iconTheme: {
              primary: "red",
              secondary: "#1a1a2e",
          },
      });
      console.error("Error marking as complete", err);
    }
  };

  return (
    <button
      onClick={handleMarkComplete}
      disabled={completed}
      className="px-4 py-2 bg-purple-600 text-white rounded-full cursor-pointer hover:bg-purple-700 transition-all"
    >
      {!completed ? "Mark as Completed" : "Completed"}
    </button>
  );
};

export default MarkCompleteButton;
