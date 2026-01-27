'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Link2, Copy, Check, Zap, BarChart3, QrCode, Lock, ArrowRight, ShieldCheck, Globe, Star } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import styles from './home-ultimate.module.css';

export default function Home() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

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

      // Check if domain is custom or fallback to current host
      const host = typeof window !== 'undefined' ? window.location.host : 's.myfervera.in';
      const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
      setShortUrl(`${protocol}//${host}/${data.code}`);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Visual background layers */}
      <div className={styles.subtleGrid} />
      <div className={styles.glow} />

      <main className={styles.container}>

        {/* Hero Section */}
        <section className={styles.hero}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.badge}
          >
            <Star size={14} fill="currentColor" />
            <span>Trusted by 10k+ professional creators & teams</span>
          </motion.div>

          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Create links that <span className="text-gradient">convert.</span>
          </motion.h1>

          <motion.p
            className={styles.subheadline}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Stop using long, cluttered URLs. My URL Shortner transforms your brand's presence with fast, professional, and trackable links in seconds.
          </motion.p>

          {/* Main Interaction Card */}
          <motion.div
            className={styles.inputCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className={styles.inputForm}>
              <div className={styles.inputWrapper}>
                <Link2 className={styles.inputIcon} size={20} />
                <input
                  type="url"
                  placeholder="Insert your long URL here..."
                  className={styles.inputField}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>

              <div className={styles.inputWrapper}>
                <Zap className={styles.inputIcon} size={18} />
                <input
                  type="text"
                  placeholder="Custom alias (optional)"
                  className={styles.inputField}
                  value={customAlias}
                  onChange={(e) => setCustomAlias(e.target.value)}
                />
              </div>

              <button className={styles.submitButton} disabled={loading} type="submit">
                {loading ? <div className={styles.spinner} /> : <>Shorten <ArrowRight size={18} /></>}
              </button>
            </form>
          </motion.div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{ color: '#ff4444', marginTop: '1rem', fontSize: '0.9rem', fontWeight: 600 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Success Result */}
          <AnimatePresence>
            {shortUrl && (
              <motion.div
                className={styles.resultSection}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className={styles.resultCard}>
                  <div className={styles.resultInfo}>
                    <span className={styles.resultTitle}>Your link is ready!</span>
                    <div className={styles.resultLinkWrapper}>
                      <a href={shortUrl} target="_blank" className={styles.shortenedLink}>{shortUrl}</a>
                      <button onClick={copyToClipboard} className={styles.actionBtn}>
                        {copied ? <Check size={20} color="#22c55e" /> : <Copy size={20} />}
                      </button>
                    </div>
                    {!user && (
                      <div className={styles.upsellNote}>
                        <Lock size={12} />
                        <span>Sign up to track performance and edit this link. <Link href="/register">Register now</Link></span>
                      </div>
                    )}
                  </div>
                  <div className={styles.qrContainer}>
                    <QRCodeSVG value={shortUrl} size={100} fgColor="#05070a" />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Features Bento */}
        <section className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><BarChart3 size={28} /></div>
            <h3 className={styles.featureTitle}>Advanced Analytics</h3>
            <p className={styles.featureDesc}>Get deep insights into who is clicking your links, from where, and on what device.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><Globe size={28} /></div>
            <h3 className={styles.featureTitle}>Global Edge</h3>
            <p className={styles.featureDesc}>Ultra-fast redirection powered by an global edge network. No latency, just speed.</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}><ShieldCheck size={28} /></div>
            <h3 className={styles.featureTitle}>Secure & Private</h3>
            <p className={styles.featureDesc}>Every link is scanned for malware and protected by bank-grade encryption.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
