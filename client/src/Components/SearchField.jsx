import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchField = ({ onSearch }) => {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mb-8">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center transition-all duration-300"
      >
        <button
          type="button"
          onClick={() => setIsExpanded(true)}
          className="absolute left-3 text-gray-400 hover:text-purple-400"
        >
          <Search size={20} />
        </button>
        
        <input
          type="text"
          placeholder="Search tutorials, quests, challenges..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          className="w-full bg-slate-900 border border-purple-700 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent shadow-md text-white placeholder-gray-500 transition-all duration-300"
        />
        
        {isExpanded && (
          <button
            type="submit"
            className="absolute right-3 bg-purple-600 text-white rounded-full p-2 hover:bg-purple-500 transition-colors"
          >
            <Search size={16} />
          </button>
        )}
      </form>
    </div>
  );
};
