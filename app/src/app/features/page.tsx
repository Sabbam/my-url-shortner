'use client';

import { BarChart3, Globe2, ShieldCheck, Zap, Scissors, Smartphone } from 'lucide-react';
import styles from './features.module.css';

export default function Features() {
    const features = [
        {
            icon: <Scissors size={28} />,
            title: "Smart Shortening",
            desc: "Turn long, complex URLs into memorable, branded links in seconds with our optimized algorithm."
        },
        {
            icon: <BarChart3 size={28} />,
            title: "Real-time Analytics",
            desc: "Track every click live. Get deep insights into device types, browser info, and geographic locations."
        },
        {
            icon: <Globe2 size={28} />,
            title: "Custom Managed Domains",
            desc: "Use your own brand name (e.g., link.yourbrand.com) to build elite trust and brand recognition."
        },
        {
            icon: <Zap size={28} />,
            title: "Speed-First Redirection",
            desc: "Our globally distributed network ensures your links load instantly with zero trackable latency."
        },
        {
            icon: <ShieldCheck size={28} />,
            title: "Advanced Link Security",
            desc: "Every link is scanned for malware, phishing, and bad actors to protect your audience automatically."
        },
        {
            icon: <Smartphone size={28} />,
            title: "Perfectly Responsive",
            desc: "Manage your links from any device with a dashboard that adapts perfectly to your workflow."
        }
    ];

    return (
        <div className={styles.wrapper}>
            <div className={styles.glow} />

            <main className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        Engineered for the <br /> <span className="text-gradient">modern web.</span>
                    </h1>
                    <p className={styles.subtitle}>
                        A comprehensive suite of elite tools designed to help you share better and track smarter with zero friction.
                    </p>
                </header>

                <div className={styles.grid}>
                    {features.map((f, idx) => (
                        <div key={idx} className={styles.card}>
                            <div className={styles.iconWrapper}>
                                {f.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{f.title}</h3>
                            <p className={styles.cardDesc}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
