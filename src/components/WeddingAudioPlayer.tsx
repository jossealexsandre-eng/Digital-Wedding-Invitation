import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';

interface WeddingAudioPlayerProps {
  isInvitationOpen: boolean;
}

export const WeddingAudioPlayer: React.FC<WeddingAudioPlayerProps> = ({ isInvitationOpen }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play audio automatically when user opens the invitation
  useEffect(() => {
    if (isInvitationOpen && audioRef.current) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          // Browser autoplay restriction fallback
          console.warn('[Audio Player] Autoplay blocked, user interaction required:', err);
          setIsPlaying(false);
        });
    }
  }, [isInvitationOpen]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('[Audio Player] Play error:', err));
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/sampai-jadi-debu.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Audio Control Button */}
      <div
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-300"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Floating song title capsule badge on hover or when playing */}
        <div
          className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FAF7F2]/95 border border-[#D8C6A8] shadow-md backdrop-blur-sm text-[11px] text-[#252321] transition-all duration-300 pointer-events-none select-none ${
            showTooltip ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
          }`}
        >
          <Music className="w-3.5 h-3.5 text-[#B59A6A] animate-pulse" />
          <span className="font-serif italic text-[#A38755]">Banda Neira</span>
          <span className="text-[#8C7F6E]">• Sampai Jadi Debu (Instrumental)</span>
        </div>

        {/* Round Glassmorphism Music Toggle Button */}
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
          className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer border ${
            isPlaying
              ? 'bg-[#252321] text-[#FAF7F2] border-[#B59A6A] hover:bg-[#36322F]'
              : 'bg-[#FAF7F2] text-[#8C7F6E] border-[#D8C6A8] hover:border-[#B59A6A] hover:text-[#252321]'
          }`}
        >
          {isPlaying ? (
            <>
              {/* Rotating vinyl disk animation */}
              <Disc className="w-5 h-5 text-[#E5D8C3] animate-spin [animation-duration:4s]" />
              {/* Subtle sound wave ping indicator */}
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B59A6A] opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#B59A6A]" />
              </span>
            </>
          ) : (
            <VolumeX className="w-5 h-5 text-[#8C7F6E]" />
          )}
        </button>
      </div>
    </>
  );
};
