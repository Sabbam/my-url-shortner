
'use client';

import { BarChart3, Globe2, ShieldCheck, Zap, Scissors, Smartphone, Cpu, Network, Lock } from 'lucide-react';
import styles from './features.module.css';
import { motion } from 'framer-motion';

const containerVars = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVars = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
} as const;

export default function Features() {
    const features = [
        {
            id: 'shorten',
            icon: <Scissors size={32} />,
            title: "Smart Shortening",
            desc: "Turn long, complex URLs into memorable, branded links in seconds with our optimized algorithm.",
            size: "normal",
            color: "#00f2ff"
        },
        {
            id: 'analytics',
            icon: <BarChart3 size={32} />,
            title: "Real-time Analytics",
            desc: "Track every click live. Get deep insights into device types, browser info, and geographic locations with our visualizations.",
            size: "large", // Spans 2 cols
            color: "#ff00aa"
        },
        {
            id: 'domains',
            icon: <Globe2 size={32} />,
            title: "Custom Domains",
            desc: "Use your own brand name (e.g., link.yourbrand.com) to build elite trust.",
            size: "normal",
            color: "#22c55e"
        },
        {
            id: 'speed',
            icon: <Zap size={32} />,
            title: "Hyper-Speed Redirection",
            desc: "Our globally distributed edge network ensures your links load instantly with zero trackable latency, anywhere in the world.",
            size: "large", // Spans 2 cols
            color: "#eab308"
        },
        {
            id: 'security',
            icon: <ShieldCheck size={32} />,
            title: "Quantum Security",
            desc: "Every link is scanned for malware, phishing, and bad actors to protect your audience automatically.",
            size: "normal",
            color: "#00f2ff"
        },
        {
            id: 'mobile',
            icon: <Smartphone size={32} />,
            title: "Perfectly Responsive",
            desc: "Manage your links from any device with a dashboard that adapts perfectly to your workflow.",
            size: "normal",
            color: "#a855f7"
        },
        {
            id: 'api',
            icon: <Network size={32} />,
            title: "Powerful API",
            desc: "Integrate shortening into your own apps with our robust REST API.",
            size: "normal",
            color: "#f97316"
        },
        {
            id: 'uptime',
            icon: <Cpu size={32} />,
            title: "99.99% Uptime",
            desc: "Redundant infrastructure ensures your links never go down.",
            size: "normal",
            color: "#ec4899"
        }
    ];

    return (
        <div className={styles.wrapper}>
            {/* Dynamic Background Elements */}
            <div className={styles.orb1} />
            <div className={styles.orb2} />

            <main className={styles.container}>
                <header className={styles.header}>
                    <motion.h1
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Elite <span className={styles.gradientText}>Features</span>
                    </motion.h1>
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        Share better, track smarter.
                    </motion.p>
                </header>

                <motion.div
                    className={styles.grid}
                    variants={containerVars}
                    initial="hidden"
                    animate="show"
                >
                    {features.map((f) => (
                        <motion.div
                            key={f.id}
                            className={`${styles.card} ${f.size === 'large' ? styles.cardLarge : ''}`}
                            variants={itemVars}
                            whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        >
                            <div className={styles.cardGlow} style={{ background: f.color }} />
                            <div className={styles.scanline} />

                            <div className={styles.iconWrapper} style={{ color: f.color, borderColor: f.color }}>
                                {f.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{f.title}</h3>
                            <p className={styles.cardDesc}>{f.desc}</p>

                            {/* Decorative Tech Elements */}
                            <div className={styles.cornerTR} />
                            <div className={styles.cornerBL} />
                        </motion.div>
                    ))}
                </motion.div>
            </main>
        </div>
    );
}
