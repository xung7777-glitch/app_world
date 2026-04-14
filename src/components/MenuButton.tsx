import React from 'react';
import { motion } from 'motion/react';

interface MenuButtonProps {
  label: string;
  onClick?: () => void;
  delay?: number;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ label, onClick, delay = 0 }) => {
  return (
    <motion.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full py-5 px-10 relative group cursor-pointer"
    >
      {/* Ink Shadow Effect - More pronounced and "bleeding" */}
      <div className="absolute inset-0 bg-black/15 blur-xl translate-y-3 translate-x-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Main Button Body - Paper/Ink Plaque Style */}
      <div className="absolute inset-0 bg-[#fefefc] border-x-4 border-black/80 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)] group-hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />
        
        {/* Top/Bottom Ink Borders */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-black/60 to-transparent" />
        
        {/* Ink Bleed Hover Effect */}
        <div className="absolute inset-0 bg-black/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-4 w-full">
        {/* Left Decorative Seal Dot */}
        <div className="w-2 h-2 bg-red-900/40 rotate-45 group-hover:bg-red-800/80 transition-all duration-500 group-hover:scale-125 shrink-0" />
        
        <div className="flex flex-col items-center text-center">
          <span className="text-black/80 font-serif text-xl tracking-[0.4em] font-bold group-hover:text-black transition-all duration-500 group-hover:tracking-[0.5em] leading-tight">
            {label.split(' ')[0]}
          </span>
          {label.includes('(') && (
            <span className="text-black/40 font-serif text-xs tracking-[0.2em] mt-1 font-medium">
              {label.substring(label.indexOf('('))}
            </span>
          )}
        </div>
        
        {/* Right Decorative Seal Dot */}
        <div className="w-2 h-2 bg-red-900/40 rotate-45 group-hover:bg-red-800/80 transition-all duration-500 group-hover:scale-125 shrink-0" />
      </div>

      {/* Decorative Ink Splatter (Subtle) */}
      <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-black/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.button>
  );
};
