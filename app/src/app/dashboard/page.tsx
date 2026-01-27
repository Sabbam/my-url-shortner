'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Copy, ExternalLink, Link2, Calendar, TrendingUp, Sparkles, Plus, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import styles from '../dashboard.module.css';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface LinkData {
    id: number;
    originalUrl: string;
    shortCode: string;
    createdAt: string;
}

export default function Dashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const [links, setLinks] = useState<LinkData[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        const fetchLinks = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/links?userId=${user.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setLinks(data);
                }
            } catch (err) {
                console.error("Failed to fetch links", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLinks();
    }, [user, router]);

    const copyToClipboard = (shortCode: string, id: number) => {
        const host = typeof window !== 'undefined' ? window.location.host : 's.myfervera.in';
        const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
        const fullUrl = `${protocol}//${host}/${shortCode}`;

        navigator.clipboard.writeText(fullUrl);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const downloadQr = (id: string, shortCode: string) => {
        const svg = document.getElementById(id);
        if (!svg) return;
        const xml = new XMLSerializer().serializeToString(svg);
        const image = new Image();
        image.src = 'data:image/svg+xml;base64,' + btoa(xml);
        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.fillStyle = 'white';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
                const a = document.createElement('a');
                a.download = `slink-${shortCode}-qr.png`;
                a.href = canvas.toDataURL('image/png');
                a.click();
            }
        };
    };

    return (
        <main style={{ minHeight: '100vh', paddingTop: '6rem' }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div>
                            <h1 className={styles.title}>Dashboard</h1>
                            <p className={styles.subtitle}>Welcome back, <span style={{ color: '#fff', fontWeight: 600 }}>{user?.email}</span></p>
                        </div>
                        <div className={styles.planCard}>
                            <div className={styles.planLabel}>Account Tier</div>
                            <div className={styles.planName}>
                                <Sparkles size={16} color="#64748b" fill="#64748b" />
                                Basic Free <span className={styles.activeBadge} style={{ background: 'rgba(100, 116, 139, 0.1)', color: '#64748b', borderColor: 'rgba(100, 116, 139, 0.2)' }}>Standard</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.statsRow}>
                        <div className={styles.usageCard}>
                            <div className={styles.usageHeader}>
                                <span className={styles.usageLabel}>Free Link Quota</span>
                                <span className={styles.usageValue}>{links.length} / 50</span>
                            </div>
                            <div className={styles.progressBarTrack}>
                                <div className={styles.progressBarFill} style={{ width: `${Math.min((links.length / 50) * 100, 100)}%` }}></div>
                            </div>
                            <p className={styles.usageNote}>{Math.max(50 - links.length, 0)} free slots remaining.</p>
                        </div>

                        <div className={styles.upgradeBanner} style={{ background: 'rgba(255, 255, 255, 0.02)', borderStyle: 'dashed' }}>
                            <div style={{ opacity: 0.6 }}>
                                <h3 className={styles.upgradeTitle} style={{ fontSize: '0.9rem', color: '#64748b' }}>SPONSORED AD</h3>
                                <p className={styles.upgradeText}>Upgrade to <b>Premium Plus (₹100)</b> to remove ads and get 100 URLs.</p>
                            </div>
                            <Link href="/pricing" className={styles.upgradeButton} style={{ background: 'var(--primary)', color: '#fff' }}>Go Pro</Link>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Your Optimized Links</h2>
                    <Link href="/" className={styles.createButton} style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Plus size={18} /> New Link
                    </Link>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '4rem 0', color: '#94a3b8' }}>
                        <div className="spinner" style={{ margin: '0 auto 1rem' }}></div>
                        Synchronizing with edge network...
                    </div>
                ) : links.length > 0 ? (
                    <motion.div
                        className={styles.grid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {links.map((link) => {
                            const host = typeof window !== 'undefined' ? window.location.host : 's.myfervera.in';
                            const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
                            const fullUrl = `${protocol}//${host}/${link.shortCode}`;

                            return (
                                <div key={link.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.meta}>
                                            <Calendar size={14} />
                                            {new Date(link.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className={styles.analytics}>
                                            <TrendingUp size={12} style={{ marginRight: '4px' }} />
                                            Live Tracked
                                        </div>
                                    </div>

                                    <div>
                                        <a href={fullUrl} target="_blank" className={styles.shortLink}>
                                            /{link.shortCode}
                                        </a>
                                        <div className={styles.originalUrl} title={link.originalUrl}>
                                            {link.originalUrl}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '1rem', border: '1px solid var(--surface-border)' }}>
                                        <div style={{ background: '#fff', padding: '4px', borderRadius: '6px', flexShrink: 0 }}>
                                            <QRCodeSVG
                                                id={`qr-${link.shortCode}`}
                                                value={fullUrl}
                                                size={56}
                                                level="L"
                                            />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <button
                                                onClick={() => downloadQr(`qr-${link.shortCode}`, link.shortCode)}
                                                style={{ border: 'none', background: 'none', color: 'var(--primary-light)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                <Sparkles size={12} /> Get HQ QR Code
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.actions}>
                                        <button
                                            onClick={() => copyToClipboard(link.shortCode, link.id)}
                                            className={styles.actionButton}
                                        >
                                            {copiedId === link.id ? <><Check size={16} color="#22c55e" /> Copied</> : <><Copy size={16} /> Copy</>}
                                        </button>
                                        <a href={fullUrl} target="_blank" className={styles.actionButton}>
                                            <ExternalLink size={16} /> Open
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <div className={styles.emptyState}>
                        <div style={{ width: '4rem', height: '4rem', background: 'rgba(255,255,255,0.03)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                            <Link2 size={32} className={styles.emptyIcon} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>No links generated yet</h3>
                        <p style={{ color: '#94a3b8', maxWidth: '300px' }}>Your high-performance links will appear here once you create them.</p>
                        <Link href="/" className={styles.createButton}>Create My First Link</Link>
                    </div>
                )}
            </div>
        </main>
    );
}
