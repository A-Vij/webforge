import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/tutorials" : "/tutorials"

const Sidebar = () => {

  const {slug, topic} = useParams();
  const [tutorials, setTutorials] = useState({});
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const isActive = (curr) =>  slug === curr;

  const handleClick = (path) => navigate(`/tutorials/${topic}/${path}`);
  // console.log(tutorials);
  
  // console.log(slug);
  
  useEffect(() => {
    axios
      .post(`${API_URL}/${slug}`)
      .then((res) => {
        // console.log(res.data.tutorials);
        // console.log(res);
        setTutorials(res.data.tutorials);
        // console.log(tutorials);
        // setTutorial(res.data.tutorial);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tutorials:", err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <LoadingSpinner />;
  return (
  <>
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="fixed top-6 left-6 z-60 bg-purple-600 text-white p-2 rounded-lg shadow-lg flex items-center"
    >
      {!isOpen ? <PanelLeftOpen size={24} /> : <PanelLeftClose size={24} />} 
    </button>
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -350 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 left-0 z-50 bg-black md:bg-black/75 border border-white/10 p-6 rounded-r-2xl shadow-lg min-h-screen w-64 md:w-84 flex flex-col"
    >

      {/* {isOpen && <div
        className="fixed left-1/6 bg-black/60 inset-0  z-40"
        onClick={() => setIsSidebarOpen(false)}
      ></div>} */}



      {/* <div className="flex justify-end mb-4">
        <button
          className="text-white bg-purple-500 rounded-full px-3"
          onClick={onClose}
        >
          ✕
        </button>
      </div> */}

      
      {!tutorials ? <LoadingSpinner />  : 
      <h2 className="text-xl mt-14 font-bold text-indigo-300">{tutorials[0]?.topic}</h2> }
      <div className="overflow-y-auto flex-grow pr-2 mt-4 space-y-2">
        {tutorials.map((tutorial, index) => (
          <div key={index}>
            <button
              // onClick={() => {navigate(`/tutorials/${tutorial.slug}`); }}
              onClick={() => { handleClick(tutorial.slug); } }
              
              className={`w-full text-left px-3 py-2 rounded-lg border border-purple-500 text-white transition-colors ${ (!isActive(tutorial.slug)) ? "hover:bg-purple-500" : "bg-purple-500"} `}
            >
              {tutorial.title}
            </button>

            
            {/* {expandedTutorial === tutorial.id && (
              <div className="mt-2 space-y-1 pl-4">
                {tutorial.pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      console.log("hello");
                      
                      navigate(`/${page.slug}`);
                      onClose(); 
                    }}
                    className="w-full text-left px-3 py-1 text-sm text-purple-300 hover:underline"
                  >
                    {page.title}
                  </button>
                ))}
              </div>
            )} */}
          </div>
        ))}
      </div>
    </motion.div>
  </>
  );
};

export default Sidebar;
