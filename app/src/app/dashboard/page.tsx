'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Copy, ExternalLink, Link2, Calendar } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import styles from '../dashboard.module.css'; // New styles for dashboard
import Link from 'next/link';

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
                a.download = `${shortCode}-qr.png`;
                a.href = canvas.toDataURL('image/png');
                a.click();
            }
        };
    };

    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.headerContent}>
                        <div>
                            <h1 className={styles.title}>Dashboard</h1>
                            <p className={styles.subtitle}>Welcome back, {user?.email}</p>
                        </div>
                        <div className={styles.planCard}>
                            <div className={styles.planLabel}>Current Plan</div>
                            <div className={styles.planName}>
                                Starter (Free) <span className={styles.activeBadge}>Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Usage & Upsell Banner - CSS Modules Refactor */}
                    <div className={styles.statsRow}>
                        <div className={styles.usageCard}>
                            <div className={styles.usageHeader}>
                                <span className={styles.usageLabel}>Link Usage</span>
                                <span className={styles.usageValue}>{links.length} / 50</span>
                            </div>
                            <div className={styles.progressBarTrack}>
                                <div className={styles.progressBarFill} style={{ width: `${Math.min((links.length / 50) * 100, 100)}%` }}></div>
                            </div>
                            <p className={styles.usageNote}>{50 - links.length} links remaining this month.</p>
                        </div>

                        <div className={styles.upgradeBanner}>
                            <div>
                                <h3 className={styles.upgradeTitle}>Upgrade to Pro</h3>
                                <p className={styles.upgradeText}>Get unlimited links, custom aliases, and detailed analytics for just ₹100/mo.</p>
                            </div>
                            <Link href="/pricing" className={styles.upgradeButton}>Upgrade</Link>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className={styles.loading}>Loading your links...</div>
                ) : links.length > 0 ? (
                    <div className={styles.grid}>
                        {links.map((link) => (
                            <div key={link.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.meta}>
                                        <Calendar size={14} />
                                        {new Date(link.createdAt).toLocaleDateString()}
                                    </div>
                                    <div className={styles.analytics}>0 Clicks</div>
                                </div>

                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <a href={`http://localhost:3000/${link.shortCode}`} target="_blank" className={styles.shortLink}>
                                            /{link.shortCode}
                                        </a>

                                        <div className={styles.originalUrl} title={link.originalUrl}>
                                            {link.originalUrl}
                                        </div>
                                    </div>

                                    <div style={{ background: 'white', padding: '0.5rem', borderRadius: '0.5rem', border: '1px solid #e2e8f0', flexShrink: 0, textAlign: 'center' }}>
                                        <QRCodeSVG
                                            id={`qr-${link.shortCode}`}
                                            value={`http://localhost:3000/${link.shortCode}`}
                                            size={64}
                                            level="L"
                                            includeMargin={false}
                                        />
                                        <button
                                            onClick={() => downloadQr(`qr-${link.shortCode}`, link.shortCode)}
                                            style={{ display: 'block', margin: '0.25rem auto 0', border: 'none', background: 'none', color: '#2563eb', fontSize: '0.7rem', fontWeight: 600, cursor: 'pointer' }}
                                        >
                                            Download
                                        </button>
                                    </div>
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(`http://localhost:3000/${link.shortCode}`)}
                                        className={styles.actionButton}
                                        title="Copy"
                                    >
                                        <Copy size={16} /> Copy
                                    </button>
                                    <a href={`http://localhost:3000/${link.shortCode}`} target="_blank" className={styles.actionButton}>
                                        <ExternalLink size={16} /> Visit
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <Link2 size={48} className={styles.emptyIcon} />
                        <h3>No links yet</h3>
                        <p>Create your first shortened link to track analytics.</p>
                        <Link href="/" className={styles.createButton}>Create New Link</Link>
                    </div>
                )}
            </div>
        </main>
    );
}
