import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Church,
  Wine,
  Sparkles,
  MapPin,
  Copy,
  Check,
  Gift,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Heart,
  Mail,
  Send,
  CheckCircle2,
  Bell,
  ExternalLink,
  QrCode,
  ChevronDown,
  ChevronUp,
  Car,
  Baby,
  Train,
  Clock,
  HelpCircle,
  Phone,
  Share2,
  Instagram,
  Link2,
  Utensils,
  Armchair,
  Pause,
  Play,
} from 'lucide-react';
import {
  OpeningDoves,
  HeroSkyDove,
  SectionAmbientDove,
  HorizonClosingDoves,
} from './components/LuxuryDoves';
import { InstagramStoryShareModal } from './components/InstagramStoryShareModal';
import { WeddingAudioPlayer } from './components/WeddingAudioPlayer';

const DIETARY_OPTIONS = [
  { id: 'standard', label: 'Standard / No Restrictions' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'halal', label: 'Halal Certified' },
  { id: 'gluten-free', label: 'Gluten-Free' },
  { id: 'dairy-free', label: 'Dairy-Free' },
  { id: 'nut-free', label: 'Nut / Peanut Allergy' },
  { id: 'no-pork', label: 'No Pork / Lard' },
  { id: 'pescatarian', label: 'Pescatarian' },
];

const TABLE_PREFERENCES = [
  'General Guest Seating (Standard)',
  'Family & Relatives Table',
  "Bride's Friends & Alumni",
  "Groom's Friends & Alumni",
  'Colleagues & Professional Network',
  'Near Stage & Dance Floor (Lively)',
  'Quiet / Perimeter Seating (Relaxed)',
];

interface Wish {
  id: string;
  name: string;
  text: string;
  timestamp?: string;
}

interface GalleryPhoto {
  src: string;
  caption: string;
  aspect?: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=90',
    caption: 'The Wedding Couple — Editorial Portrait',
  },
  {
    src: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=1600&q=90',
    caption: 'Bespoke Solitaire Ring',
  },
  {
    src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=1600&q=90',
    caption: 'Champagne Toast Celebration',
  },
  {
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=90',
    caption: 'Bridal Elegance',
  },
  {
    src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1600&q=90',
    caption: 'Flora Bouquet & Veil',
  },
  {
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=90',
    caption: 'Outdoor Reverie',
  },
  {
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1600&q=90',
    caption: "The Groom's Thoughtful Stare",
  },
  {
    src: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1600&q=90',
    caption: 'Ballroom Floral Splendor',
  },
  {
    src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=90',
    caption: 'Vows & Embrace',
  },
];

const INITIAL_WISHES: Wish[] = [
  {
    id: 'w1',
    name: 'Olivia Sinclair',
    text: 'May your life together always be filled with love, laughter, and beautiful memories. You two are made for each other!',
  },
  {
    id: 'w2',
    name: 'Julian & Claire Vance',
    text: 'Wishing Amelia and Nathaniel endless joy on your sacred journey. Truly inspiring couple!',
  },
  {
    id: 'w3',
    name: 'Uncle Marcus & Aunt Diana',
    text: 'May the love you share today grow deeper and sweeter with each passing sunrise. Congratulations!',
  },
  {
    id: 'w4',
    name: 'Sophia & Alexander Wright',
    text: 'Such a graceful celebration of true love. Wishing you both a lifetime of happiness, peace, and eternal devotion.',
  },
  {
    id: 'w5',
    name: 'Dr. Raymond Hartono',
    text: 'Warmest congratulations to Amelia & Nathan. May your home always be blessed with warmth, health, and prosperity.',
  },
];

