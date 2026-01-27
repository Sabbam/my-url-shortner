'use client';

import { PieChart, LineChart, TrendingUp, Users, MousePointer2 } from 'lucide-react';
import styles from './analytics.module.css';

export default function Analytics() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.glow} />

            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        Data that drives <br /><span className="text-gradient">smarter decisions.</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Get granular, real-time insights into who is clicking your links and where they're coming from across the globe.
                    </p>
                </header>

                <div className={styles.previewCard}>
                    <div className={styles.statGrid}>
                        <StatCard icon={<TrendingUp size={20} />} label="Total Clicks" value="124,592" growth="+12.5%" />
                        <StatCard icon={<MousePointer2 size={20} />} label="Average CTR" value="4.82%" growth="+2.1%" />
                        <StatCard icon={<Users size={20} />} label="Unique Visitors" value="89,203" growth="+8.4%" />
                    </div>

                    <div className={styles.chartPlaceholder}>
                        <div style={{ textAlign: 'center' }}>
                            <LineChart size={64} style={{ marginBottom: '1.5rem', opacity: 0.3, color: 'var(--primary-light)' }} />
                            <h3 style={{ fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>Live Performance Graph</h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>Detailed time-series analysis is unlocked in your private dashboard.</p>
                        </div>
                    </div>
                </div>

                <section className={styles.featureSection}>
                    <div>
                        <div className={styles.badge} style={{ marginBottom: '1rem' }}>Hardware Intelligence</div>
                        <h2 className={styles.featureTitle}>Deep Device Tracking</h2>
                        <p className={styles.featureDesc}>
                            Identify if your audience is primarily on high-end mobile devices or professional workstations. Optimize your content strategy based on real user hardware telemetry.
                        </p>
                        <div className={styles.badge}>99.9% Tracking Accuracy</div>
                    </div>

                    <div className={styles.visualCard}>
                        <div style={{ position: 'relative' }}>
                            <PieChart size={160} color="var(--primary-light)" style={{ opacity: 0.8 }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>68%</div>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Mobile</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}

function StatCard({ icon, label, value, growth }: { icon: any, label: string, value: string, growth: string }) {
    return (
        <div className={styles.statCard}>
            <div className={styles.statHeader}>
                <div className={styles.statIcon}>{icon}</div>
                <div className={styles.growth}>{growth}</div>
            </div>
            <div className={styles.statLabel}>{label}</div>
            <div className={styles.statValue}>{value}</div>
        </div>
    );
}
