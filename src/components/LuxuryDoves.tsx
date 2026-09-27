import React, { useEffect, useState, useRef } from 'react';

/**
 * LUXURY ARTISANAL DOVE / SILHOUETTE FLOCK ANIMATION SYSTEM
 * Exquisite, slim, high-fashion silhouette-based doves in rich editorial obsidian black.
 * Features slender aerodynamic anatomy, delicate tapered primary flight feathers,
 * elongated calligraphy-inspired tail streams, and organic wing-glide dynamics.
 */

interface DoveProps {
  className?: string;
  style?: React.CSSProperties;
  scale?: number;
  opacity?: number;
  flipX?: boolean;
  wingSpeed?: 'slow' | 'normal' | 'fast';
  blur?: number;
  tint?: 'noir' | 'charcoal' | 'ivory';
}

export const RealisticDoveSVG: React.FC<DoveProps> = ({
  className = '',
  style = {},
  scale = 1,
  opacity = 0.95,
  flipX = false,
  wingSpeed = 'normal',
  blur = 0,
  tint = 'noir',
}) => {
  const gradId = React.useId().replace(/:/g, '');

  // Rich obsidian noir and charcoal palettes (pure refined black aesthetic)
  const getBodyGradient = () => {
    switch (tint) {
      case 'ivory':
        return (
          <>
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="60%" stopColor="#F5EFE6" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#E2D4C0" stopOpacity="0.85" />
          </>
        );
      case 'charcoal':
        return (
          <>
            <stop offset="0%" stopColor="#2E2B28" />
            <stop offset="55%" stopColor="#1D1B19" />
            <stop offset="100%" stopColor="#121110" />
          </>
        );
      case 'noir':
      default:
        // Deep obsidian noir with velvet depth
        return (
          <>
            <stop offset="0%" stopColor="#1C1A18" />
            <stop offset="50%" stopColor="#100F0E" />
            <stop offset="100%" stopColor="#050505" />
          </>
        );
    }
  };

  const getWingGradient = () => {
    switch (tint) {
      case 'ivory':
        return (
          <>
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
            <stop offset="65%" stopColor="#EDE2D3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#D5C5B0" stopOpacity="0.8" />
          </>
        );
      case 'charcoal':
        return (
          <>
            <stop offset="0%" stopColor="#36322E" />
            <stop offset="55%" stopColor="#22201D" />
            <stop offset="100%" stopColor="#141312" />
          </>
        );
      case 'noir':
      default:
        return (
          <>
            <stop offset="0%" stopColor="#24211F" />
            <stop offset="50%" stopColor="#141312" />
            <stop offset="100%" stopColor="#080707" />
          </>
        );
    }
  };

  const wingClass =
    wingSpeed === 'fast'
      ? 'dove-wing-fast'
      : wingSpeed === 'slow'
      ? 'dove-wing-slow'
      : 'dove-wing-normal';

  // Fine hairline gold etching (delicate lithograph detail)
  const etchingColor = tint === 'ivory' ? '#D8C6A8' : '#D4C4AA';
  const etchingOpacity = tint === 'ivory' ? 0.6 : 0.3;

  return (
    <div
      className={`pointer-events-none select-none inline-block ${className}`}
      style={{
        transform: `scale(${scale}) ${flipX ? 'scaleX(-1)' : ''}`,
        opacity,
        filter:
          blur > 0
            ? `blur(${blur}px)`
            : tint === 'ivory'
            ? 'drop-shadow(0 2px 4px rgba(181, 154, 106, 0.18))'
            : 'drop-shadow(0 2px 5px rgba(15, 14, 13, 0.25))',
        willChange: 'transform, opacity',
        ...style,
      }}
      aria-hidden="true"
    >
      <svg
        width="34"
        height="26"
        viewBox="0 0 80 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        <defs>
          <linearGradient
            id={`bodyGrad_${gradId}`}
            x1="12"
            y1="18"
            x2="74"
            y2="45"
            gradientUnits="userSpaceOnUse"
          >
            {getBodyGradient()}
          </linearGradient>
          <linearGradient
            id={`wingGrad_${gradId}`}
            x1="18"
            y1="4"
            x2="48"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            {getWingGradient()}
          </linearGradient>
        </defs>

        {/* 1. Far/Background Wing (Slim, swept-back wing layer) */}
        <g
          className={`dove-far-wing ${wingClass}`}
          style={{ transformOrigin: '33px 25px' }}
        >
          {/* Slender background wing silhouette */}
          <path
            d="M 33 25 C 34 18 33 11 28 4 C 26 9 25 13 24 16 C 24 12 22 9 20 8 C 21 12 21 16 19 18 C 18 14 16 12 14 12 C 16 17 19 22 24 24 C 27 25 30 25 33 25 Z"
            fill={`url(#wingGrad_${gradId})`}
            opacity="0.82"
          />
          {/* Subtle far feather hairline quill */}
          <path
            d="M 31 23 C 29 16 27 10 24 6 M 28 24 C 25 18 22 13 18 10"
            stroke={etchingColor}
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity={etchingOpacity * 0.7}
          />
        </g>

        {/* 2. Slender Elegant Torso, Arched Neck, Delicate Beak, and Streamlined Tail */}
        <g>
          {/* Slim Body & Streamlined Head */}
          <path
            d="M 72 23.5 C 68 22.5 65 21 59 20 C 51 20.5 45 23.5 39 26.5 C 33 28.5 27 30.5 22 32.5 C 18 34.5 12 37.5 5 43.5 C 8 42.5 12 40.5 15 38.5 C 10 43.5 6 47.5 2 49.5 C 7 47.5 12 44.5 16 42.5 C 11 48 7 52.5 5 54.5 C 11 49.5 17 43.5 23 37 C 28 36 33 35 38 34 C 46 33 54 30.5 60 27 C 64 25 67 24.5 69 24 Z"
            fill={`url(#bodyGrad_${gradId})`}
          />

          {/* Delicate Head & Slender Beak Precision Layer */}
          <path
            d="M 59 20 C 62 20 65 20.8 68 22.2 L 72.5 23.5 C 69.5 24.8 66.5 25.5 63 26 C 60 26.5 58 24.5 56 23 C 57 21.5 58 20.5 59 20 Z"
            fill={`url(#bodyGrad_${gradId})`}
          />

          {/* Calligraphic Tail Streamers Detail */}
          <path
            d="M 23 35 C 18 39 12 44 6 49 M 22 37 C 16 44 11 49 5 54"
            stroke={etchingColor}
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity={etchingOpacity * 0.85}
          />

          {/* Refined Throat & Breast Contour Line */}
          <path
            d="M 44 33 C 51 31.5 57 29 62 26"
            stroke={etchingColor}
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity={etchingOpacity * 0.75}
          />
        </g>

        {/* 3. Near/Foreground Wing (Articulated at 38px 27px) */}
        <g
          className={`dove-near-wing ${wingClass}`}
          style={{ transformOrigin: '38px 27px' }}
        >
          {/* Main Slender High-Fashion Wing Silhouette */}
          <path
            d="M 38 27 C 42 22 45 15 43 4 C 40 8 38 13 37 15 C 37 11 36 7 34 6 C 35 11 34 15 32 17 C 32 13 31 10 29 9 C 30 14 30 17 28 20 C 27 16 25 14 23 14 C 24 19 26 23 28 25 C 31 26 35 27 38 27 Z"
            fill={`url(#wingGrad_${gradId})`}
          />

          {/* Wing Base Covert Plumes */}
          <path
            d="M 38 27 C 39 23 42 18 43 14 C 41 18 39 23 38 27 Z"
            fill={`url(#bodyGrad_${gradId})`}
            opacity="0.9"
          />

          {/* Delicate Wing Quill Etchings */}
          <path
            d="M 38 25 C 41 18 42 12 41 5 M 36 25 C 38 18 38 12 35 7 M 34 26 C 35 20 34 15 31 10 M 32 26 C 32 21 31 17 29 12"
            stroke={etchingColor}
            strokeWidth="0.45"
            strokeLinecap="round"
            opacity={etchingOpacity}
          />
        </g>
      </svg>
    </div>
  );
};

