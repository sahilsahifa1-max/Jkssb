import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Smartphone, Share, PlusSquare } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Check if dismissed before in session
    const hasDismissed = sessionStorage.getItem('jkssb_pwa_dismissed');
    if (hasDismissed) return;

    // Detect iOS Safari
    const ua = window.navigator.userAgent;
    const isIosDevice = /iPhone|iPad|iPod/.test(ua) && !(window as unknown as { MSStream?: unknown }).MSStream;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      ('standalone' in window.navigator && (window.navigator as unknown as { standalone: boolean }).standalone);

    if (isIosDevice && !isStandalone) {
      setIsIOS(true);
      // Only show after a slight delay
      const timer = setTimeout(() => setShowPrompt(true), 3500);
      return () => clearTimeout(timer);
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIOS) {
      setShowIOSInstructions(true);
      return;
    }

    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    
    if (choiceResult.outcome === 'accepted') {
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem('jkssb_pwa_dismissed', 'true');
  };

  if (!showPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="pwa-install-banner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed bottom-4 left-4 z-40 max-w-sm w-[calc(100%-2rem)] sm:w-auto p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-950/20 flex flex-col gap-3"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center text-white shrink-0 shadow-xs">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Install JKSSB Papers
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Instant offline paper access on mobile
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Dismiss app install banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {showIOSInstructions ? (
          <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl space-y-1.5 border border-slate-100 dark:border-slate-700">
            <div className="flex items-center gap-1.5 font-semibold text-sky-600 dark:text-sky-400">
              <Share className="w-3.5 h-3.5" />
              <span>To install on iPhone/iPad:</span>
            </div>
            <p>1. Tap the <strong>Share</strong> button in Safari toolbar.</p>
            <p className="flex items-center gap-1">
              2. Scroll down and select <strong>Add to Home Screen</strong> <PlusSquare className="w-3.5 h-3.5 inline" />.
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 active:scale-95 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install App</span>
            </button>
            <button
              onClick={handleDismiss}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
            >
              Not now
            </button>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
