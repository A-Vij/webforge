import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Tutorials from "./Tutorials";
import Sidebar from "../Components/Sidebar";
import { PanelLeftOpen, PanelLeftClose, AlertCircle, ArrowRight } from "lucide-react"; 
import LoadingSpinner from "../Components/LoadingSpinner";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/tutorials" : "/tutorials"

const Tutorial = () => {
  const { slug } = useParams();
  const [path, setPath] = useState("");
  const navigate = useNavigate();
  const [tutorials, setTutorials] = useState({});
  const [tutorial, setTutorial] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 
  const [error, setError] = useState(false);


  const handleClick = (path) => {navigate(`/tutorials/${path}`);}

  useEffect(() => {
    setTutorials({});
    setTutorial({});
    setLoading(true);
    setIsSidebarOpen(false);
    axios
      .post(`${API_URL}/${slug}`)
      .then((res) => {
        // console.log(res.data.tutorial);
        setTutorials(res.data.tutorials);
        setTutorial(res.data.tutorial);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutorials:", err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading)
    return <LoadingSpinner />

  if (error) {
    return (
    <div className="min-h-screen flex items-center justify-center">
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col justify-center bg-black/30 items-center py-20 border border-purple-600/50 rounded-2xl shadow-lg max-w-4xl p-6"
    >
        <AlertCircle className="h-16 w-16 mx-auto text-purple-400 mb-4" />
        <p className="text-gray-300 font-medium text-center">No tutorials available. Check back later!</p>
        <Link to="/topics">
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all flex items-center gap-2">
                Explore Other Tutorials
                <ArrowRight className="w-5 h-5" />
            </button>
        </Link>
    </motion.div>
    </div>
    );
  }
  return (
    
    
    <div className="relative min-h-screen">
      <div className="w-full p-4">
        <Tutorials slug = {slug} tutorial={tutorial}/>
      </div>
      
    </div>
  );
};

export default Tutorial;
