'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, Check, Zap, BarChart3, QrCode, Lock, ArrowRight, ShieldCheck, Globe } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import Navbar from '@/components/Navbar'; // Navbar handles auth state visually
import styles from './home-premium.module.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  // Stats animation
  const [stats, setStats] = useState({ links: 0, clicks: 0 });
  useEffect(() => {
    // Simulate growing stats for social proof
    const interval = setInterval(() => {
      setStats(prev => ({
        links: prev.links + Math.floor(Math.random() * 5),
        clicks: prev.clicks + Math.floor(Math.random() * 50)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setError('');
    setShortUrl('');

    try {
      const body: any = { url, customAlias: customAlias || undefined };
      if (user?.id) body.userId = user.id;

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/shorten`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setShortUrl(`${window.location.protocol}//${window.location.host}/${data.code}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={styles.wrapper}>
      {/* Background Ambience */}
      <div className={styles.auroraBackground}>
        <div className={styles.aurora1}></div>
        <div className={styles.aurora2}></div>
      </div>

      <main className={styles.mainContent}>

        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.heroTextContainer}
          >
            <div className={styles.badge}>
              <span className={styles.badgeDot}></span>
              New: Smart Analytics 2.0
            </div>
            <h1 className={styles.headline}>
              Make every connection <span className={styles.gradientText}>count.</span>
            </h1>
            <p className={styles.subheadline}>
              The URL shortener built for brands that care. Transform long links into powerful marketing assets with one click.
            </p>
          </motion.div>

          {/* Glassmorphism Input Card */}
          <motion.div
            className={styles.glassCard}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className={styles.formContainer}>
              {/* Main Input Row */}
              <div className={styles.form}>
                <div className={styles.inputGroup}>
                  <div className={styles.urlInputWrapper}>
                    <Link2 className={styles.inputIcon} size={20} />
                    <input
                      type="url"
                      placeholder="Paste your long link here..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className={styles.mainInput}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? <div className={styles.spinner} /> : <>Shorten URL <ArrowRight size={18} /></>}
                </button>
              </div>

              {/* Collapsible Alias Row */}
              <div style={{ padding: '0 0.5rem' }}>
                <button type="button" className={styles.aliasToggle} onClick={() => setCustomAlias(prev => prev ? '' : 'alias')}>
                  {customAlias ? <Check size={14} color="#2563eb" /> : '+'} {customAlias ? 'Custom Alias Active' : 'Add custom alias (optional)'}
                </button>

                <AnimatePresence>
                  {customAlias !== '' && (
                    <motion.div
                      className={styles.aliasContainer}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <input
                        type="text"
                        placeholder="e.g. summer-sale-2026"
                        className={styles.aliasInputBox}
                        value={customAlias === 'alias' ? '' : customAlias}
                        onChange={(e) => setCustomAlias(e.target.value)}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className={styles.errorMessage}>
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* Result Modal / Expansion */}
          <AnimatePresence>
            {shortUrl && (
              <motion.div
                className={styles.resultContainer}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={styles.resultLeft}>
                  <div className={styles.successLabel}>Successfully Shortened</div>
                  <div className={styles.linkDisplay}>
                    <a href={shortUrl} target="_blank" className={styles.shortLink}>{shortUrl}</a>
                    <button onClick={copyToClipboard} className={styles.copyBtn}>
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  {!user && (
                    <div className={styles.upsellNote}>
                      <Lock size={12} />
                      <span>Want to edit this link later? <Link href="/register">Create free account</Link></span>
                    </div>
                  )}
                </div>
                <div className={styles.resultRight}>
                  <div className={styles.qrBg}>
                    <QRCodeSVG value={shortUrl} size={80} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Features Bento Grid */}
        <section className={styles.bentoSection}>
          <div className={styles.sectionHeader}>
            <h2>Powerful features for <br />modern marketing teams.</h2>
          </div>
          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoCard} ${styles.colSpan2}`}>
              <div className={styles.iconBox}><BarChart3 size={24} /></div>
              <h3>Real-time Analytics</h3>
              <p>Track clicks, referrers, and device data instantly. Know your audience.</p>
              <div className={styles.graphPlaceholder}></div>
            </div>
            <div className={styles.bentoCard}>
              <div className={styles.iconBox}><QrCode size={24} /></div>
              <h3>Smart QR Codes</h3>
              <p>Generate branded QR codes that actually get scanned.</p>
            </div>
            <div className={styles.bentoCard}>
              <div className={styles.iconBox}><ShieldCheck size={24} /></div>
              <h3>Bank-grade Security</h3>
              <p>Every link is encrypted and protected against malware.</p>
            </div>
            <div className={`${styles.bentoCard} ${styles.colSpan2}`}>
              <div className={styles.iconBox}><Globe size={24} /></div>
              <h3>Custom Domains</h3>
              <p>Use your own brand name (link.yourbrand.com) for maximum trust.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
