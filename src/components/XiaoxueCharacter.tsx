import React from 'react';
import { motion } from 'motion/react';

export const XiaoxueCharacter: React.FC = () => {
  const palette = {
    hair: "#121212",
    skin: "#FFF0E5",
    dressWhite: "#FFFFFF",
    dressBlue: "#BDE0F5",
    dressAccent: "#7FB3D5",
    eye: "#2C3E50",
    lip: "#E9967A",
    markPink: "#FF69B4",
    markPurple: "#DDA0DD"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      className="relative w-64 h-80 flex items-center justify-center"
    >
      <svg viewBox="0 0 200 250" className="w-full h-full drop-shadow-2xl">
        {/* Back Hair */}
        <path d="M70 60 Q100 40 130 60 L140 220 Q100 240 60 220 Z" fill={palette.hair} />

        {/* Outer Robe Sleeves (Translucent) */}
        <path d="M60 110 Q20 130 30 180 Q60 200 80 160 Z" fill={palette.dressBlue} opacity="0.4" />
        <path d="M140 110 Q180 130 170 180 Q140 200 120 160 Z" fill={palette.dressBlue} opacity="0.4" />

        {/* Body / Dress Layers */}
        <path d="M75 100 L125 100 L145 240 Q100 250 55 240 Z" fill={palette.dressWhite} />
        <path d="M85 100 L115 100 L130 240 L70 240 Z" fill={palette.dressBlue} opacity="0.6" />
        
        {/* Collar / Neckline */}
        <path d="M85 100 L100 130 L115 100" fill="none" stroke={palette.dressAccent} strokeWidth="2" />
        <path d="M90 100 L100 120 L110 100" fill="none" stroke={palette.dressAccent} strokeWidth="1" opacity="0.5" />

        {/* Neck */}
        <rect x="92" y="85" width="16" height="20" fill={palette.skin} />

        {/* Face Shape (Smoother, rounder chin) */}
        <path d="M75 50 C75 95 125 95 125 50 Q125 20 100 20 Q75 20 75 50" fill={palette.skin} />

        {/* Facial Features */}
        {/* Eyes */}
        <ellipse cx="88" cy="62" rx="4" ry="2" fill={palette.eye} />
        <ellipse cx="112" cy="62" rx="4" ry="2" fill={palette.eye} />
        <path d="M84 60 Q88 58 92 60" fill="none" stroke={palette.hair} strokeWidth="0.5" />
        <path d="M108 60 Q112 58 116 60" fill="none" stroke={palette.hair} strokeWidth="0.5" />

        {/* Lips (Subtle and higher up) */}
        <path d="M95 80 Q100 82 105 80" fill="none" stroke={palette.lip} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M97 83 Q100 84 103 83" fill="none" stroke={palette.lip} strokeWidth="0.5" opacity="0.5" />

        {/* Forehead Mark (Pink Flame) */}
        <path d="M98 40 Q100 32 102 40 Q100 45 98 40" fill={palette.markPink} />

        {/* Cheek Marks (Purple Lightning) */}
        <path d="M80 68 L84 72 L82 76" fill="none" stroke={palette.markPurple} strokeWidth="0.5" opacity="0.7" />
        <path d="M120 68 L116 72 L118 76" fill="none" stroke={palette.markPurple} strokeWidth="0.5" opacity="0.7" />

        {/* Hair (Front & Strands) */}
        <path d="M75 55 Q75 25 100 25 Q125 25 125 55 Q125 75 115 85" fill="none" stroke={palette.hair} strokeWidth="8" strokeLinecap="round" />
        <path d="M75 55 Q75 75 85 85" fill="none" stroke={palette.hair} strokeWidth="8" strokeLinecap="round" />
        <path d="M75 45 Q100 20 125 45" fill={palette.hair} />
        
        {/* Long Strands framing face */}
        <path d="M78 60 Q72 100 75 140" fill="none" stroke={palette.hair} strokeWidth="2" opacity="0.9" />
        <path d="M122 60 Q128 100 125 140" fill="none" stroke={palette.hair} strokeWidth="2" opacity="0.9" />

        {/* Floating Ice Particles (Subtle) */}
        <motion.g
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M40 60 L45 55 L50 60 L45 65 Z" fill={palette.dressBlue} opacity="0.5" />
          <path d="M160 80 L165 75 L170 80 L165 85 Z" fill={palette.dressBlue} opacity="0.5" />
          <path d="M50 200 L55 195 L60 200 L55 205 Z" fill={palette.dressBlue} opacity="0.3" />
        </motion.g>
      </svg>
      
      {/* Ground Shadow */}
      <div className="absolute bottom-4 w-40 h-8 bg-black/5 rounded-full blur-2xl -z-10" />
    </motion.div>
  );
};