/**
 * 1. OPENING SCREEN DOVES FLOCK
 * Gracefully arranged in an organic flying formation across the ivory stationery cover.
 * Smaller, delicate, high-contrast black editorial silhouettes.
 */
interface OpeningDovesProps {
  isTransitioning: boolean;
  onTransitionComplete?: () => void;
  mousePos?: { x: number; y: number };
}

export const OpeningDoves: React.FC<OpeningDovesProps> = ({
  isTransitioning,
}) => {
  const [deviceCount, setDeviceCount] = useState(6);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const updateCount = () => {
      const width = window.innerWidth;
      if (width < 640) setDeviceCount(3); // Mobile: 3 graceful birds
      else if (width < 1024) setDeviceCount(5); // Tablet: 5 birds
      else setDeviceCount(7); // Desktop: 7 birds in balanced poetic formation
    };

    updateCount();
    window.addEventListener('resize', updateCount);
    return () => window.removeEventListener('resize', updateCount);
  }, []);

  if (isReducedMotion) {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 flex items-center justify-center opacity-30">
        <RealisticDoveSVG scale={0.55} opacity={0.6} tint="noir" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {/* Dove 1: Majestic Lead Bird — Smooth diagonal arc bottom-left to upper-right */}
      <div
        className={`absolute dove-path-1 ${
          isTransitioning ? 'dove-swoop-camera' : ''
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <RealisticDoveSVG
          scale={0.50}
          opacity={0.96}
          wingSpeed={isTransitioning ? 'fast' : 'normal'}
          tint="noir"
        />
      </div>

      {/* Dove 2: High Sky Soaring Companion — Gliding across upper sky right-to-left */}
      {deviceCount >= 2 && (
        <div
          className={`absolute dove-path-2 ${
            isTransitioning ? 'opacity-0 transition-opacity duration-700' : ''
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <RealisticDoveSVG
            scale={0.36}
            opacity={0.88}
            wingSpeed="slow"
            tint="noir"
            flipX={true}
          />
        </div>
      )}

      {/* Dove 3: Trailing Companion — Glides upward in formation with Lead Bird */}
      {deviceCount >= 3 && (
        <div
          className={`absolute dove-path-3 ${
            isTransitioning ? 'dove-swoop-secondary' : ''
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <RealisticDoveSVG
            scale={0.42}
            opacity={0.92}
            wingSpeed="normal"
            tint="noir"
          />
        </div>
      )}

      {/* Dove 4: Distant Sky Bird (subtle depth) — High altitude tranquil drift */}
      {deviceCount >= 4 && (
        <div
          className={`absolute dove-path-4 ${
            isTransitioning ? 'opacity-0 transition-opacity duration-700' : ''
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <RealisticDoveSVG
            scale={0.28}
            opacity={0.72}
            wingSpeed="slow"
            tint="charcoal"
            blur={0.3}
          />
        </div>
      )}

      {/* Dove 5: Lower Horizon Glider — Graceful sweep across lower-middle */}
      {deviceCount >= 5 && (
        <div
          className={`absolute dove-path-5 ${
            isTransitioning ? 'opacity-0 transition-opacity duration-500' : ''
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <RealisticDoveSVG
            scale={0.38}
            opacity={0.85}
            wingSpeed="normal"
            tint="noir"
          />
        </div>
      )}

      {/* Dove 6: Gentle High Right Soarer */}
      {deviceCount >= 6 && (
        <div
          className={`absolute dove-path-6 ${
            isTransitioning ? 'opacity-0 transition-opacity duration-500' : ''
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <RealisticDoveSVG
            scale={0.32}
            opacity={0.78}
            wingSpeed="slow"
            tint="noir"
            flipX={true}
          />
        </div>
      )}

      {/* Dove 7: Subtle Foreground Depth Accent */}
      {deviceCount >= 7 && (
        <div
          className={`absolute dove-path-7 ${
            isTransitioning ? 'opacity-0 transition-opacity duration-500' : ''
          }`}
          style={{ willChange: 'transform, opacity' }}
        >
          <RealisticDoveSVG
            scale={0.35}
            opacity={0.82}
            wingSpeed="normal"
            tint="charcoal"
          />
        </div>
      )}

      {/* Cinematic White/Ivory Transition Veil during Opening (1.9s) */}
      <div
        className={`absolute inset-0 bg-[#FAF7F2] transition-opacity duration-[1900ms] ease-out pointer-events-none ${
          isTransitioning ? 'opacity-90' : 'opacity-0'
        }`}
      />
    </div>
  );
};

/**
 * 2. AMBIENT SECTION DOVES (In-Page)
 * Appears gracefully across Hero, Our Story, Gallery, and Closing horizon.
 */

// Hero sky dove flock: 2 birds in tandem crossing upper hero
export const HeroSkyDove: React.FC = () => {
  return (
    <div className="absolute top-12 left-0 w-full h-44 pointer-events-none overflow-hidden z-10">
      {/* Lead Hero Bird */}
      <div className="absolute dove-hero-path">
        <RealisticDoveSVG
          scale={0.38}
          opacity={0.92}
          wingSpeed="normal"
          tint="noir"
        />
      </div>
      {/* Companion Bird */}
      <div className="absolute dove-hero-companion-path">
        <RealisticDoveSVG
          scale={0.28}
          opacity={0.82}
          wingSpeed="slow"
          tint="charcoal"
        />
      </div>
    </div>
  );
};

// Section Scroll-Triggered Dove (Our Story & Gallery)
interface SectionDoveProps {
  direction?: 'left-to-right' | 'right-to-left';
  speed?: 'slow' | 'normal';
  scale?: number;
  opacity?: number;
  tint?: 'noir' | 'charcoal' | 'ivory';
  className?: string;
}

export const SectionAmbientDove: React.FC<SectionDoveProps> = ({
  direction = 'left-to-right',
  speed = 'slow',
  scale = 0.36,
  opacity = 0.85,
  tint = 'noir',
  className = '',
}) => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '80px 0px 80px 0px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {inView && (
        <div className="relative w-full h-full">
          {/* Main Section Bird */}
          <div
            className={`absolute ${
              direction === 'left-to-right' ? 'dove-ambient-ltr' : 'dove-ambient-rtl'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <RealisticDoveSVG
              scale={scale}
              opacity={opacity}
              wingSpeed={speed === 'slow' ? 'slow' : 'normal'}
              flipX={direction === 'right-to-left'}
              tint={tint}
            />
          </div>

          {/* Gentle Second Bird in Soft Tandem */}
          <div
            className={`absolute ${
              direction === 'left-to-right' ? 'dove-ambient-ltr-2' : 'dove-ambient-rtl-2'
            }`}
            style={{ willChange: 'transform, opacity' }}
          >
            <RealisticDoveSVG
              scale={scale * 0.75}
              opacity={opacity * 0.85}
              wingSpeed="slow"
              flipX={direction === 'right-to-left'}
              tint={tint === 'ivory' ? 'ivory' : 'charcoal'}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Closing Section Horizon Doves (Requirement #11)
// 3 birds flying together into distance, shrinking and fading into the horizon.
export const HorizonClosingDoves: React.FC = () => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '60px 0px 60px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-x-0 bottom-0 top-0 pointer-events-none overflow-hidden z-10">
      {inView && (
        <div className="relative w-full h-full">
          {/* Lead Dove */}
          <div className="absolute dove-horizon-lead">
            <RealisticDoveSVG
              scale={0.40}
              opacity={0.92}
              wingSpeed="normal"
              tint="noir"
            />
          </div>
          {/* Companion Dove 1 */}
          <div className="absolute dove-horizon-companion">
            <RealisticDoveSVG
              scale={0.30}
              opacity={0.85}
              wingSpeed="slow"
              tint="charcoal"
            />
          </div>
          {/* Companion Dove 2 (Distant third bird) */}
          <div className="absolute dove-horizon-third">
            <RealisticDoveSVG
              scale={0.24}
              opacity={0.78}
              wingSpeed="slow"
              tint="noir"
            />
          </div>
        </div>
      )}
    </div>
  );
};
