import React from 'react';
import { Play } from 'lucide-react';

export const YouTubeLink: React.FC = () => {
  return (
    <button 
      onClick={() => window.open("https://www.youtube.com/@XiaoXue168", "_blank")}
      className="absolute top-8 left-8 z-50 flex items-center gap-2 p-3 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md shadow-xl hover:bg-slate-800 transition-all group text-slate-400 hover:text-red-400"
      title="前往 YouTube 頻道"
    >
      <Play className="w-4 h-4 fill-current" /> 
      <span className="text-xs font-bold tracking-wider hidden sm:inline">YouTube 頻道</span>
    </button>
  );
};
