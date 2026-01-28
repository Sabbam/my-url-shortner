'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, Check, Zap, Sparkles, ArrowRight, Share2, Globe, BarChart2, Settings2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './home-quantum.module.css';
import toast from 'react-hot-toast';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [showAlias, setShowAlias] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setShortUrl('');

    try {
      const payload: any = { url: url };
      if (user?.id) payload.userId = user.id;
      if (customAlias && customAlias.trim()) {
        payload.customAlias = customAlias.trim();
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        // Specific user-friendly error handling
        if (errorText.includes("already exists")) {
          throw new Error("Alias already taken. Try another one.");
        }
        throw new Error(errorText || 'Failed to shorten URL');
      }

      const data = await res.json();
      const host = typeof window !== 'undefined' ? window.location.host : 's.myfervera.in';
      const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
      setShortUrl(`${protocol}//${host}/${data.shortCode}`);

      // Reset inputs on success
      setUrl('');
      setCustomAlias('');
      setShowAlias(false);
      toast.success("Link supercharged!");

    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied to clipboard');
    }
  };

  if (!mounted) return null;

  return (
    <div className={styles.wrapper}>
      {/* Background provided by Global Layout */}

      <main className={styles.container}>

        {/* Typographic Hero */}
        <section className={styles.heroContent}>


          <motion.h1
            className={styles.titleMain}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            Shorten. <br />
            <span className={styles.titleAccent}>Supercharge.</span>
          </motion.h1>

          <p className={styles.subtitle}>
            The next evolution of link management. Instant redirection, quantum-safe security, and beautiful analytics.
          </p>
        </section>

        {/* The 'Command Bar' Input */}
        <div className={styles.commandBarWrapper}>
          <motion.div
            className={styles.glowContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className={styles.inputCard}>
              <div className={styles.inputRow}>
                <Link2 size={24} className={styles.inputIcon} />
                <input
                  autoFocus
                  type="url"
                  placeholder="Paste a long URL to shorten..."
                  className={styles.mainInput}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />

                {/* Settings Toggle for Alias */}
                <button
                  type="button"
                  className={`${styles.optionsButton} ${showAlias ? styles.optionsButtonActive : ''}`}
                  onClick={() => setShowAlias(!showAlias)}
                  title="Custom Alias Settings"
                >
                  <Settings2 size={20} />
                </button>

                <button
                  type="submit"
                  className={styles.actionButton}
                  disabled={loading}
                >
                  {loading ? <Sparkles size={20} className="animate-spin" /> : <ArrowRight size={24} />}
                </button>
              </div>

              {/* Collapsible Alias Drawer */}
              <AnimatePresence>
                {showAlias && (
                  <motion.div
                    className={styles.aliasDrawer}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  >
                    <div className={styles.aliasRow}>
                      <span className={styles.aliasPrefix}>
                        <Zap size={14} color="#00f2ff" />
                        /
                      </span>
                      <input
                        type="text"
                        placeholder="custom-alias-name"
                        className={styles.aliasInput}
                        value={customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                        pattern="[a-zA-Z0-9-_]+"
                        title="Alphanumeric characters, hyphens and underscores only"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>

        {/* Result Ticket - Morphing Entrance */}
        <AnimatePresence>
          {shortUrl && (
            <motion.div
              className={styles.ticketWrapper}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <div className={styles.ticket}>
                <div className={styles.ticketHeader}>
                  <div className={styles.ticketStatus}>
                    <div className={styles.pulseDot} />
                    Active & Secure
                  </div>
                  <Share2 size={18} color="rgba(255,255,255,0.4)" />
                </div>

                <div className={styles.ticketBody}>
                  <a href={shortUrl} target="_blank" className={styles.shortLink}>
                    {shortUrl.replace(/^https?:\/\//, '')}
                  </a>

                  <div className={styles.ticketActions}>
                    <button onClick={copyToClipboard} className={styles.secondaryBtn}>
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button className={styles.secondaryBtn}>
                      <BarChart2 size={18} />
                      Analytics
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Stats Strip */}
        <div className={styles.statsStrip}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>2.4M+</span>
            <span className={styles.statLabel}>Links Secured</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>0.02s</span>
            <span className={styles.statLabel}>Avg Latency</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>99.9%</span>
            <span className={styles.statLabel}>Uptime</span>
          </div>
        </div>

      </main>
    </div>
  );
}
