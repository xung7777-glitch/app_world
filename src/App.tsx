import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { InkBackground } from './components/InkBackground';
import { MenuButton } from './components/MenuButton';
import { BackgroundMusic } from './components/BackgroundMusic';
import { YouTubeLink } from './components/YouTubeLink';

export default function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const menuItems = [
    { label: '邊疆修仙', url: 'https://ais-pre-pjls4e3htzaffmjhosnigt-381906535429.asia-northeast1.run.app' },
    { label: '御劍飛行 (建構中)', action: () => console.log('御劍飛行') },
    { label: '渡劫試煉 (建構中)', action: () => console.log('渡劫試煉') },
    { label: '打坐修煉 (建構中)', action: () => console.log('打坐修煉') },
    { label: '煉丹系統 (建構中)', action: () => console.log('煉丹系統') },
    { label: '秘境探索 (建構中)', action: () => console.log('秘境探索') }
  ];

  // Mouse Drag Scrolling for PC
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      // Only drag if clicking on the container background, not on buttons
      if ((e.target as HTMLElement).closest('button')) return;
      
      isDragging.current = true;
      container.style.cursor = 'grabbing';
      startY.current = e.pageY - container.offsetTop;
      scrollTop.current = container.scrollTop;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const y = e.pageY - container.offsetTop;
      const walk = (y - startY.current) * 1.5;
      container.scrollTop = scrollTop.current - walk;
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      container.style.cursor = 'default';
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className="relative h-screen bg-[#121212] notranslate select-none overflow-hidden flex flex-col" 
      translate="no"
    >
      {/* Fixed Header Area within App Bounds */}
      <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-[430px] mx-auto relative h-24 pointer-events-auto">
          <BackgroundMusic />
          <YouTubeLink />
        </div>
      </div>

      <div 
        ref={scrollContainerRef}
        className="game-container flex-1 pt-24 pb-24 px-8 overflow-y-auto scrolling-touch relative"
      >
        {/* Background Layer */}
        <div className="ink-bg-wrapper">
          <InkBackground />
        </div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-10 text-center mb-2 pointer-events-none flex flex-col items-center"
        >
          <div className="relative">
            {/* Red Seal Style Decoration - Moved further left to prevent text from being obscured by avatar */}
            <div className="absolute -left-16 top-0 w-40 h-32 border-4 border-red-800/60 flex items-center justify-center -rotate-12 bg-red-800/10 backdrop-blur-[2px] shadow-[0_0_20px_rgba(153,27,27,0.2)] z-0">
              <span className="text-red-800 text-[32px] font-bold leading-[1.2] tracking-tighter font-serif text-center px-2">
                小雪的<br/>修仙世界
              </span>
            </div>

            {/* Avatar Image - Placed AFTER the seal with higher z-index to be on top */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 mb-0 relative overflow-hidden z-10">
              <img 
                src="https://raw.githubusercontent.com/xung7777-glitch/my-images/main/snow01-1.png" 
                alt="小雪" 
                className="w-full h-full object-contain object-top drop-shadow-[0_0_15px_rgba(0,0,0,0.2)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent mb-0" />
        </motion.div>

        {/* Menu Section */}
        <div className="relative z-10 w-full max-w-xs mb-16 flex flex-col gap-4">
          {menuItems.map((item, index) => (
            <MenuButton 
              key={item.label} 
              label={item.label} 
              delay={0.5 + index * 0.1} 
              onClick={() => {
                if ('url' in item) {
                  window.location.href = item.url;
                } else if ('action' in item) {
                  item.action();
                }
              }}
            />
          ))}
        </div>

        {/* Footer Decoration */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 2 }}
          className="relative z-10 text-[10px] tracking-[0.4em] text-black/40 uppercase pb-12 pointer-events-none"
        >
          空靈 · 簡潔 · 意境
        </motion.div>
      </div>
    </div>
  );
}
