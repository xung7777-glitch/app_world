import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// 將 Audio 物件放在組件外，確保它在組件重繪時不會被銷毀或重置
const globalAudio = typeof window !== 'undefined' ? new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3") : null;
if (globalAudio) {
  globalAudio.loop = true;
  globalAudio.preload = "auto";
  globalAudio.volume = 0.8; // 維持您要求的 0.8 音量
  // 嘗試在載入時就播放
  globalAudio.play().catch(() => console.log("等待互動以啟動預設開啟的音樂"));
}

export const BackgroundMusic: React.FC = () => {
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!globalAudio) return;

    const playAudio = async () => {
      if (isMusicEnabled) {
        try {
          await globalAudio.play();
          setIsPlaying(true);
        } catch (err) {
          setIsPlaying(false);
          console.log("等待互動以播放音訊...");
        }
      } else {
        globalAudio.pause();
        setIsPlaying(false);
      }
    };

    // 監聽各種互動來啟動
    const unlock = () => {
      if (isMusicEnabled && globalAudio.paused) {
        playAudio();
      }
    };

    // 定期檢查狀態
    const checkInterval = setInterval(() => {
      if (isMusicEnabled && globalAudio.paused) {
        playAudio();
      }
    }, 3000);

    window.addEventListener('mousedown', unlock);
    window.addEventListener('touchstart', unlock);
    window.addEventListener('keydown', unlock);

    playAudio();

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener('mousedown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [isMusicEnabled]);

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !isMusicEnabled;
    setIsMusicEnabled(nextState);
    if (!nextState && globalAudio) {
      globalAudio.pause();
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="absolute top-8 right-8 z-50 p-3 rounded-full bg-slate-900/80 border border-slate-700 backdrop-blur-md shadow-xl hover:bg-slate-800 transition-all group"
      title={isMusicEnabled ? "關閉音樂" : "開啟音樂"}
    >
      {isMusicEnabled ? (
        <Volume2 className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
      ) : (
        <VolumeX className="w-6 h-6 text-slate-500 group-hover:scale-110 transition-transform" />
      )}
    </button>
  );
};
