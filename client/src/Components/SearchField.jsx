import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import axios from 'axios';


const API_URL = import.meta.env.MODE === "development" ? "http://localhost:8000/tutorials" : "/tutorials"

export const SearchField = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      if (searchQuery.trim()) {
        try {
          const res = await axios.post(`${API_URL}/search-titles?q=${searchQuery}`);
          // console.log(res.data);
          setMatches(res.data); 
          setShowDropdown(true);
        } catch (err) {
          setMatches([]);
          setShowDropdown(false);
        }
      } else {
        setMatches([]);
        setShowDropdown(false);
      }
    };

    fetchMatches();
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      setShowDropdown(false);
    }
  };

  const handleMatchClick = (tut) => {
    setSearchQuery(tut.title);
    onSearch(tut.title);
    navigate(`/tutorials/${tut.topic.toLowerCase()}/${tut.slug}`);
    setShowDropdown(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8 relative">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center transition-all duration-300"
      >
        <button
          type="button"
          className="absolute left-3 text-gray-400 hover:text-purple-400"
        >
          <Search size={20} />
        </button>
        
        <input
          type="text"
          placeholder="Search tutorials, quests, challenges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length > 0 && setShowDropdown(true)}
          onBlur={() => setTimeout(() => setShowDropdown(false), 150)} 
          className="w-full bg-slate-900 border border-purple-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-md text-white placeholder-gray-500 transition-all duration-300"
        />
        
        <button
          type="submit"
          className="absolute right-3 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-500 transition-colors"
        >
          <Search size={16} />
        </button>
      </form>

      {showDropdown && matches.length > 0 && (
  <ul className="absolute left-0 right-0 bg-black/80 border border-purple-700 rounded-xl mt-2 shadow-2xl backdrop-blur-md z-50 max-h-60 overflow-y-auto">
    {matches.map((tut, index) => (
      <li
        key={index}
        onMouseDown={() => handleMatchClick(tut)}
        className="px-4 py-2 cursor-pointer text-indigo-300 hover:bg-purple-700 hover:text-white transition-all duration-200 text-sm md:text-base"
      >
        {tut.title}
      </li>
    ))}
  </ul>
)}

    </div>
  );
};
