import React, { useState, useEffect, useRef } from 'react';
import {
  Instagram,
  Download,
  Copy,
  ExternalLink,
  Check,
  X,
  Sparkles,
  Share2,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

interface InstagramStoryShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitationUrl?: string;
  coupleNames?: string;
  weddingDate?: string;
  venueName?: string;
}

export const InstagramStoryShareModal: React.FC<InstagramStoryShareModalProps> = ({
  isOpen,
  onClose,
  invitationUrl = typeof window !== 'undefined' ? window.location.href : 'https://amelia-nathaniel.wedding',
  coupleNames = 'Amelia & Nathaniel',
  weddingDate = 'Saturday, 14 November 2026',
  venueName = 'The Langham, Jakarta',
}) => {
  const [activeTheme, setActiveTheme] = useState<'ivory' | 'noir'>('ivory');
  const [copiedLink, setCopiedLink] = useState(false);
  const [previewDataUrl, setPreviewDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [shareSuccess, setShareSuccess] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Render high-res 1080x1920 Instagram Story template on canvas
  const generateStoryImage = (theme: 'ivory' | 'noir'): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        resolve('');
        return;
      }

      const isNoir = theme === 'noir';

      // 1. Background Fill
      if (isNoir) {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
        bgGrad.addColorStop(0, '#1E1C1A');
        bgGrad.addColorStop(0.5, '#151413');
        bgGrad.addColorStop(1, '#0C0B0A');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1080, 1920);

        // Subtle warm vignette
        const radialGrad = ctx.createRadialGradient(540, 960, 200, 540, 960, 900);
        radialGrad.addColorStop(0, 'rgba(181, 154, 106, 0.08)');
        radialGrad.addColorStop(1, 'rgba(0, 0, 0, 0.45)');
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, 1080, 1920);
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, 1920);
        bgGrad.addColorStop(0, '#FAF7F2');
        bgGrad.addColorStop(0.5, '#F7F2EA');
        bgGrad.addColorStop(1, '#EFEAE0');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 1080, 1920);

        // Subtle ambient center warmth
        const radialGrad = ctx.createRadialGradient(540, 850, 250, 540, 850, 950);
        radialGrad.addColorStop(0, 'rgba(255, 255, 255, 0.6)');
        radialGrad.addColorStop(1, 'rgba(216, 198, 168, 0.18)');
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, 1080, 1920);
      }

      // 2. Elegant Dual Outer Borders & Gold Corners
      const margin = 70;
      const primaryBorderColor = isNoir ? 'rgba(216, 198, 168, 0.65)' : 'rgba(181, 154, 106, 0.7)';
      const innerBorderColor = isNoir ? 'rgba(216, 198, 168, 0.28)' : 'rgba(216, 198, 168, 0.35)';

      // Outer thin line
      ctx.strokeStyle = primaryBorderColor;
      ctx.lineWidth = 2.5;
      ctx.strokeRect(margin, margin, 1080 - margin * 2, 1920 - margin * 2);

      // Inner hairline
      const innerMargin = margin + 18;
      ctx.strokeStyle = innerBorderColor;
      ctx.lineWidth = 1.2;
      ctx.strokeRect(innerMargin, innerMargin, 1080 - innerMargin * 2, 1920 - innerMargin * 2);

      // Corner Accents
      const drawCornerAccent = (x: number, y: number, dirX: number, dirY: number) => {
        ctx.strokeStyle = isNoir ? '#D8C6A8' : '#B59A6A';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + dirX * 36, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + dirY * 36);
        ctx.stroke();

        // Little diamond at corner
        ctx.fillStyle = isNoir ? '#D8C6A8' : '#B59A6A';
        ctx.beginPath();
        ctx.arc(x + dirX * 10, y + dirY * 10, 3, 0, Math.PI * 2);
        ctx.fill();
      };

      drawCornerAccent(margin, margin, 1, 1);
      drawCornerAccent(1080 - margin, margin, -1, 1);
      drawCornerAccent(margin, 1920 - margin, 1, -1);
      drawCornerAccent(1080 - margin, 1920 - margin, -1, -1);

      // 3. Decorative Doves Flight Silhouette
      const drawDoveSilhouette = (cx: number, cy: number, scale: number, flip: boolean) => {
        ctx.save();
        ctx.translate(cx, cy);
        if (flip) ctx.scale(-scale, scale);
        else ctx.scale(scale, scale);

        ctx.fillStyle = isNoir ? '#F5EFE6' : '#252321';
        ctx.shadowColor = isNoir ? 'rgba(216, 198, 168, 0.4)' : 'rgba(0, 0, 0, 0.2)';
        ctx.shadowBlur = 8;

        // Slim Dove body & wings path
        const dovePath = new Path2D(
          'M 72 23.5 C 68 22.5 65 21 59 20 C 51 20.5 45 23.5 39 26.5 C 33 28.5 27 30.5 22 32.5 C 18 34.5 12 37.5 5 43.5 C 8 42.5 12 40.5 15 38.5 C 10 43.5 6 47.5 2 49.5 C 7 47.5 12 44.5 16 42.5 C 11 48 7 52.5 5 54.5 C 11 49.5 17 43.5 23 37 C 28 36 33 35 38 34 C 46 33 54 30.5 60 27 C 64 25 67 24.5 69 24 Z'
        );
        ctx.fill(dovePath);

        // Near wing
        const wingPath = new Path2D(
          'M 38 27 C 42 22 45 15 43 4 C 40 8 38 13 37 15 C 37 11 36 7 34 6 C 35 11 34 15 32 17 C 32 13 31 10 29 9 C 30 14 30 17 28 20 C 27 16 25 14 23 14 C 24 19 26 23 28 25 C 31 26 35 27 38 27 Z'
        );
        ctx.fill(wingPath);

        ctx.restore();
      };

      // Draw two graceful doves at upper corners
      drawDoveSilhouette(240, 240, 1.1, false);
      drawDoveSilhouette(840, 260, 0.85, true);

      // 4. Header & Monogram / Seal
      ctx.textAlign = 'center';

      // Small Monogram Seal
      ctx.strokeStyle = isNoir ? 'rgba(216, 198, 168, 0.6)' : 'rgba(181, 154, 106, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(540, 280, 48, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = '300 32px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isNoir ? '#D8C6A8' : '#B59A6A';
      ctx.fillText('A & N', 540, 292);

      // Tagline
      ctx.font = '500 22px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? '#C7BEB3' : '#8C7F6E';
      ctx.letterSpacing = '6px';
      ctx.fillText('THE WEDDING CELEBRATION', 540, 390);

      // Delicate Divider
      ctx.strokeStyle = isNoir ? 'rgba(216, 198, 168, 0.4)' : 'rgba(181, 154, 106, 0.4)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(420, 420);
      ctx.lineTo(660, 420);
      ctx.stroke();

      // Diamond center
      ctx.fillStyle = isNoir ? '#D8C6A8' : '#B59A6A';
      ctx.beginPath();
      ctx.arc(540, 420, 4, 0, Math.PI * 2);
      ctx.fill();

      // 5. Main Couple Names (Editorial Typography)
      ctx.font = 'italic 300 86px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isNoir ? '#FAF7F2' : '#252321';
      ctx.fillText('Amelia & Nathaniel', 540, 530);

      ctx.font = '400 28px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isNoir ? '#D8C6A8' : '#B59A6A';
      ctx.fillText('Amelia Grace  &  Nathaniel Alexander', 540, 600);

      // Date & Venue
      ctx.font = '500 26px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? '#E5D8C3' : '#383533';
      ctx.fillText('SATURDAY, 14 NOVEMBER 2026', 540, 680);

      ctx.font = '400 24px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? '#A89B8A' : '#736B63';
      ctx.fillText('The Langham, Jakarta', 540, 725);

      // 6. "DEAR SPECIAL GUEST" SECTION (BLANK FOR INSTAGRAM MANUAL INPUT)
      // Exactly as requested: Name is left blank so user can type/mention in IG Stories!
      const boxY = 820;
      const boxW = 840;
      const boxH = 340;
      const boxX = (1080 - boxW) / 2;

      // Card container for Guest Name
      ctx.fillStyle = isNoir ? 'rgba(38, 35, 33, 0.65)' : 'rgba(255, 255, 255, 0.75)';
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 16);
      ctx.fill();

      ctx.strokeStyle = isNoir ? 'rgba(216, 198, 168, 0.35)' : 'rgba(181, 154, 106, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Inner Label
      ctx.font = '600 20px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? '#D8C6A8' : '#B59A6A';
      ctx.fillText('CORDIALLY INVITED TO OUR WEDDING', 540, boxY + 60);

      // "Kepada Yth. / Dear:"
      ctx.font = 'italic 400 32px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isNoir ? '#FAF7F2' : '#252321';
      ctx.fillText('Dear Valued Guest', 540, boxY + 120);

      // Elegant Underline / Line for Manual Name Writing in IG Stories
      const lineY = boxY + 200;
      ctx.strokeStyle = isNoir ? 'rgba(216, 198, 168, 0.75)' : 'rgba(181, 154, 106, 0.8)';
      ctx.lineWidth = 2;
      ctx.setLineDash([8, 8]);
      ctx.beginPath();
      ctx.moveTo(boxX + 90, lineY);
      ctx.lineTo(boxX + boxW - 90, lineY);
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      // Friendly subtle hint for Instagram Text tool
      ctx.font = 'italic 400 22px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? 'rgba(216, 198, 168, 0.75)' : 'rgba(140, 127, 110, 0.8)';
      ctx.fillText('( Write guest name / mention @guest on your Story )', 540, boxY + 265);

      // 7. INSTAGRAM STORY "LINK STICKER" AREA
      const stickerY = 1240;
      const stickerW = 840;
      const stickerH = 260;
      const stickerX = (1080 - stickerW) / 2;

      ctx.fillStyle = isNoir ? 'rgba(25, 23, 22, 0.7)' : 'rgba(247, 243, 237, 0.85)';
      ctx.beginPath();
      ctx.roundRect(stickerX, stickerY, stickerW, stickerH, 18);
      ctx.fill();

      // Dashed sticker border
      ctx.strokeStyle = isNoir ? '#D8C6A8' : '#B59A6A';
      ctx.lineWidth = 2;
      ctx.setLineDash([10, 10]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Link Sticker Icon & Label
      ctx.font = '600 20px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? '#D8C6A8' : '#B59A6A';
      ctx.fillText('🔗 PLACE LINK STICKER HERE', 540, stickerY + 68);

      ctx.font = 'italic 300 36px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isNoir ? '#FAF7F2' : '#252321';
      ctx.fillText('Open Wedding Invitation', 540, stickerY + 130);

      ctx.font = '500 22px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? 'rgba(216, 198, 168, 0.85)' : 'rgba(115, 107, 99, 0.9)';
      ctx.fillText('Tap link sticker to view invitation & RSVP', 540, stickerY + 190);

      // 8. Bottom Hashtag & Decorative Footer
      ctx.font = 'italic 400 30px "Playfair Display", Georgia, serif';
      ctx.fillStyle = isNoir ? '#D8C6A8' : '#B59A6A';
      ctx.fillText('#AmeliaAndNathan', 540, 1620);

      ctx.font = '300 20px Montserrat, -apple-system, sans-serif';
      ctx.fillStyle = isNoir ? '#8C7F6E' : '#A89B8A';
      ctx.fillText('The honor of your presence and blessings is requested', 540, 1675);

      // Tiny bottom luxury crest line
      ctx.strokeStyle = isNoir ? 'rgba(216, 198, 168, 0.3)' : 'rgba(181, 154, 106, 0.35)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(460, 1720);
      ctx.lineTo(620, 1720);
      ctx.stroke();

      const dataUrl = canvas.toDataURL('image/png');
      resolve(dataUrl);
    });
  };

  // Re-render when modal opens or theme changes
  useEffect(() => {
    if (isOpen) {
      setIsGenerating(true);
      generateStoryImage(activeTheme).then((dataUrl) => {
        setPreviewDataUrl(dataUrl);
        setIsGenerating(false);
      });
    }
  }, [isOpen, activeTheme]);

  // Convert DataUrl to File for Web Share API
  const dataUrlToFile = async (dataUrl: string, filename: string): Promise<File> => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], filename, { type: 'image/png' });
  };

  // 1. Direct Share on Instagram Story Handler
  const handleShareToInstagramStory = async () => {
    setIsGenerating(true);

    // Auto-copy the link first so the user can easily paste it as an Instagram Link Sticker
    try {
      await navigator.clipboard.writeText(invitationUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 4000);
    } catch {
      // ignore
    }

    const dataUrl = previewDataUrl || (await generateStoryImage(activeTheme));

    try {
      const storyFile = await dataUrlToFile(dataUrl, 'amelia-nathaniel-wedding-story.png');

      // Check if native Web Share with files is supported (mobile iOS / Android Safari / Chrome)
      if (
        typeof navigator !== 'undefined' &&
        navigator.canShare &&
        navigator.canShare({ files: [storyFile] })
      ) {
        await navigator.share({
          title: 'Amelia & Nathaniel Wedding Invitation',
          text: `You are cordially invited to celebrate our wedding! ${invitationUrl}`,
          files: [storyFile],
        });
        setShareSuccess('Successfully shared to Instagram Story!');
        setTimeout(() => setShareSuccess(null), 4000);
        setIsGenerating(false);
        return;
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setIsGenerating(false);
        return;
      }
    }

    // Fallback: Trigger direct image download + open Instagram app
    handleDownloadImage();

    // Launch Instagram Story / App deep link
    setTimeout(() => {
      // Try opening Instagram camera / story
      window.location.href = 'instagram://story-camera';
      setTimeout(() => {
        // Fallback if app doesn't open
        window.open('https://www.instagram.com/', '_blank');
      }, 1000);
    }, 600);

    setShareSuccess('Story card saved & link copied! Open Instagram to share.');
    setTimeout(() => setShareSuccess(null), 5000);
    setIsGenerating(false);
  };

  // 2. Download Story Image (1080x1920 HD)
  const handleDownloadImage = async () => {
    const dataUrl = previewDataUrl || (await generateStoryImage(activeTheme));
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `Amelia-Nathaniel-Wedding-Story-${activeTheme}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShareSuccess('HD Story card downloaded to your device!');
    setTimeout(() => setShareSuccess(null), 3500);
  };

  // 3. Copy Invitation Link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(invitationUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    });
  };

  // 4. Direct Open Instagram
  const handleOpenInstagramApp = () => {
    window.location.href = 'instagram://story-camera';
    setTimeout(() => {
      window.open('https://www.instagram.com/', '_blank');
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#1A1817]/80 backdrop-blur-md transition-opacity">
      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-3xl bg-[#FAF7F2] text-[#252321] rounded-2xl shadow-2xl border border-[#D8C6A8] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8C6A8]/40 bg-[#F7F3ED]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FD1D1D] via-[#E1306C] to-[#833AB4] flex items-center justify-center text-white shadow-sm">
              <Instagram className="w-4 h-4" />
            </div>
            <div>
              <h3 id="modal-title" className="font-serif text-lg font-medium text-[#252321]">
                Share on Instagram Story
              </h3>
              <p className="text-[11px] text-[#8C7F6E]">
                Share this elegant wedding card directly to your Instagram Story
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8C7F6E] hover:text-[#252321] hover:bg-[#D8C6A8]/20 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left Column: 9:16 Instagram Story Preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            {/* Theme Selector */}
            <div className="flex items-center gap-2 p-1 bg-[#EFEAE0] rounded-full mb-3 text-xs">
              <button
                onClick={() => setActiveTheme('ivory')}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  activeTheme === 'ivory'
                    ? 'bg-[#FAF7F2] text-[#252321] shadow-xs'
                    : 'text-[#8C7F6E] hover:text-[#252321]'
                }`}
              >
                Ivory Linen
              </button>
              <button
                onClick={() => setActiveTheme('noir')}
                className={`px-3.5 py-1.5 rounded-full font-medium transition-all ${
                  activeTheme === 'noir'
                    ? 'bg-[#252321] text-[#FAF7F2] shadow-xs'
                    : 'text-[#8C7F6E] hover:text-[#252321]'
                }`}
              >
                Noir Velvet
              </button>
            </div>

            {/* Mobile Phone Mockup Preview */}
            <div className="relative w-[210px] sm:w-[230px] aspect-[9/16] rounded-[28px] p-2 bg-[#252321] shadow-xl border-4 border-[#3D3A37] flex flex-col overflow-hidden">
              {/* Instagram Top Bar Mockup */}
              <div className="absolute top-3 left-4 right-4 z-10 flex items-center justify-between text-white/80 text-[9px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-500 to-rose-500 border border-white/60" />
                  <span className="font-semibold text-white">Your Story</span>
                </div>
                <span className="opacity-75">Just now</span>
              </div>

              {/* Story Content Canvas Render */}
              <div className="w-full h-full rounded-[20px] overflow-hidden bg-white relative flex items-center justify-center">
                {isGenerating ? (
                  <div className="flex flex-col items-center gap-2 text-xs text-[#8C7F6E]">
                    <div className="w-6 h-6 border-2 border-[#D8C6A8] border-t-transparent rounded-full animate-spin" />
                    <span>Preparing story card...</span>
                  </div>
                ) : previewDataUrl ? (
                  <img
                    src={previewDataUrl}
                    alt="Instagram Story Preview"
                    className="w-full h-full object-cover select-none"
                  />
                ) : null}
              </div>

              {/* Bottom Home Indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-white/40 rounded-full pointer-events-none" />
            </div>

            <span className="text-[10px] text-[#8C7F6E] mt-2 italic">
              High Resolution 1080 × 1920 (Instagram Story Size)
            </span>
          </div>

          {/* Right Column: Actions & Guide */}
          <div className="md:col-span-7 flex flex-col justify-between h-full space-y-5">
            {/* Guide Info */}
            <div className="p-4 bg-[#F2EDE4] rounded-xl border border-[#D8C6A8]/50 space-y-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest2 font-semibold text-[#8C7F6E]">
                <Sparkles className="w-3.5 h-3.5 text-[#B59A6A]" />
                <span>Quick Sharing Guide</span>
              </div>
              <ul className="text-xs text-[#59524A] space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#B59A6A] shrink-0">1.</span>
                  <span>
                    <strong>Guest Name Area:</strong> The guest name space is left open so you can freely
                    type names or tag friends{' '}
                    <code className="bg-[#FAF7F2] px-1 rounded text-[#252321]">@username</code>{' '}
                    using Instagram Story's text tool.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#B59A6A] shrink-0">2.</span>
                  <span>
                    <strong>Link Sticker:</strong> On Instagram Story, open the Stickers menu, select{' '}
                    <code className="bg-[#FAF7F2] px-1 rounded text-[#252321]">Link</code>,{' '}
                    and paste our invitation link so guests can tap and RSVP instantly.
                  </span>
                </li>
              </ul>
            </div>

            {/* Notification / Toast inside modal */}
            {shareSuccess && (
              <div className="flex items-center gap-2 p-3 bg-[#EAF5E9] text-[#22543D] border border-[#9AE6B4] rounded-lg text-xs animate-fade-in">
                <Check className="w-4 h-4 text-green-600 shrink-0" />
                <span className="font-medium">{shareSuccess}</span>
              </div>
            )}

            {/* Main Action Buttons */}
            <div className="space-y-3 pt-1">
              {/* Button 1: Primary Share to Story */}
              <button
                onClick={handleShareToInstagramStory}
                disabled={isGenerating}
                className="w-full py-3.5 px-5 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] hover:opacity-95 text-white rounded-xl text-xs uppercase tracking-widest2 font-semibold flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Instagram className="w-4 h-4" />
                <span>Share to Instagram Story</span>
              </button>

              {/* Button 2 & 3 in grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Download Story Card */}
                <button
                  onClick={handleDownloadImage}
                  className="py-3 px-4 bg-[#FAF7F2] hover:bg-[#F2EDE4] text-[#252321] border border-[#D8C6A8] rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#B59A6A]" />
                  <span>Download Story Card</span>
                </button>

                {/* Copy Invitation Link */}
                <button
                  onClick={handleCopyLink}
                  className="py-3 px-4 bg-[#FAF7F2] hover:bg-[#F2EDE4] text-[#252321] border border-[#D8C6A8] rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-600" />
                      <span className="text-green-700">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B59A6A]" />
                      <span>Copy Invitation Link</span>
                    </>
                  )}
                </button>
              </div>

              {/* Direct Open Instagram App link */}
              <button
                onClick={handleOpenInstagramApp}
                className="w-full py-2.5 text-center text-xs text-[#8C7F6E] hover:text-[#252321] underline flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>Open Instagram App</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

