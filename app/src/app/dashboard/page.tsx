'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Copy, ExternalLink, Link2, Calendar, TrendingUp, Sparkles, Plus, Check, Search, Download } from 'lucide-react';
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
    const [searchQuery, setSearchQuery] = useState('');
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
                    // Sort by newest first
                    const sorted = data.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                    setLinks(sorted);
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
                a.download = `quantum-qr-${shortCode}.png`;
                a.href = canvas.toDataURL('image/png');
                a.click();
            }
        };
    };

    // Filter links based on search
    const filteredLinks = links.filter(link =>
        link.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.originalUrl.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main style={{ minHeight: '100vh', paddingTop: '8rem', paddingBottom: '4rem' }}>
            <div className={styles.container}>

                {/* Command Deck HUD */}
                <section className={styles.commandDeck}>
                    <div className={styles.deckSection}>
                        <h1 className={styles.welcomeTitle}>Command Center</h1>
                        <p className={styles.welcomeSubtitle}>
                            Logged in as <span style={{ color: '#fff', fontWeight: 600 }}>{user?.email}</span>
                        </p>
                        <div className={styles.planBadge}>
                            <Sparkles size={14} />
                            QUANTUM TIER
                        </div>
                    </div>

                    <div className={styles.deckSection}>
                        <div className={styles.usageMeter}>
                            <div className={styles.meterHeader}>
                                <span>Link Slots</span>
                                <span>{links.length} / 50</span>
                            </div>
                            <div className={styles.meterTrack}>
                                <div
                                    className={styles.meterFill}
                                    style={{ width: `${Math.min((links.length / 50) * 100, 100)}%` }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.deckSection} style={{ textAlign: 'right' }}>
                        <h3 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1, color: '#fff' }}>{links.length}</h3>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Active Links</p>
                    </div>
                </section>

                {/* Controls Bar */}
                <div className={styles.controlsBar}>
                    <div className={styles.searchWrapper}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search by alias or target URL..."
                            className={styles.searchInput}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Link href="/" className={styles.createBtn}>
                        <Plus size={18} /> Create New Link
                    </Link>
                </div>

                {/* Results Grid */}
                {loading ? (
                    <div className={styles.loading}>
                        <Sparkles className="animate-spin" size={32} />
                    </div>
                ) : filteredLinks.length > 0 ? (
                    <motion.div
                        className={styles.grid}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {filteredLinks.map((link) => {
                            const host = typeof window !== 'undefined' ? window.location.host : 's.myfervera.in';
                            const protocol = typeof window !== 'undefined' ? window.location.protocol : 'https:';
                            const fullUrl = `${protocol}//${host}/${link.shortCode}`;

                            return (
                                <motion.div
                                    key={link.id}
                                    className={styles.card}
                                    layoutId={`card-${link.id}`}
                                >
                                    <div className={styles.cardHeader}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }} />
                                            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#22c55e' }}>ACTIVE</span>
                                        </div>
                                        <span className={styles.date}>
                                            {new Date(link.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <div className={styles.cardBody}>
                                        <div className={styles.linkInfo}>
                                            <a href={fullUrl} target="_blank" className={styles.shortLink}>
                                                /{link.shortCode}
                                            </a>
                                            <div className={styles.originalLink} title={link.originalUrl}>
                                                {link.originalUrl}
                                            </div>
                                        </div>

                                        <div className={styles.qrZone}>
                                            <div className={styles.qrBg}>
                                                <QRCodeSVG
                                                    id={`qr-${link.shortCode}`}
                                                    value={fullUrl}
                                                    size={40}
                                                    level="L"
                                                />
                                            </div>
                                            <button
                                                onClick={() => downloadQr(`qr-${link.shortCode}`, link.shortCode)}
                                                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                                            >
                                                <Download size={14} /> Download QR
                                            </button>
                                        </div>
                                    </div>

                                    <div className={styles.cardActions}>
                                        <button
                                            onClick={() => copyToClipboard(link.shortCode, link.id)}
                                            className={styles.actionBtn}
                                        >
                                            {copiedId === link.id ? <Check size={18} color="#22c55e" /> : <Copy size={18} />}
                                            {copiedId === link.id ? 'Copied' : 'Copy'}
                                        </button>
                                        <a href={fullUrl} target="_blank" className={styles.actionBtn}>
                                            <ExternalLink size={18} /> Visit
                                        </a>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                ) : (
                    <div className={styles.emptyState}>
                        <TrendingUp size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                        <h3>No links found</h3>
                        <p>{searchQuery ? "Try adjusting your search terms" : "Start your journey by creating your first link"}</p>
                        {!searchQuery && (
                            <Link href="/" style={{ marginTop: '1rem', color: '#00f2ff', fontWeight: 700 }}>
                                Create Link &rarr;
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