export default function App() {
  // Opening state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpeningTransitioning, setIsOpeningTransitioning] = useState<boolean>(false);

  // Guest personalization from query param ?to= or ?guest=
  const [guestName, setGuestName] = useState<string>('Special Guest');

  // Navigation
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
    isReached: false,
  });

  // Lightbox
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Copy feedbacks
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [copiedAccount, setCopiedAccount] = useState<boolean>(false);

  // RSVP Form state
  const [rsvpData, setRsvpData] = useState<{
    name: string;
    email: string;
    attendance: string;
    guests: string;
    dietary: string[];
    tablePreference: string;
    message: string;
  }>({
    name: '',
    email: '',
    attendance: 'attending',
    guests: '1',
    dietary: ['Standard / No Restrictions'],
    tablePreference: 'General Guest Seating (Standard)',
    message: '',
  });

  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState<boolean>(false);

  // Toggle dietary requirements multi-select pill
  const toggleDietaryRequirement = (optionLabel: string) => {
    setRsvpData((prev) => {
      let updated: string[];
      if (optionLabel === 'Standard / No Restrictions') {
        updated = ['Standard / No Restrictions'];
      } else {
        const filtered = prev.dietary.filter((item) => item !== 'Standard / No Restrictions');
        if (filtered.includes(optionLabel)) {
          updated = filtered.filter((item) => item !== optionLabel);
          if (updated.length === 0) {
            updated = ['Standard / No Restrictions'];
          }
        } else {
          updated = [...filtered, optionLabel];
        }
      }
      return { ...prev, dietary: updated };
    });
  };

  // Simulated Email Notification Toast & Preview Modal
  const [showEmailToast, setShowEmailToast] = useState<boolean>(false);
  const [showEmailModal, setShowEmailModal] = useState<boolean>(false);
  const [toastProgress, setToastProgress] = useState<number>(100);

  // Guestbook wishes
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [wishInput, setWishInput] = useState({ name: '', text: '' });
  const [wishSubmitted, setWishSubmitted] = useState<boolean>(false);
  const [isWishesPaused, setIsWishesPaused] = useState<boolean>(false);

  // FAQ Accordion state
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-parking');
  const [faqFilter, setFaqFilter] = useState<string>('all');

  // Share & Instagram Story state
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [isIgStoryModalOpen, setIsIgStoryModalOpen] = useState(false);

  // Custom cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHoverType, setCursorHoverType] = useState<'' | 'pointer' | 'gallery'>('');

  // 1. Initial setup: guest name & load stored wishes/RSVP
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const queryGuest = params.get('to') || params.get('guest');
      if (queryGuest) {
        setGuestName(queryGuest.replace(/\+/g, ' '));
        setRsvpData((prev) => ({ ...prev, name: queryGuest.replace(/\+/g, ' ') }));
      }

      const storedWishes = localStorage.getItem('wedding_wishes_amelia_nathan');
      if (storedWishes) {
        setWishes(JSON.parse(storedWishes));
      } else {
        setWishes(INITIAL_WISHES);
      }

      const storedRsvp = localStorage.getItem('wedding_rsvp_amelia_nathan');
      if (storedRsvp) {
        setRsvpSubmitted(true);
        const parsed = JSON.parse(storedRsvp);
        setRsvpData({
          name: parsed.name || '',
          email: parsed.email || '',
          attendance: parsed.attendance || 'attending',
          guests: parsed.guests || '1',
          dietary:
            Array.isArray(parsed.dietary) && parsed.dietary.length > 0
              ? parsed.dietary
              : ['Standard / No Restrictions'],
          tablePreference: parsed.tablePreference || 'General Guest Seating (Standard)',
          message: parsed.message || '',
        });
      }
    } catch {
      setWishes(INITIAL_WISHES);
    }
  }, []);

  // 2. Countdown timer to 14 November 2026, 16:00 WIB (UTC+7)
  useEffect(() => {
    // 2026-11-14T16:00:00+07:00
    const targetDate = new Date('2026-11-14T16:00:00+07:00').getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00',
          isReached: true,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
        isReached: false,
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // 3. Navigation scroll observer
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. Custom cursor tracking for fine pointers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 5. Scroll reveal animation observer
  useEffect(() => {
    if (!isOpen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = document.querySelectorAll('.reveal-item');
    items.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, [isOpen]);

  // 6. Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % GALLERY_PHOTOS.length : 0
        );
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length : 0
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  // Audio trigger & Cinematic Invitation Open
  const handleOpenInvitation = () => {
    setIsOpeningTransitioning(true);

    // 1.9s cinematic dove camera swoop and warm ivory light transition
    setTimeout(() => {
      setIsOpen(true);
    }, 1900);
  };

  // Copy actions
  const handleCopyAddress = () => {
    const address = 'The Langham Jakarta, District 8 SCBD Lot 28, Jl. Jend. Sudirman, Senayan, Jakarta Selatan, 12190';
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 3000);
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('1234567890');
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 3000);
  };

  // Open Instagram Story Share Template Modal
  const handleOpenInstagramStoryShare = () => {
    setIsIgStoryModalOpen(true);
  };

  // Web Share API Handler with personalized message
  const handleShare = async () => {
    const shareTitle = 'Amelia & Nathaniel — The Wedding Celebration';
    const shareMessage = "Come celebrate Amelia & Nathaniel's big day with me!";
    const shareUrl = window.location.href;

    const shareData = {
      title: shareTitle,
      text: shareMessage,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareToast('Invitation shared successfully!');
        setTimeout(() => setShareToast(null), 3500);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== 'AbortError') {
          copyShareFallback(shareMessage, shareUrl);
        }
      }
    } else {
      // Fallback for browsers without Web Share API
      copyShareFallback(shareMessage, shareUrl);
    }
  };

  const copyShareFallback = (message: string, url: string) => {
    const textToCopy = `${message}\n${url}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setShareToast('Invitation link & message copied to clipboard!');
        setTimeout(() => setShareToast(null), 4000);
      })
      .catch(() => {
        setShareToast('Link: ' + url);
        setTimeout(() => setShareToast(null), 4000);
      });
  };

  // Auto-dismiss and countdown for simulated email toast
  useEffect(() => {
    if (!showEmailToast) return;
    setToastProgress(100);
    const duration = 7500;
    const intervalTime = 75;
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setToastProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          setShowEmailToast(false);
          return 0;
        }
        return prev - step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [showEmailToast]);

  // RSVP Submission - Sends real email confirmation via backend API
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name) return;

    const finalRsvp = {
      ...rsvpData,
      email: rsvpData.email.trim(),
    };

    setIsSubmittingRsvp(true);

    try {
      const res = await fetch('/api/send-rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalRsvp),
      });
      const data = await res.json();
      console.log('[RSVP Email API response]:', data);
    } catch (err) {
      console.error('[RSVP Email Error]:', err);
    } finally {
      setIsSubmittingRsvp(false);
      setRsvpData(finalRsvp);
      localStorage.setItem('wedding_rsvp_amelia_nathan', JSON.stringify(finalRsvp));
      setRsvpSubmitted(true);
      setShowEmailToast(true);
    }
  };

  // Wish submission
  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.name.trim() || !wishInput.text.trim()) return;

    const newWish: Wish = {
      id: Date.now().toString(),
      name: wishInput.name.trim(),
      text: wishInput.text.trim(),
      timestamp: 'Just now',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    localStorage.setItem('wedding_wishes_amelia_nathan', JSON.stringify(updated));
    setWishInput({ name: '', text: '' });
    setWishSubmitted(true);
    setTimeout(() => setWishSubmitted(false), 4000);
  };

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    document.body.style.overflow = '';
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length);
    }
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % GALLERY_PHOTOS.length);
    }
  };

  // Helper for Google Calendar link
  const calendarUrl =
    'https://calendar.google.com/calendar/render?action=TEMPLATE&text=' +
    encodeURIComponent('Amelia & Nathaniel — The Wedding Celebration') +
    '&dates=20261114T090000Z/20261114T143000Z' +
    '&details=' +
    encodeURIComponent('Holy Matrimony & Wedding Reception of Amelia Grace Laurent & Nathaniel Alexander Reeves.') +
    '&location=' +
    encodeURIComponent('The Langham Grand Ballroom, District 8 SCBD, Jakarta');

  return (
    <div className="min-h-screen bg-[#F7F3ED] text-[#252321] font-sans antialiased relative selection:bg-[#D8C6A8] selection:text-[#252321]">
      {/* Desktop Custom Cursor */}
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block rounded-full bg-[#252321] transition-transform duration-75 ease-out"
        style={{
          width: '8px',
          height: '8px',
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: cursorHoverType ? 0.3 : 1,
        }}
      />
      <div
        className={`pointer-events-none fixed z-[9998] hidden md:flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
          cursorHoverType === 'gallery'
            ? 'w-16 h-16 bg-[#252321]/80 text-[#FAF7F2] text-[9px] tracking-widest'
            : cursorHoverType === 'pointer'
            ? 'w-14 h-14 border border-[#252321] bg-[#252321]/10'
            : 'w-9 h-9 border border-[#B59A6A]/60'
        }`}
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {cursorHoverType === 'gallery' && <span>VIEW</span>}
      </div>

      {/* ==================== 1. OPENING SCREEN / COVER ==================== */}
      {!isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F7F3ED] px-6 transition-all duration-[1900ms] ease-out ${
            isOpeningTransitioning
              ? 'opacity-0 scale-[1.02] pointer-events-none'
              : 'opacity-100 scale-100'
          }`}
        >
          {/* Subtle Warm Paper Texture & Cinematic Ambient Lighting */}
          <div className="absolute inset-0 opacity-25 pointer-events-none bg-[radial-gradient(#A89B8A_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.7)_0%,transparent_75%)]" />

          {/* Luxury Doves Animation System for Opening Screen (3-5 doves) */}
          <OpeningDoves isTransitioning={isOpeningTransitioning} mousePos={cursorPos} />

          <div
            className={`relative z-10 max-w-xl w-full text-center flex flex-col items-center py-12 px-8 border border-[#D8C6A8]/50 bg-[#FAF7F2]/90 backdrop-blur-sm shadow-[0_20px_60px_rgba(37,35,33,0.06)] rounded-sm transition-all duration-1000 ease-out ${
              isOpeningTransitioning ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
            }`}
          >
            {/* Monogram Header */}
            <div className="w-16 h-16 rounded-full border border-[#D8C6A8] flex items-center justify-center mb-6">
              <span className="font-serif italic text-2xl text-[#A38755]">A &amp; N</span>
            </div>

            <p className="text-[11px] uppercase tracking-widest3 text-[#8C7F6E] mb-4 font-medium">
              The Wedding Invitation
            </p>
            <div className="w-12 h-px bg-[#D8C6A8] mb-6" />

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide text-[#252321] leading-tight mb-4 uppercase">
              Amelia
              <br />
              <span className="font-serif italic text-3xl sm:text-4xl text-[#A89B8A] font-normal lowercase">&amp;</span>
              <br />
              Nathaniel
            </h1>

            <p className="text-xs sm:text-sm uppercase tracking-widest3 text-[#252321]/80 mb-2 font-medium">
              14.11.2026
            </p>
            <p className="text-xs tracking-widest text-[#A89B8A] mb-8 font-light">
              The Langham Grand Ballroom • Jakarta
            </p>

            {/* Invitation recipient card */}
            <div className="mb-8 py-3.5 px-6 rounded border border-[#D8C6A8]/40 bg-[#F7F3ED] text-center w-full max-w-md shadow-xs">
              <span className="text-[11px] uppercase tracking-widest text-[#8C7F6E] block mb-1">
                Dear {guestName}
              </span>
              <span className="font-serif italic text-lg text-[#252321]">
                You are cordially invited to celebrate with us
              </span>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleOpenInvitation}
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="group relative inline-flex items-center gap-3 px-10 py-4 bg-[#252321] text-[#F7F3ED] text-xs uppercase tracking-widest2 transition-all duration-500 hover:bg-[#A38755] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#B59A6A] focus:ring-offset-2 cursor-pointer"
            >
              <span>Open Invitation</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <p className="text-[10px] tracking-widest text-[#A89B8A] uppercase mt-6 opacity-80">
              Click to reveal invitation
            </p>
          </div>
        </div>
      )}

      {/* ==================== 2. FLOATING NAVIGATION ==================== */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 sm:px-12 ${
          isScrolled
            ? 'bg-[#F7F3ED]/90 backdrop-blur-md shadow-sm py-4 border-b border-[#D8C6A8]/40'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo / Monogram */}
          <a
            href="#hero"
            onMouseEnter={() => setCursorHoverType('pointer')}
            onMouseLeave={() => setCursorHoverType('')}
            className="flex items-center gap-3"
          >
            <span className="font-serif text-2xl tracking-wider text-[#252321] font-medium">
              A • N
            </span>
            <span className="hidden md:inline-block text-[11px] uppercase tracking-widest2 text-[#A89B8A] font-light pl-3 border-l border-[#D8C6A8]/60">
              14.11.2026
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-widest2 uppercase text-[#252321]/80">
            <a
              href="#hero"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="transition-colors hover:text-[#B59A6A]"
            >
              Home
            </a>
            <a
              href="#couple"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="transition-colors hover:text-[#B59A6A]"
            >
              The Couple
            </a>
            <a
              href="#story"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="transition-colors hover:text-[#B59A6A]"
            >
              Our Story
            </a>
            <a
              href="#details"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="transition-colors hover:text-[#B59A6A]"
            >
              Celebration
            </a>
            <a
              href="#venue"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="transition-colors hover:text-[#B59A6A]"
            >
              Venue
            </a>
            <a
              href="#gallery"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="transition-colors hover:text-[#B59A6A]"
            >
              Gallery
            </a>
            <a
              href="#faq"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="transition-colors hover:text-[#B59A6A]"
            >
              FAQ
            </a>
          </nav>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <a
              href="#rsvp"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="hidden sm:inline-block px-5 py-2 border border-[#252321]/40 text-[#252321] text-[11px] uppercase tracking-widest transition-all duration-300 hover:bg-[#252321] hover:text-[#FAF7F2] active:scale-95"
            >
              RSVP
            </a>

            {/* Mobile Menu Button with Elegant 3-Bar to X Smooth Morph Animation */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center rounded text-[#252321] hover:text-[#B59A6A] transition-all duration-300 active:scale-90 focus:outline-none"
              aria-label="Toggle Navigation Menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMobileMenuOpen ? 'translate-y-[6px] rotate-45' : 'mb-1'
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMobileMenuOpen ? 'opacity-0 scale-x-0' : 'mb-1'
                }`}
              />
              <span
                className={`block h-0.5 w-6 bg-current rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isMobileMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer with Smooth Slide & Fade Transition */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#FAF7F2] border-b border-[#D8C6A8] ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 py-6 px-6' : 'max-h-0 opacity-0 py-0 px-6 border-b-0'
          }`}
        >
          <div className="flex flex-col gap-4 text-xs uppercase tracking-widest text-[#252321]">
            <a
              href="#hero"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-[#B59A6A]"
            >
              Home
            </a>
            <a
              href="#couple"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-[#B59A6A]"
            >
              Couple
            </a>
            <a
              href="#story"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-[#B59A6A]"
            >
              Story
            </a>
            <a
              href="#details"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-[#B59A6A]"
            >
              Event
            </a>
            <a
              href="#venue"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-[#B59A6A]"
            >
              Venue
            </a>
            <a
              href="#gallery"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-[#B59A6A]"
            >
              Gallery
            </a>
            <a
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 transition-colors hover:text-[#B59A6A]"
            >
              FAQ
            </a>
            <a
              href="#rsvp"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-1 text-[#B59A6A] font-semibold transition-colors hover:text-[#252321]"
            >
              RSVP
            </a>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className={`transition-opacity duration-1000 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        {/* ==================== 3. HERO SECTION ==================== */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16 px-6"
        >
          {/* Background Image with Editorial Zoom & Grain */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1920&q=85"
              alt="Amelia & Nathaniel - Luxury Editorial Wedding Couple"
              className="w-full h-full object-cover object-center animate-slow-zoom brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#252321]/90 via-[#252321]/40 to-[#252321]/50" />
          </div>

          {/* Ambient Hero Sky Dove */}
          <HeroSkyDove />

          {/* Hero Editorial Card */}
          <div className="relative z-10 text-center text-[#F7F3ED] max-w-4xl mx-auto flex flex-col items-center">
            <span className="inline-block text-xs sm:text-sm uppercase tracking-widest3 font-light text-[#E5D8C3] mb-6 opacity-95">
              The Wedding Celebration of
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight leading-[1.05] mb-6 drop-shadow-sm">
              Amelia &amp; Nathaniel
            </h1>

            <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm uppercase tracking-widest2 font-light text-[#FAF7F2]/90 mb-10">
              <span>Saturday</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8C6A8]" />
              <span>14 November 2026</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8C6A8]" />
              <span>Jakarta</span>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#details"
                onMouseEnter={() => setCursorHoverType('pointer')}
                onMouseLeave={() => setCursorHoverType('')}
                className="px-8 py-3.5 bg-[#F7F3ED] text-[#252321] text-xs uppercase tracking-widest2 font-medium transition-all duration-300 hover:bg-[#D8C6A8] hover:shadow-xl"
              >
                Event Itinerary
              </a>
              <a
                href="#rsvp"
                onMouseEnter={() => setCursorHoverType('pointer')}
                onMouseLeave={() => setCursorHoverType('')}
                className="px-8 py-3.5 border border-[#FAF7F2]/80 text-[#FAF7F2] text-xs uppercase tracking-widest2 font-medium backdrop-blur-sm transition-all duration-300 hover:bg-[#FAF7F2] hover:text-[#252321]"
              >
                Confirm Attendance
              </a>
            </div>
          </div>

          {/* Animated Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center flex flex-col items-center gap-2 pointer-events-none opacity-85">
            <span className="text-[10px] uppercase tracking-widest3 text-[#FAF7F2]/75 font-light">
              Scroll to Discover
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-[#D8C6A8] to-transparent animate-pulse" />
          </div>
        </section>

        {/* ==================== 4. INTRODUCTION SECTION ==================== */}
        <section className="py-28 md:py-36 px-6 bg-[#F7F3ED] relative border-b border-[#D8C6A8]/30">
          <div className="max-w-3xl mx-auto text-center reveal-item">
            <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-4">
              With Love, We Invite You
            </span>
            <div className="w-12 h-px bg-[#D8C6A8] mx-auto mb-8" />
            <blockquote className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#252321] font-light leading-relaxed mb-8">
              “Together with our families, we joyfully invite you to celebrate the beginning of our forever.”
            </blockquote>
            <p className="text-sm sm:text-base text-[#8C7F6E] font-light leading-relaxed max-w-xl mx-auto">
              Two souls, two families, and one journey rooted in enduring devotion. We eagerly look
              forward to sharing this momentous day in the company of those we treasure most.
            </p>
            <div className="mt-8 flex justify-center items-center gap-3">
              <span className="h-px w-8 bg-[#D8C6A8]/60" />
              <span className="font-serif text-xl italic text-[#B59A6A] font-normal">
                #AmeliaAndNathan
              </span>
              <span className="h-px w-8 bg-[#D8C6A8]/60" />
            </div>
          </div>
        </section>

        {/* ==================== 5. COUPLE SECTION ==================== */}
        <section id="couple" className="py-28 md:py-36 px-6 sm:px-12 bg-[#FAF7F2] relative">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                The Bride &amp; Groom
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#252321] font-light">
                Destined Together
              </h2>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Bride Column */}
              <div className="flex flex-col items-center md:items-end text-center md:text-right reveal-item">
                <div
                  onMouseEnter={() => setCursorHoverType('gallery')}
                  onMouseLeave={() => setCursorHoverType('')}
                  onClick={() => openLightbox(3)}
                  className="relative group overflow-hidden max-w-md w-full aspect-[3/4] mb-8 border border-[#D8C6A8]/50 shadow-sm cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85"
                    alt="Amelia Grace Laurent - The Bride"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#252321]/10 transition-opacity duration-500 group-hover:opacity-0" />
                </div>
                <div className="max-w-md w-full">
                  <span className="text-xs uppercase tracking-widest3 text-[#B59A6A] block mb-2 font-medium">
                    The Bride
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#252321] font-normal mb-3">
                    Amelia Grace Laurent
                  </h3>
                  <p className="text-sm text-[#8C7F6E] font-light mb-4 leading-relaxed">
                    Beloved daughter of <br className="hidden sm:inline" />
                    <span className="text-[#252321] font-normal">Mr. Charles Laurent</span> &amp;{' '}
                    <span className="text-[#252321] font-normal">Mrs. Eleanor Laurent</span>
                  </p>
                  <p className="text-xs text-[#A89B8A] font-light italic leading-relaxed">
                    “An architect of quiet wonder, with an eye for timeless grace and a heart boundless
                    with kindness.”
                  </p>
                </div>
              </div>

              {/* Groom Column */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left reveal-item">
                <div
                  onMouseEnter={() => setCursorHoverType('gallery')}
                  onMouseLeave={() => setCursorHoverType('')}
                  onClick={() => openLightbox(6)}
                  className="relative group overflow-hidden max-w-md w-full aspect-[3/4] mb-8 border border-[#D8C6A8]/50 shadow-sm cursor-pointer"
                >
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85"
                    alt="Nathaniel Alexander Reeves - The Groom"
                    className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#252321]/10 transition-opacity duration-500 group-hover:opacity-0" />
                </div>
                <div className="max-w-md w-full">
                  <span className="text-xs uppercase tracking-widest3 text-[#B59A6A] block mb-2 font-medium">
                    The Groom
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#252321] font-normal mb-3">
                    Nathaniel Alexander Reeves
                  </h3>
                  <p className="text-sm text-[#8C7F6E] font-light mb-4 leading-relaxed">
                    Beloved son of <br className="hidden sm:inline" />
                    <span className="text-[#252321] font-normal">Mr. Jonathan Reeves</span> &amp;{' '}
                    <span className="text-[#252321] font-normal">Mrs. Victoria Reeves</span>
                  </p>
                  <p className="text-xs text-[#A89B8A] font-light italic leading-relaxed">
                    “A steadfast soul whose calm patience, quiet wisdom, and laughter bring ease to
                    every shared tomorrow.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 6. OUR STORY TIMELINE ==================== */}
        <section id="story" className="py-28 md:py-36 px-6 bg-[#F7F3ED] border-y border-[#D8C6A8]/30 relative overflow-hidden">
          {/* Subtle Ambient Dove Traversing Background */}
          <SectionAmbientDove direction="left-to-right" speed="slow" scale={0.7} opacity={0.55} />
          <div className="max-w-4xl mx-auto relative z-10">
            <div className="text-center mb-24 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                Chapter by Chapter
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#252321] font-light">
                Our Story
              </h2>
              <p className="text-sm text-[#A89B8A] font-light mt-3">
                From an serendipitous autumn introduction to a lifetime of devotion
              </p>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-6" />
            </div>

            <div className="relative">
              {/* Central Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#D8C6A8]/60 -translate-x-1/2" />

              {/* Timeline Item 1 */}
              <div className="relative flex flex-col md:flex-row items-start mb-20 group reveal-item">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <span className="font-serif italic text-3xl text-[#A38755] block mb-1">2019</span>
                  <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium mb-2">
                    The Beginning
                  </h3>
                  <p className="text-sm text-[#8C7F6E] font-light leading-relaxed">
                    “Two paths crossed in the most unexpected way.” A spontaneous gathering in Kyoto sparked
                    conversations that lasted until dawn.
                  </p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A] z-10 mt-1.5 transition-transform duration-300 group-hover:scale-125" />
                <div className="pl-12 md:pl-12 md:w-1/2">
                  <div className="md:hidden mb-2">
                    <span className="font-serif italic text-2xl text-[#A38755] block">2019</span>
                    <h3 className="text-xs uppercase tracking-widest2 text-[#252321] font-medium">
                      The Beginning
                    </h3>
                  </div>
                  <p className="md:hidden text-sm text-[#8C7F6E] font-light leading-relaxed mb-4">
                    “Two paths crossed in the most unexpected way.” A spontaneous gathering in Kyoto sparked
                    conversations that lasted until dawn.
                  </p>
                  <div className="overflow-hidden rounded border border-[#D8C6A8]/40 max-w-sm">
                    <img
                      src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80"
                      alt="Kyoto memory"
                      className="w-full h-48 object-cover grayscale contrast-110 transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 */}
              <div className="relative flex flex-col md:flex-row items-start mb-20 group reveal-item">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <div className="overflow-hidden rounded border border-[#D8C6A8]/40 max-w-sm ml-auto">
                    <img
                      src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
                      alt="Growing together"
                      className="w-full h-48 object-cover grayscale contrast-110 transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A] z-10 mt-1.5 transition-transform duration-300 group-hover:scale-125" />
                <div className="pl-12 md:pl-12 md:w-1/2">
                  <span className="font-serif italic text-2xl md:text-3xl text-[#A38755] block mb-1">
                    2021
                  </span>
                  <h3 className="text-xs md:text-sm uppercase tracking-widest2 text-[#252321] font-medium mb-2">
                    Growing Together
                  </h3>
                  <p className="text-sm text-[#8C7F6E] font-light leading-relaxed mb-4">
                    “Through countless conversations, adventures, and quiet moments, we discovered a life worth
                    building together.”
                  </p>
                  <div className="md:hidden overflow-hidden rounded border border-[#D8C6A8]/40 max-w-sm">
                    <img
                      src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80"
                      alt="Growing together"
                      className="w-full h-48 object-cover grayscale contrast-110"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 */}
              <div className="relative flex flex-col md:flex-row items-start mb-20 group reveal-item">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <span className="font-serif italic text-3xl text-[#A38755] block mb-1">2024</span>
                  <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium mb-2">
                    The Promise
                  </h3>
                  <p className="text-sm text-[#8C7F6E] font-light leading-relaxed">
                    “A promise to continue choosing each other, every single day.” Under a dusk canopy in Lake
                    Como, Nathaniel asked, and Amelia said yes.
                  </p>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A] z-10 mt-1.5 transition-transform duration-300 group-hover:scale-125" />
                <div className="pl-12 md:pl-12 md:w-1/2">
                  <div className="md:hidden mb-2">
                    <span className="font-serif italic text-2xl text-[#A38755] block">2024</span>
                    <h3 className="text-xs uppercase tracking-widest2 text-[#252321] font-medium">
                      The Promise
                    </h3>
                  </div>
                  <p className="md:hidden text-sm text-[#8C7F6E] font-light leading-relaxed mb-4">
                    “A promise to continue choosing each other, every single day.” Under a dusk canopy in Lake
                    Como, Nathaniel asked, and Amelia said yes.
                  </p>
                  <div className="overflow-hidden rounded border border-[#D8C6A8]/40 max-w-sm">
                    <img
                      src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80"
                      alt="The Engagement Ring"
                      className="w-full h-48 object-cover grayscale contrast-110 transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              {/* Timeline Item 4 */}
              <div className="relative flex flex-col md:flex-row items-start group reveal-item">
                <div className="hidden md:block w-1/2 pr-12 text-right">
                  <div className="overflow-hidden rounded border border-[#D8C6A8]/40 max-w-sm ml-auto">
                    <img
                      src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80"
                      alt="Forever begins"
                      className="w-full h-48 object-cover grayscale contrast-110 transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A] z-10 mt-1.5 transition-transform duration-300 group-hover:scale-125" />
                <div className="pl-12 md:pl-12 md:w-1/2">
                  <span className="font-serif italic text-2xl md:text-3xl text-[#A38755] block mb-1">
                    2026
                  </span>
                  <h3 className="text-xs md:text-sm uppercase tracking-widest2 text-[#252321] font-medium mb-2">
                    Forever Begins
                  </h3>
                  <p className="text-sm text-[#8C7F6E] font-light leading-relaxed mb-4">
                    “And now, we invite you to witness the beginning of our next chapter.”
                  </p>
                  <div className="md:hidden overflow-hidden rounded border border-[#D8C6A8]/40 max-w-sm">
                    <img
                      src="https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=800&q=80"
                      alt="Forever begins"
                      className="w-full h-48 object-cover grayscale contrast-110"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 7. WEDDING DETAILS ==================== */}
        <section id="details" className="py-28 md:py-36 px-6 sm:px-12 bg-[#FAF7F2]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                Event Guide
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#252321] font-light">
                The Celebration
              </h2>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Holy Matrimony */}
              <div className="bg-[#F7F3ED] border border-[#D8C6A8]/50 p-10 text-center flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:border-[#D8C6A8] reveal-item">
                <div className="w-12 h-12 rounded-full border border-[#D8C6A8] flex items-center justify-center text-[#A38755] mb-6">
                  <Church className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-widest3 text-[#A89B8A] font-medium mb-2">
                  Sacred Vows
                </span>
                <h3 className="font-serif text-2xl text-[#252321] mb-4">Holy Matrimony</h3>
                <div className="w-8 h-px bg-[#D8C6A8]/60 mb-6" />
                <p className="text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium">
                  Saturday, 14 November 2026
                </p>
                <p className="text-sm font-serif italic text-[#A38755] mb-6 text-lg">
                  16:00 – 17:30 WIB
                </p>
                <p className="text-xs text-[#8C7F6E] font-light leading-relaxed">
                  Grand Ballroom Conservatory
                  <br />
                  The Langham, Jakarta
                  <br />
                  <span className="text-[11px] text-[#A89B8A] mt-2 block italic">
                    Guests are requested to be seated by 15:45
                  </span>
                </p>
              </div>

              {/* Card 2: Wedding Reception */}
              <div className="bg-[#F7F3ED] border border-[#D8C6A8]/50 p-10 text-center flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:border-[#D8C6A8] reveal-item">
                <div className="w-12 h-12 rounded-full border border-[#D8C6A8] flex items-center justify-center text-[#A38755] mb-6">
                  <Wine className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-widest3 text-[#A89B8A] font-medium mb-2">
                  Evening Banquet
                </span>
                <h3 className="font-serif text-2xl text-[#252321] mb-4">Wedding Reception</h3>
                <div className="w-8 h-px bg-[#D8C6A8]/60 mb-6" />
                <p className="text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium">
                  Saturday, 14 November 2026
                </p>
                <p className="text-sm font-serif italic text-[#A38755] mb-6 text-lg">
                  18:30 – 21:30 WIB
                </p>
                <p className="text-xs text-[#8C7F6E] font-light leading-relaxed">
                  The Grand Ballroom, 2nd Floor
                  <br />
                  The Langham, Jakarta
                  <br />
                  <span className="text-[11px] text-[#A89B8A] mt-2 block italic">
                    Followed by speeches, dinner &amp; first dance
                  </span>
                </p>
              </div>

              {/* Card 3: Dress Code */}
              <div className="bg-[#F7F3ED] border border-[#D8C6A8]/50 p-10 text-center flex flex-col items-center transition-all duration-300 hover:shadow-lg hover:border-[#D8C6A8] reveal-item">
                <div className="w-12 h-12 rounded-full border border-[#D8C6A8] flex items-center justify-center text-[#A38755] mb-6">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-xs uppercase tracking-widest3 text-[#A89B8A] font-medium mb-2">
                  Attire Guideline
                </span>
                <h3 className="font-serif text-2xl text-[#252321] mb-4">Dress Code</h3>
                <div className="w-8 h-px bg-[#D8C6A8]/60 mb-6" />
                <p className="text-xs uppercase tracking-widest text-[#252321]/80 mb-3 font-medium">
                  Formal / Black-Tie Optional
                </p>
                <p className="text-xs text-[#8C7F6E] font-light leading-relaxed mb-6">
                  Gentlemen: Dark Suit or Tuxedo
                  <br />
                  Ladies: Elegant Evening Gown or Midi Dress
                </p>
                <span className="text-[11px] uppercase tracking-widest text-[#A89B8A] mb-3 block">
                  Suggested Palette:
                </span>
                <div className="flex items-center gap-2">
                  <div
                    className="w-5 h-5 rounded-full bg-[#F7F3ED] border border-[#252321]/20 shadow-xs"
                    title="Ivory"
                  />
                  <div
                    className="w-5 h-5 rounded-full bg-[#D8C6A8] border border-[#252321]/20 shadow-xs"
                    title="Champagne"
                  />
                  <div
                    className="w-5 h-5 rounded-full bg-[#A89B8A] border border-[#252321]/20 shadow-xs"
                    title="Soft Taupe"
                  />
                  <div
                    className="w-5 h-5 rounded-full bg-[#252321] border border-[#252321]/20 shadow-xs"
                    title="Charcoal Black"
                  />
                </div>
              </div>
            </div>

            {/* Calendar Reminder Button */}
            <div className="text-center mt-12">
              <a
                href={calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorHoverType('pointer')}
                onMouseLeave={() => setCursorHoverType('')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-[#D8C6A8] text-[#252321] text-xs uppercase tracking-widest2 hover:bg-[#F7F3ED] transition-colors"
              >
                <Calendar className="w-4 h-4 text-[#A38755]" />
                <span>Save to Google Calendar</span>
              </a>
            </div>
          </div>
        </section>

        {/* ==================== 8. COUNTDOWN SECTION ==================== */}
        <section className="py-24 px-6 bg-[#252321] text-[#F7F3ED] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,198,168,0.12)_0,transparent_70%)] pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 reveal-item">
            <span className="text-xs uppercase tracking-widest3 text-[#D8C6A8] block mb-4 font-light">
              Cherishing Every Moment
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-light mb-12 tracking-wide">
              Until We Say “I Do”
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 max-w-2xl mx-auto">
              <div className="p-6 border border-[#D8C6A8]/20 bg-[#383533]/60 backdrop-blur-sm">
                <span className="font-serif text-4xl sm:text-6xl text-[#E5D8C3] block font-light mb-1">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest2 text-[#A89B8A] font-medium">
                  Days
                </span>
              </div>
              <div className="p-6 border border-[#D8C6A8]/20 bg-[#383533]/60 backdrop-blur-sm">
                <span className="font-serif text-4xl sm:text-6xl text-[#E5D8C3] block font-light mb-1">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest2 text-[#A89B8A] font-medium">
                  Hours
                </span>
              </div>
              <div className="p-6 border border-[#D8C6A8]/20 bg-[#383533]/60 backdrop-blur-sm">
                <span className="font-serif text-4xl sm:text-6xl text-[#E5D8C3] block font-light mb-1">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest2 text-[#A89B8A] font-medium">
                  Minutes
                </span>
              </div>
              <div className="p-6 border border-[#D8C6A8]/20 bg-[#383533]/60 backdrop-blur-sm">
                <span className="font-serif text-4xl sm:text-6xl text-[#E5D8C3] block font-light mb-1">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-widest2 text-[#A89B8A] font-medium">
                  Seconds
                </span>
              </div>
            </div>

            {timeLeft.isReached && (
              <p className="mt-8 font-serif text-2xl italic text-[#D8C6A8]">
                Today is the Day!
              </p>
            )}

            <p className="text-xs text-[#A89B8A] tracking-widest mt-8 font-light">
              Target Date: 14 November 2026, 16:00 Jakarta Time (WIB)
            </p>
          </div>
        </section>

        {/* ==================== 9. VENUE SECTION ==================== */}
        <section id="venue" className="py-28 md:py-36 px-6 sm:px-12 bg-[#F7F3ED]">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 reveal-item">
                <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                  Destination
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#252321] font-light mb-6">
                  The Venue
                </h2>
                <div className="w-12 h-px bg-[#D8C6A8] mb-8" />
                <h3 className="font-serif text-2xl text-[#252321] font-normal mb-2">
                  The Langham Grand Ballroom
                </h3>
                <p className="text-sm text-[#8C7F6E] font-light mb-6">
                  District 8, SCBD, Lot 28, Jl. Jend. Sudirman, Senayan, Jakarta Selatan, 12190, Indonesia
                </p>
                <blockquote className="font-serif italic text-[#252321]/80 text-base mb-8 pl-4 border-l-2 border-[#D8C6A8]">
                  “A timeless setting chosen to celebrate an unforgettable beginning.”
                </blockquote>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://maps.google.com/?q=The+Langham+Jakarta"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => setCursorHoverType('pointer')}
                    onMouseLeave={() => setCursorHoverType('')}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#252321] text-[#F7F3ED] text-xs uppercase tracking-widest2 transition-all duration-300 hover:bg-[#A38755] hover:shadow-md cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-[#D8C6A8]" />
                    <span>View on Google Maps</span>
                  </a>
                  <button
                    onClick={handleCopyAddress}
                    onMouseEnter={() => setCursorHoverType('pointer')}
                    onMouseLeave={() => setCursorHoverType('')}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#252321]/30 text-[#252321] text-xs uppercase tracking-widest2 hover:bg-[#ECE5DB] transition-colors cursor-pointer"
                  >
                    {copiedAddress ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#A38755]" />
                        <span>Address Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#A89B8A]" />
                        <span>Copy Address</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="lg:col-span-7 reveal-item">
                <div className="relative overflow-hidden rounded border border-[#D8C6A8]/40 shadow-sm aspect-[16/10] group">
                  <img
                    src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85"
                    alt="The Langham Ballroom Reception Hall"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[#252321]/15" />
                  <div className="absolute bottom-4 left-4 bg-[#F7F3ED]/95 backdrop-blur-sm px-4 py-2 text-[11px] uppercase tracking-widest text-[#252321] border border-[#D8C6A8]/30">
                    The Grand Ballroom • Jakarta
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 10. GALLERY (MASONRY WITH LIGHTBOX) ==================== */}
        <section id="gallery" className="py-28 md:py-36 px-6 sm:px-12 bg-[#FAF7F2] border-y border-[#D8C6A8]/30 relative overflow-hidden">
          {/* Subtle Ambient Dove Traversing Gallery Sky */}
          <SectionAmbientDove direction="right-to-left" speed="slow" scale={0.62} opacity={0.5} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                Moments in Time
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#252321] font-light">
                Gallery of Memories
              </h2>
              <p className="text-sm text-[#A89B8A] font-light mt-3">
                Fragments of light, gentle laughter, and quiet devotion
              </p>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-6" />
            </div>

            {/* Masonry Grid */}
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {GALLERY_PHOTOS.map((photo, index) => (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  onMouseEnter={() => setCursorHoverType('gallery')}
                  onMouseLeave={() => setCursorHoverType('')}
                  className="gallery-item group relative overflow-hidden rounded border border-[#D8C6A8]/40 break-inside-avoid reveal-item cursor-pointer"
                >
                  <img
                    src={photo.src}
                    alt={photo.caption}
                    className="w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#252321]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-[#F7F3ED] text-xs uppercase tracking-widest2 px-4 py-2 border border-[#FAF7F2]/60 bg-[#252321]/60 backdrop-blur-sm">
                      View
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== LIGHTBOX MODAL ==================== */}
        {lightboxIndex !== null && (
          <div
            onClick={closeLightbox}
            className="fixed inset-0 z-50 bg-[#252321]/95 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
          >
            <button
              onClick={closeLightbox}
              aria-label="Close Lightbox"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="absolute top-6 right-6 text-[#FAF7F2]/80 hover:text-[#FAF7F2] p-2 focus:outline-none z-20 cursor-pointer"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              aria-label="Previous Image"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#FAF7F2]/70 hover:text-[#FAF7F2] p-3 focus:outline-none z-20 cursor-pointer"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <div
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative z-10"
            >
              <img
                src={GALLERY_PHOTOS[lightboxIndex].src}
                alt={GALLERY_PHOTOS[lightboxIndex].caption}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded border border-[#D8C6A8]/30 shadow-2xl transition-all duration-300"
              />
              <p className="mt-4 font-serif italic text-[#D8C6A8] text-base sm:text-lg text-center">
                {GALLERY_PHOTOS[lightboxIndex].caption}
              </p>
              <span className="text-[11px] text-[#A89B8A] uppercase tracking-widest mt-1">
                {lightboxIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              aria-label="Next Image"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FAF7F2]/70 hover:text-[#FAF7F2] p-3 focus:outline-none z-20 cursor-pointer"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {/* ==================== 11. SCHEDULE OF THE DAY ==================== */}
        <section className="py-28 md:py-36 px-6 bg-[#F7F3ED]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-20 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                Schedule of Events
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#252321] font-light">
                The Day
              </h2>
              <p className="text-xs uppercase tracking-widest text-[#A89B8A] mt-3">
                Saturday, 14 November 2026
              </p>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-6" />
            </div>

            <div className="border-l border-[#D8C6A8]/60 pl-8 ml-4 sm:ml-12 space-y-10">
              <div className="relative reveal-item">
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A]" />
                <span className="font-serif italic text-2xl text-[#A38755] block">16:00</span>
                <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium">
                  Holy Matrimony
                </h3>
                <p className="text-xs text-[#8C7F6E] font-light mt-1">
                  Conducted at The Grand Conservatory. Please be seated promptly.
                </p>
              </div>

              <div className="relative reveal-item">
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A]" />
                <span className="font-serif italic text-2xl text-[#A38755] block">17:30</span>
                <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium">
                  Cocktails &amp; Photo Session
                </h3>
                <p className="text-xs text-[#8C7F6E] font-light mt-1">
                  Welcome hors d'oeuvres &amp; family portraits in the foyer.
                </p>
              </div>

              <div className="relative reveal-item">
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A]" />
                <span className="font-serif italic text-2xl text-[#A38755] block">18:30</span>
                <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium">
                  Reception Begins
                </h3>
                <p className="text-xs text-[#8C7F6E] font-light mt-1">
                  Ballroom doors open; orchestral quartet performance commences.
                </p>
              </div>

              <div className="relative reveal-item">
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A]" />
                <span className="font-serif italic text-2xl text-[#A38755] block">19:00</span>
                <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium">
                  Gourmet Dinner
                </h3>
                <p className="text-xs text-[#8C7F6E] font-light mt-1">
                  Curated 5-course banquet with wine pairing.
                </p>
              </div>

              <div className="relative reveal-item">
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A]" />
                <span className="font-serif italic text-2xl text-[#A38755] block">20:00</span>
                <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium">
                  Speeches &amp; Champagne Toast
                </h3>
                <p className="text-xs text-[#8C7F6E] font-light mt-1">
                  Words of affection from parents and closest companions.
                </p>
              </div>

              <div className="relative reveal-item">
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A]" />
                <span className="font-serif italic text-2xl text-[#A38755] block">20:30</span>
                <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium">
                  First Dance
                </h3>
                <p className="text-xs text-[#8C7F6E] font-light mt-1">
                  The couple takes the floor to open celebration dance.
                </p>
              </div>

              <div className="relative reveal-item">
                <span className="absolute -left-[37px] top-1 w-3.5 h-3.5 rounded-full bg-[#F7F3ED] border-2 border-[#B59A6A]" />
                <span className="font-serif italic text-2xl text-[#A38755] block">21:30</span>
                <h3 className="text-sm uppercase tracking-widest2 text-[#252321] font-medium">
                  Celebration Concludes
                </h3>
                <p className="text-xs text-[#8C7F6E] font-light mt-1">
                  Sparkler send-off in the Langham porte-cochère.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 12. FREQUENTLY ASKED QUESTIONS (FAQ) ==================== */}
        <section id="faq" className="py-28 md:py-36 px-6 sm:px-12 bg-[#F7F3ED] border-b border-[#D8C6A8]/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                Guest Essentials &amp; Advisory
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#252321] font-light">
                Frequently Asked Questions
              </h2>
              <p className="text-sm text-[#A89B8A] font-light mt-3 max-w-xl mx-auto">
                Essential details regarding parking, children policy, transportation, and celebration etiquette
              </p>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-6" />
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-12 reveal-item">
              {[
                { id: 'all', label: 'All Questions' },
                { id: 'parking', label: 'Parking & Valet' },
                { id: 'policy', label: 'Children & Policy' },
                { id: 'transit', label: 'Transit & Access' },
                { id: 'attire', label: 'Attire & Banquet' },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setFaqFilter(filter.id)}
                  onMouseEnter={() => setCursorHoverType('pointer')}
                  onMouseLeave={() => setCursorHoverType('')}
                  className={`px-4 py-2 text-xs uppercase tracking-widest2 rounded-full border transition-all duration-300 cursor-pointer ${
                    faqFilter === filter.id
                      ? 'bg-[#252321] text-[#F7F3ED] border-[#252321] shadow-xs'
                      : 'bg-[#FAF7F2] text-[#8C7F6E] border-[#D8C6A8]/50 hover:border-[#B59A6A] hover:text-[#252321]'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="space-y-4 reveal-item">
              {[
                {
                  id: 'faq-parking',
                  category: 'parking',
                  categoryLabel: 'Parking & Valet',
                  icon: Car,
                  question: 'Where should I park, and is complimentary valet service provided?',
                  highlight: 'Complimentary Valet at Main Porte-Cochère',
                  answer:
                    'Yes, complimentary valet parking is dedicated for all wedding guests at the main porte-cochère of The Langham Jakarta (District 8 SCBD). Simply drive to the main ballroom entrance, and the hotel valet staff will attend to your vehicle.',
                  details: [
                    'Underground self-parking is also readily accessible at District 8 (Levels B1 through B3).',
                    'Please present your parking ticket at the foyer guest liaison desk on the 2nd Floor for complimentary validation before departure.',
                  ],
                },
                {
                  id: 'faq-children',
                  category: 'policy',
                  categoryLabel: 'Children & Plus-One',
                  icon: Baby,
                  question: 'Are children or additional unlisted guests permitted to attend?',
                  highlight: 'Intimate Adults-Only Celebration',
                  answer:
                    'To maintain an intimate, solemn atmosphere and respect ballroom seating capacities, our holy matrimony and evening banquet are primarily intended for adults and the specific names addressed on your invitation.',
                  details: [
                    'If your invitation envelope or digital pass explicitly mentions a plus-one, spouse, or named family members, kindly confirm the exact headcount in your RSVP submission.',
                    'We deeply appreciate your kind understanding and look forward to celebrating together.',
                  ],
                },
                {
                  id: 'faq-transit',
                  category: 'transit',
                  categoryLabel: 'Transportation & Access',
                  icon: Train,
                  question: 'What is the most convenient way to travel to The Langham Jakarta?',
                  highlight: 'District 8 SCBD, South Jakarta',
                  answer:
                    'The Langham is centrally located inside District 8, SCBD, South Jakarta, with direct access from Jl. Jend. Sudirman and Jl. Senopati / SCBD inner ring.',
                  details: [
                    'By MRT: The nearest station is Istora Mandiri (Exit B), located approximately 5 minutes by taxi or a pleasant 10-minute walk through the SCBD pedestrian walkways.',
                    'By Ride-Hailing / Taxi: When booking Silverbird, Bluebird, Grab, or GoCar, set your drop-off point to "The Langham Jakarta - Main Lobby / Ballroom Entrance" for direct foyer access.',
                  ],
                },
                {
                  id: 'faq-schedule',
                  category: 'transit',
                  categoryLabel: 'Arrival & Punctuality',
                  icon: Clock,
                  question: 'What time should guests arrive for the Holy Matrimony & Evening Banquet?',
                  highlight: 'Matrimony Seating: 15:45 WIB Promptly',
                  answer:
                    'For the Holy Matrimony, guests are kindly requested to be seated inside the Grand Conservatory by 15:45 WIB, as solemn vows and the bridal march will commence promptly at 16:00 WIB.',
                  details: [
                    '17:30 WIB: Cocktail reception and welcome hors d’oeuvres commence in the Grand Ballroom Foyer.',
                    '18:30 WIB: Ballroom doors officially open for dinner, first dance, and live orchestral performances.',
                    'Arriving 15–20 minutes prior allows you ample time to check in, validate parking, and enjoy welcome refreshments.',
                  ],
                },
                {
                  id: 'faq-attire',
                  category: 'attire',
                  categoryLabel: 'Dress Code & Formal Attire',
                  icon: Sparkles,
                  question: 'Are formal traditional attires (e.g. Silk Batik Tulis or Kebaya) welcomed?',
                  highlight: 'Formal / Black-Tie Optional',
                  answer:
                    'Yes, absolutely! While our dress code is Formal / Black-Tie Optional (dark suits, tuxedos, and evening gowns), high-formal traditional attires—such as long-sleeved silk Batik Tulis or modern formal kebaya—are warmly celebrated.',
                  details: [
                    'Suggested Palette: Ivory, Champagne, Soft Taupe, and Charcoal Black.',
                    'We kindly recommend avoiding casual denim, sneakers, or daytime casual wear in honor of the formal atmosphere.',
                  ],
                },
                {
                  id: 'faq-dietary',
                  category: 'attire',
                  categoryLabel: 'Banquet & Accessibility',
                  icon: Wine,
                  question: 'Can dietary restrictions, food allergies, or wheelchair accessibility be arranged?',
                  highlight: 'Bespoke Culinary & Accessibility Support',
                  answer:
                    'Yes, our culinary brigade at The Langham has tailored a 5-course banquet with vegetarian, halal-friendly, and specific food allergy accommodations.',
                  details: [
                    'Kindly note any dietary allergies or mobility requests (e.g. wheelchair ramp assistance) in the RSVP message field.',
                    'The Langham features step-free elevator access directly from the porte-cochère and parking garage to the Grand Ballroom level.',
                  ],
                },
                {
                  id: 'faq-contact',
                  category: 'policy',
                  categoryLabel: 'Wedding Concierge',
                  icon: Phone,
                  question: 'Who should I contact if I need assistance on the wedding day?',
                  highlight: 'On-Site Wedding Liaison Desk',
                  answer:
                    'Our professional Wedding Organizer (The Event Liaison Team) will be stationed at the registration desk in the 2nd Floor Grand Ballroom foyer throughout the celebration.',
                  details: [
                    'For urgent arrival assistance, seating inquiries, or special deliveries, you may contact our Wedding Concierge via WhatsApp at +62 812-3456-7890.',
                  ],
                },
              ]
                .filter((item) => faqFilter === 'all' || item.category === faqFilter)
                .map((item) => {
                  const isItemOpen = openFaqId === item.id;
                  const IconComponent = item.icon;

                  return (
                    <div
                      key={item.id}
                      className={`border transition-all duration-300 rounded overflow-hidden ${
                        isItemOpen
                          ? 'border-[#B59A6A] bg-[#FAF7F2] shadow-sm'
                          : 'border-[#D8C6A8]/50 bg-[#FAF7F2]/60 hover:border-[#D8C6A8] hover:bg-[#FAF7F2]'
                      }`}
                    >
                      {/* Accordion Header */}
                      <button
                        onClick={() => setOpenFaqId(isItemOpen ? null : item.id)}
                        onMouseEnter={() => setCursorHoverType('pointer')}
                        onMouseLeave={() => setCursorHoverType('')}
                        aria-expanded={isItemOpen}
                        className="w-full p-6 sm:p-7 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer focus:outline-none"
                      >
                        <div className="flex items-start sm:items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isItemOpen
                                ? 'bg-[#252321] text-[#FAF7F2]'
                                : 'border border-[#D8C6A8] text-[#A38755] bg-[#F7F3ED]'
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase tracking-widest2 text-[#A38755] block font-medium mb-1">
                              {item.categoryLabel}
                            </span>
                            <h3 className="font-serif text-lg sm:text-xl text-[#252321] font-normal leading-snug">
                              {item.question}
                            </h3>
                          </div>
                        </div>

                        <div className="shrink-0 pt-1 sm:pt-0">
                          <div
                            className={`w-8 h-8 rounded-full border border-[#D8C6A8]/60 flex items-center justify-center transition-transform duration-300 ${
                              isItemOpen ? 'rotate-180 bg-[#252321] text-[#F7F3ED] border-[#252321]' : 'text-[#8C7F6E]'
                            }`}
                          >
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                      </button>

                      {/* Accordion Body */}
                      {isItemOpen && (
                        <div className="px-6 pb-7 sm:px-7 sm:pb-8 pt-0 border-t border-[#D8C6A8]/30">
                          {item.highlight && (
                            <div className="inline-block mt-4 mb-3 px-3 py-1 bg-[#D8C6A8]/20 border border-[#D8C6A8]/40 rounded-full text-[11px] uppercase tracking-wider text-[#A38755] font-medium">
                              {item.highlight}
                            </div>
                          )}
                          <p className="text-sm text-[#8C7F6E] font-light leading-relaxed mb-4">
                            {item.answer}
                          </p>
                          {item.details && item.details.length > 0 && (
                            <ul className="space-y-2 mt-3 pt-3 border-t border-[#D8C6A8]/20 text-xs text-[#8C7F6E] font-light">
                              {item.details.map((detail, idx) => (
                                <li key={idx} className="flex items-start gap-2.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#B59A6A] mt-1.5 shrink-0" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>

            {/* Need Additional Assistance Banner */}
            <div className="mt-14 p-8 border border-[#D8C6A8]/60 bg-[#FAF7F2] rounded text-center reveal-item shadow-xs">
              <div className="w-12 h-12 rounded-full border border-[#D8C6A8] flex items-center justify-center text-[#A38755] mx-auto mb-4">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h4 className="font-serif text-2xl text-[#252321] font-light mb-2">
                Have Additional Inquiries?
              </h4>
              <p className="text-xs sm:text-sm text-[#8C7F6E] font-light max-w-md mx-auto mb-6 leading-relaxed">
                Our Wedding Organizer team is at your service for personalized assistance, private valet bookings, or special accessibility accommodations.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/6281234567890?text=Hello%2C%20I%20have%20an%20inquiry%20regarding%20Amelia%20and%20Nathaniel's%20Wedding%20Celebration"
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => setCursorHoverType('pointer')}
                  onMouseLeave={() => setCursorHoverType('')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#252321] text-[#F7F3ED] text-xs uppercase tracking-widest2 font-medium hover:bg-[#A38755] transition-colors cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D8C6A8]" />
                  <span>Contact Wedding Concierge</span>
                </a>
                <a
                  href="#rsvp"
                  onMouseEnter={() => setCursorHoverType('pointer')}
                  onMouseLeave={() => setCursorHoverType('')}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#252321]/30 text-[#252321] text-xs uppercase tracking-widest2 hover:bg-[#ECE5DB] transition-colors cursor-pointer"
                >
                  <span>Proceed to RSVP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 13. RSVP SECTION ==================== */}
        <section id="rsvp" className="py-28 md:py-36 px-6 sm:px-12 bg-[#FAF7F2] border-y border-[#D8C6A8]/30">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-16 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-3">
                Répondez S'il Vous Plaît
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#252321] font-light">
                Will You Join Us?
              </h2>
              <p className="text-sm text-[#A89B8A] font-light mt-3">
                Kindly confirm your presence by 15 October 2026
              </p>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-6" />
            </div>

            <div className="bg-[#F7F3ED] border border-[#D8C6A8]/60 p-8 sm:p-12 shadow-sm rounded relative reveal-item">
              {!rsvpSubmitted ? (
                <form onSubmit={handleRsvpSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="rsvpName"
                      className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium"
                    >
                      Your Full Name *
                    </label>
                    <input
                      id="rsvpName"
                      type="text"
                      required
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({ ...rsvpData, name: e.target.value })}
                      placeholder="e.g. Lord Alexander Bennett"
                      className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#D8C6A8]/60 text-sm text-[#252321] placeholder-[#A89B8A]/60 focus:outline-none focus:border-[#252321] transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="rsvpEmail"
                      className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium"
                    >
                      Your Email Address *
                    </label>
                    <input
                      id="rsvpEmail"
                      type="email"
                      required
                      value={rsvpData.email}
                      onChange={(e) => setRsvpData({ ...rsvpData, email: e.target.value })}
                      placeholder="e.g. alexander.bennett@luxury.com"
                      className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#D8C6A8]/60 text-sm text-[#252321] placeholder-[#A89B8A]/60 focus:outline-none focus:border-[#252321] transition-colors"
                    />
                    <p className="text-[11px] text-[#8C7F6E] mt-1.5 flex items-center gap-1.5">
                      <Mail className="w-3 h-3 text-[#A38755]" />
                      <span>We will send your formal digital wedding pass &amp; itinerary to this email.</span>
                    </p>
                  </div>

                  <div>
                    <span className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-3 font-medium">
                      Attendance Confirmation *
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                          rsvpData.attendance === 'attending'
                            ? 'border-[#B59A6A] bg-[#FAF7F2]'
                            : 'border-[#D8C6A8]/50 bg-[#FAF7F2]/50 hover:border-[#B59A6A]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="attending"
                          checked={rsvpData.attendance === 'attending'}
                          onChange={() => setRsvpData({ ...rsvpData, attendance: 'attending' })}
                          className="accent-[#B59A6A] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs uppercase tracking-wider text-[#252321] font-medium">
                          Joyfully Attending
                        </span>
                      </label>
                      <label
                        className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                          rsvpData.attendance === 'declined'
                            ? 'border-[#B59A6A] bg-[#FAF7F2]'
                            : 'border-[#D8C6A8]/50 bg-[#FAF7F2]/50 hover:border-[#B59A6A]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value="declined"
                          checked={rsvpData.attendance === 'declined'}
                          onChange={() => setRsvpData({ ...rsvpData, attendance: 'declined' })}
                          className="accent-[#B59A6A] w-4 h-4 cursor-pointer"
                        />
                        <span className="text-xs uppercase tracking-wider text-[#8C7F6E]">
                          Regretfully Unable
                        </span>
                      </label>
                    </div>
                  </div>

                  {rsvpData.attendance === 'attending' && (
                    <>
                      {/* Number of Guests & Table Preference in 2 columns on sm screens */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label
                            htmlFor="rsvpGuests"
                            className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium"
                          >
                            Number of Guests *
                          </label>
                          <select
                            id="rsvpGuests"
                            value={rsvpData.guests}
                            onChange={(e) => setRsvpData({ ...rsvpData, guests: e.target.value })}
                            className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#D8C6A8]/60 text-sm text-[#252321] focus:outline-none focus:border-[#252321] transition-colors"
                          >
                            <option value="1">1 Guest (Myself)</option>
                            <option value="2">2 Guests (Couple)</option>
                            <option value="3">3 Guests</option>
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="rsvpTablePreference"
                            className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium flex items-center justify-between"
                          >
                            <span className="flex items-center gap-1.5">
                              <Armchair className="w-3.5 h-3.5 text-[#A38755]" />
                              <span>Table Preference *</span>
                            </span>
                          </label>
                          <div className="relative">
                            <select
                              id="rsvpTablePreference"
                              value={rsvpData.tablePreference}
                              onChange={(e) =>
                                setRsvpData({ ...rsvpData, tablePreference: e.target.value })
                              }
                              className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#D8C6A8]/60 text-sm text-[#252321] focus:outline-none focus:border-[#252321] transition-colors appearance-none cursor-pointer pr-10"
                            >
                              {TABLE_PREFERENCES.map((table) => (
                                <option key={table} value={table}>
                                  {table}
                                </option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-[#8C7F6E]">
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>


                    </>
                  )}

                  <div>
                    <label
                      htmlFor="rsvpMessage"
                      className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium"
                    >
                      Personal Note or Special Requests
                    </label>
                    <textarea
                      id="rsvpMessage"
                      rows={3}
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({ ...rsvpData, message: e.target.value })}
                      placeholder="Kindly share any warm wishes, song suggestions, or special assistance needed..."
                      className="w-full px-4 py-3.5 bg-[#FAF7F2] border border-[#D8C6A8]/60 text-sm text-[#252321] placeholder-[#A89B8A]/60 focus:outline-none focus:border-[#252321] transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingRsvp}
                    onMouseEnter={() => setCursorHoverType('pointer')}
                    onMouseLeave={() => setCursorHoverType('')}
                    className="w-full py-4 bg-[#252321] text-[#F7F3ED] text-xs uppercase tracking-widest2 font-medium transition-all duration-300 hover:bg-[#A38755] hover:shadow-md cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2"
                  >
                    {isSubmittingRsvp ? (
                      <>
                        <Send className="w-4 h-4 animate-bounce text-[#D8C6A8]" />
                        <span>Sending RSVP &amp; Dispatching Email...</span>
                      </>
                    ) : (
                      <span>Send RSVP</span>
                    )}
                  </button>
                </form>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="w-16 h-16 rounded-full border border-[#B59A6A] flex items-center justify-center mx-auto text-[#B59A6A] mb-5">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#252321] mb-2">Thank You</h3>
                  <p className="font-serif italic text-lg text-[#A38755] mb-4">
                    “Your response has been received.”
                  </p>
                  <p className="text-xs text-[#8C7F6E] font-light max-w-md mx-auto leading-relaxed mb-6">
                    We are deeply touched and can't wait to celebrate this special day with you.{' '}
                    {rsvpData.attendance === 'attending'
                      ? `Confirmed for ${rsvpData.guests} guest(s).`
                      : 'We will cherish your warm thoughts from afar.'}
                  </p>

                  {/* Attending Preferences Summary Card */}
                  {rsvpData.attendance === 'attending' && (
                    <div className="mb-6 p-4 sm:p-5 bg-[#FAF7F2] border border-[#D8C6A8]/60 rounded text-left max-w-lg mx-auto space-y-3">
                      <div className="flex items-center justify-between border-b border-[#D8C6A8]/40 pb-2">
                        <span className="text-[10px] uppercase tracking-widest text-[#A38755] font-semibold">
                          Your Reservation Details
                        </span>
                        <span className="text-xs text-[#252321] font-medium">
                          {rsvpData.guests} Guest(s) Confirmed
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#A89B8A] block mb-0.5">
                            Table Preference
                          </span>
                          <span className="text-[#252321] font-medium flex items-center gap-1.5">
                            <Armchair className="w-3.5 h-3.5 text-[#A38755] shrink-0" />
                            <span>{rsvpData.tablePreference}</span>
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#A89B8A] block mb-0.5">
                            Dietary Requirements
                          </span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {rsvpData.dietary.map((item, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 bg-[#F7F3ED] border border-[#D8C6A8] text-[10px] text-[#252321] rounded-full"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {rsvpData.message && (
                        <div className="pt-2 border-t border-[#D8C6A8]/30 text-xs text-[#8C7F6E]">
                          <span className="text-[10px] uppercase tracking-wider text-[#A89B8A] block mb-0.5">
                            Note for the Couple
                          </span>
                          <span className="italic">“{rsvpData.message}”</span>
                        </div>
                      )}
                    </div>
                  )}


                  {/* Share to Instagram Story prompt after RSVP */}
                  <div className="mb-6 flex flex-col items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOpenInstagramStoryShare}
                      onMouseEnter={() => setCursorHoverType('pointer')}
                      onMouseLeave={() => setCursorHoverType('')}
                      className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 text-white text-xs uppercase tracking-widest2 font-semibold rounded-full shadow-md transition-all cursor-pointer"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Share on Your Story Instagram</span>
                    </button>
                    <span className="text-[11px] text-[#8C7F6E] italic">
                      Bagikan template 9:16 elegan ke Instagram Story Anda
                    </span>
                  </div>

                  <button
                    onClick={() => setRsvpSubmitted(false)}
                    className="text-xs text-[#A38755] underline hover:text-[#252321] cursor-pointer"
                  >
                    Edit RSVP response
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ==================== 13. WEDDING WISHES (GUESTBOOK) ==================== */}
        <section className="py-20 md:py-24 px-4 sm:px-6 bg-[#F7F3ED] overflow-hidden">
          <div className="max-w-5xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-8 reveal-item">
              <span className="text-xs uppercase tracking-widest3 text-[#8C7F6E] font-medium block mb-2">
                Words of Love
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#252321] font-light">
                Leave a Note for the Couple
              </h2>
              <p className="text-xs sm:text-sm text-[#A89B8A] font-light mt-2 max-w-md mx-auto">
                Share your blessings and heartfelt prayers for Amelia &amp; Nathaniel
              </p>
              <div className="w-16 h-px bg-[#D8C6A8] mx-auto mt-4" />

              {/* Status & Stream Controls */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs text-[#8C7F6E]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] border border-[#D8C6A8]/50 rounded-full text-[11px] tracking-wider uppercase text-[#252321]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B59A6A] animate-pulse" />
                  <span>{wishes.length} Wishes Received</span>
                </span>

                <button
                  type="button"
                  onClick={() => setIsWishesPaused(!isWishesPaused)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] hover:bg-[#F2ECE1] border border-[#D8C6A8]/60 rounded-full text-[11px] tracking-wider uppercase text-[#252321] transition-all cursor-pointer active:scale-95"
                  title={isWishesPaused ? 'Play animation' : 'Pause animation to read'}
                >
                  {isWishesPaused ? (
                    <>
                      <Play className="w-3 h-3 text-[#B59A6A]" />
                      <span>Resume Stream</span>
                    </>
                  ) : (
                    <>
                      <Pause className="w-3 h-3 text-[#B59A6A]" />
                      <span>Pause to Read</span>
                    </>
                  )}
                </button>
                <span className="hidden sm:inline text-[11px] text-[#A89B8A] italic">
                  (Arahkan kursor atau sentuh kartu untuk membaca dengan tenang)
                </span>
              </div>
            </div>

            {/* Continuous Smooth Left-Moving Wishes Stream (Marquee) */}
            <div
              className="relative w-full overflow-hidden py-3 reveal-item group"
              onMouseEnter={() => setCursorHoverType('pointer')}
              onMouseLeave={() => setCursorHoverType('')}
            >
              {/* Soft Gradient Masks on edges */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#F7F3ED] to-transparent z-10" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#F7F3ED] to-transparent z-10" />

              <div
                className={`animate-wishes-marquee flex gap-5 items-stretch ${
                  isWishesPaused ? 'marquee-paused' : ''
                }`}
              >
                {/* First Pass */}
                {(wishes.length < 5 ? [...wishes, ...wishes] : wishes).map((w, idx) => (
                  <div
                    key={`wish-p1-${w.id}-${idx}`}
                    className="w-[280px] sm:w-[350px] shrink-0 p-5 sm:p-6 bg-[#FAF7F2] border border-[#D8C6A8]/60 shadow-[0_4px_20px_rgba(37,35,33,0.03)] rounded flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(181,154,106,0.18)] hover:border-[#B59A6A] hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-serif text-2xl text-[#D8C6A8] leading-none">“</span>
                        {w.timestamp && (
                          <span className="text-[10px] text-[#A89B8A] tracking-wider uppercase font-mono">
                            {w.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="font-serif italic text-base sm:text-[17px] text-[#252321] leading-relaxed mb-4">
                        {w.text}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#D8C6A8]/30 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B59A6A]" />
                      <span className="text-xs uppercase tracking-widest text-[#252321] font-medium truncate">
                        {w.name}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Duplicate Pass for Continuous Seamless Infinite Loop */}
                {(wishes.length < 5 ? [...wishes, ...wishes] : wishes).map((w, idx) => (
                  <div
                    key={`wish-p2-${w.id}-${idx}`}
                    aria-hidden="true"
                    className="w-[280px] sm:w-[350px] shrink-0 p-5 sm:p-6 bg-[#FAF7F2] border border-[#D8C6A8]/60 shadow-[0_4px_20px_rgba(37,35,33,0.03)] rounded flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_rgba(181,154,106,0.18)] hover:border-[#B59A6A] hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-serif text-2xl text-[#D8C6A8] leading-none">“</span>
                        {w.timestamp && (
                          <span className="text-[10px] text-[#A89B8A] tracking-wider uppercase font-mono">
                            {w.timestamp}
                          </span>
                        )}
                      </div>
                      <p className="font-serif italic text-base sm:text-[17px] text-[#252321] leading-relaxed mb-4">
                        {w.text}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#D8C6A8]/30 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B59A6A]" />
                      <span className="text-xs uppercase tracking-widest text-[#252321] font-medium truncate">
                        {w.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compact Space-Saving Wish Form */}
            <div className="max-w-2xl mx-auto mt-8 reveal-item">
              <form
                onSubmit={handleWishSubmit}
                className="bg-[#FAF7F2] border border-[#D8C6A8]/60 p-5 sm:p-7 shadow-xs rounded"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 mb-4">
                  <div className="sm:col-span-5">
                    <label
                      htmlFor="wishName"
                      className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium"
                    >
                      Nama Anda *
                    </label>
                    <input
                      id="wishName"
                      type="text"
                      required
                      value={wishInput.name}
                      onChange={(e) => setWishInput({ ...wishInput, name: e.target.value })}
                      placeholder="e.g. Olivia Sinclair"
                      className="w-full px-4 py-2.5 bg-[#F7F3ED] border border-[#D8C6A8]/60 text-sm text-[#252321] focus:outline-none focus:border-[#252321]"
                    />
                  </div>

                  <div className="sm:col-span-7">
                    <label
                      htmlFor="wishText"
                      className="block text-xs uppercase tracking-widest text-[#252321]/80 mb-2 font-medium"
                    >
                      Pesan &amp; Doa *
                    </label>
                    <textarea
                      id="wishText"
                      rows={2}
                      required
                      value={wishInput.text}
                      onChange={(e) => setWishInput({ ...wishInput, text: e.target.value })}
                      placeholder="Tuliskan ucapan dan doa tulus Anda..."
                      className="w-full px-4 py-2 bg-[#F7F3ED] border border-[#D8C6A8]/60 text-sm text-[#252321] focus:outline-none focus:border-[#252321] resize-none"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#D8C6A8]/30">
                  <button
                    type="submit"
                    onMouseEnter={() => setCursorHoverType('pointer')}
                    onMouseLeave={() => setCursorHoverType('')}
                    className="w-full sm:w-auto px-7 py-3 bg-[#252321] text-[#F7F3ED] text-xs uppercase tracking-widest2 font-medium hover:bg-[#A38755] transition-colors cursor-pointer active:scale-95"
                  >
                    Kirim Ucapan
                  </button>

                  {wishSubmitted && (
                    <p className="text-xs text-[#A38755] text-center italic font-serif">
                      ✦ Terima kasih! Ucapan Anda telah ditambahkan ke kartu berjalan.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* ==================== 14. DIGITAL GIFT ==================== */}
        <section className="py-24 px-6 bg-[#FAF7F2] border-y border-[#D8C6A8]/30">
          <div className="max-w-2xl mx-auto text-center reveal-item">
            <div className="w-12 h-12 rounded-full border border-[#D8C6A8] flex items-center justify-center text-[#A38755] mx-auto mb-6">
              <Gift className="w-5 h-5" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#252321] font-light mb-4">
              Your Presence is Our Greatest Gift
            </h2>
            <p className="text-xs sm:text-sm text-[#8C7F6E] font-light leading-relaxed max-w-lg mx-auto mb-10">
              Your presence, prayers, and warm wishes are more than enough. For those who wish to extend
              a token of blessing, we have provided our digital transfer details below.
            </p>

            {/* Discreet Gift Card */}
            <div className="border border-[#D8C6A8]/60 bg-[#F7F3ED] p-8 max-w-md mx-auto shadow-sm text-left">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase tracking-widest2 text-[#A89B8A] font-medium">
                  Bank Transfer
                </span>
                <span className="font-serif italic text-base text-[#B59A6A] font-normal">BCA</span>
              </div>
              <div className="mb-4">
                <span className="text-[11px] uppercase tracking-wider text-[#A89B8A] block">
                  Account Name
                </span>
                <p className="font-serif text-xl text-[#252321]">Amelia Grace Laurent</p>
              </div>
              <div className="flex items-center justify-between bg-[#FAF7F2] p-3 border border-[#D8C6A8]/40 rounded mb-4">
                <span className="font-mono text-sm tracking-wider text-[#252321] font-medium">
                  1234567890
                </span>
                <button
                  onClick={handleCopyAccount}
                  onMouseEnter={() => setCursorHoverType('pointer')}
                  onMouseLeave={() => setCursorHoverType('')}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#252321] text-[#F7F3ED] text-[10px] uppercase tracking-widest hover:bg-[#B59A6A] transition-colors cursor-pointer"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3 h-3 text-[#E5D8C3]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              {copiedAccount && (
                <p className="text-[11px] text-[#A38755] text-center italic transition-all">
                  Copied to clipboard with blessings!
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ==================== 15. CLOSING SECTION ==================== */}
        <section className="py-28 md:py-36 px-6 bg-[#F7F3ED] text-center relative overflow-hidden">
          {/* Horizon Closing Doves Flying Together in Tandem (Requirement #11) */}
          <HorizonClosingDoves />

          <div className="max-w-2xl mx-auto relative z-10 reveal-item">
            <div className="w-16 h-16 rounded-full border border-[#D8C6A8]/80 flex items-center justify-center mx-auto mb-8">
              <span className="font-serif italic text-2xl text-[#B59A6A]">A &amp; N</span>
            </div>
            <p className="text-xs uppercase tracking-widest3 text-[#8C7F6E] mb-4 font-medium">
              A Timeless Union
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl text-[#252321] font-light tracking-wide mb-6 uppercase">
              And so, our forever begins.
            </h2>
            <div className="w-16 h-px bg-[#D8C6A8] mx-auto mb-8" />
            <p className="font-serif italic text-3xl sm:text-4xl text-[#A38755] mb-8">
              Amelia &amp; Nathaniel
            </p>
            <p className="text-sm text-[#8C7F6E] font-light leading-relaxed mb-6 max-w-lg mx-auto">
              Thank you for being an indispensable part of our individual paths and our united future.
            </p>
            <p className="text-xs uppercase tracking-widest3 text-[#A89B8A] font-medium">
              Thank you for celebrating with us.
            </p>
          </div>
        </section>

        {/* ==================== 16. FOOTER ==================== */}
        <footer className="py-12 px-6 bg-[#252321] text-[#F7F3ED]/70 border-t border-[#383533] text-center text-xs">
          <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
            <p className="font-serif text-xl tracking-wider text-[#D8C6A8]">
              Amelia Grace &amp; Nathaniel Alexander
            </p>
            <p className="text-[11px] uppercase tracking-widest2 text-[#A89B8A]">
              Saturday, 14 November 2026 • The Langham, Jakarta
            </p>
            <div className="w-12 h-px bg-[#D8C6A8]/30 my-2" />

            {/* Share on Your Story Instagram Section */}
            <div className="flex flex-col items-center gap-2.5 my-2">
              <button
                onClick={handleOpenInstagramStoryShare}
                onMouseEnter={() => setCursorHoverType('pointer')}
                onMouseLeave={() => setCursorHoverType('')}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-r from-[#FAF7F2]/15 via-[#FAF7F2]/10 to-[#FAF7F2]/15 hover:from-[#D8C6A8] hover:to-[#B59A6A] hover:text-[#252321] text-[#FAF7F2] border border-[#D8C6A8]/60 hover:border-[#D8C6A8] rounded-full text-xs uppercase tracking-widest2 font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D8C6A8]"
                aria-label="Share on Your Story Instagram"
              >
                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Instagram className="w-3 h-3 text-white" />
                </div>
                <span>Share on Your Story Instagram</span>
              </button>

              <p className="text-[11px] text-[#A89B8A] italic max-w-md text-center">
                Template 9:16 siap pakai • Kolom nama tamu dapat diisi manual di Instagram Story
              </p>

              {shareToast && (
                <div className="mt-1 flex items-center gap-2 px-4 py-2 bg-[#FAF7F2] text-[#252321] border border-[#D8C6A8] rounded-full text-xs shadow-md">
                  <Check className="w-3.5 h-3.5 text-[#B59A6A]" />
                  <span className="font-medium">{shareToast}</span>
                </div>
              )}
            </div>

            <div className="w-12 h-px bg-[#D8C6A8]/30 my-2" />
            <p className="text-[10px] text-[#A89B8A]/60 tracking-wider">
              Crafted with love for #AmeliaAndNathan • Portfolio Luxury Wedding Invitation Studio
            </p>
          </div>
        </footer>
      </main>

      {/* ==================== 18. SIMULATED EMAIL TOAST NOTIFICATION ==================== */}
      {showEmailToast && (
        <div
          role="alert"
          aria-live="assertive"
          className="fixed top-20 right-4 sm:right-8 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-[410px] bg-[#FAF7F2] border-2 border-[#D8C6A8] shadow-[0_20px_50px_rgba(37,35,33,0.18)] rounded-xs overflow-hidden transition-all duration-500"
        >
          <div className="p-4 sm:p-5">
            <div className="flex items-start gap-3.5">
              <div className="relative w-10 h-10 rounded-full bg-[#252321] text-[#E5D8C3] flex items-center justify-center shrink-0 shadow-xs">
                <Mail className="w-5 h-5 text-[#D8C6A8]" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#FAF7F2] rounded-full animate-ping" />
                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#FAF7F2] rounded-full" />
              </div>

              <div className="flex-1 pr-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase tracking-widest2 text-[#A38755] font-semibold">
                    Email Dispatched
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-medium">
                    Delivered
                  </span>
                </div>

                <h4 className="font-serif text-lg text-[#252321] leading-tight font-medium">
                  Confirmation Sent to Your Email
                </h4>

                <p className="text-xs text-[#8C7F6E] mt-1.5 leading-relaxed">
                  A wedding pass &amp; celebration itinerary have been sent to{' '}
                  <span className="font-medium text-[#252321] underline decoration-[#D8C6A8]">
                    {rsvpData.email || 'your email'}
                  </span>{' '}
                  for <strong className="text-[#252321]">{rsvpData.name || 'Special Guest'}</strong>.
                  {rsvpData.attendance === 'attending' && (
                    <span className="block mt-1 text-[11px] text-[#A38755] font-medium">
                      Table: {rsvpData.tablePreference}
                    </span>
                  )}
                </p>

                <div className="mt-3.5 flex items-center justify-end">
                  <button
                    type="button"
                    onClick={() => setShowEmailToast(false)}
                    className="text-[10px] uppercase tracking-widest text-[#8C7F6E] hover:text-[#252321] cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowEmailToast(false)}
                aria-label="Close notification"
                className="text-[#A89B8A] hover:text-[#252321] p-1 cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toast Decrement Progress Bar */}
          <div className="h-1 w-full bg-[#ECE5DB]">
            <div
              className="h-full bg-gradient-to-r from-[#B59A6A] to-[#D8C6A8] transition-all duration-75 ease-linear"
              style={{ width: `${toastProgress}%` }}
            />
          </div>
        </div>
      )}



      {/* Instagram Story Share Modal */}
      <InstagramStoryShareModal
        isOpen={isIgStoryModalOpen}
        onClose={() => setIsIgStoryModalOpen(false)}
        invitationUrl={typeof window !== 'undefined' ? window.location.href : 'https://amelia-nathaniel.wedding'}
        coupleNames="Amelia & Nathaniel"
        weddingDate="Saturday, 14 November 2026"
        venueName="The Langham, Jakarta"
      />
      {/* Background Wedding Audio Player */}
      <WeddingAudioPlayer isInvitationOpen={isOpen} />
    </div>
  );
}
