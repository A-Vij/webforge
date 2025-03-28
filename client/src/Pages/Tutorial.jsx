import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Tutorials from "./Tutorials";
import Sidebar from "../Components/Sidebar";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react"; // Import your chosen icon

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/tutorials" : "/tutorials"

const Tutorial = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    axios
      .post(`${API_URL}/${slug}`)
      .then((res) => {
        setTutorials(res.data.tutorials || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutorials:", err);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="relative min-h-screen">
      {/* Sidebar - Works the same on all screen sizes */}
      {isSidebarOpen && (
        <>
          <Sidebar
            tutorials={tutorials}
            onSelect={(slug) => {
              navigate(`/tutorials/${slug}`);
            }}
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
          {/* Dark Overlay */}
          <div
            className="fixed  inset-0  z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </>
      )}

      {/* Toggle Button (using Lucide React Icon) */}
      {tutorials.length > 0 && <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-6 left-4 z-50 bg-purple-600 text-white p-2 rounded-lg shadow-lg flex items-center"
      >
        {!isSidebarOpen ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />} {/* Lucide icon */}
      </button>}

      {/* Main Content */}
      <div className="w-full p-4">
        <Tutorials key={slug} />
      </div>
    </div>
  );
};

export default Tutorial;
