'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import styles from './pricing-refined.module.css';

export default function Pricing() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.glow} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.badge}>Pricing Plans</div>
                    <h1 className={styles.title}>Simple, transparent <br /><span className="text-gradient">pricing.</span></h1>
                    <p className={styles.subtitle}>
                        Scalable URL management for creators, startups, and enterprises. No hidden fees.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Free Tier */}
                    <section className={styles.card}>
                        <div className={styles.planName}>Free Starter</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>0</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="50 links per month" />
                            <FeatureItem text="Basic analytics" />
                            <FeatureItem text="QR codes included" />
                            <FeatureItem text="Community support" />
                        </ul>
                        <Link href="/register" className={`${styles.btn} ${styles.btnGray}`}>
                            Get Started
                        </Link>
                    </section>

                    {/* Pro Tier (Featured) */}
                    <section className={`${styles.card} ${styles.cardHighlight}`}>
                        <div className={styles.popularBadge}>Recommended</div>
                        <div className={styles.planName}>Professional Pro</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>299</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="Unlimited links" />
                            <FeatureItem text="Real-time analytics" />
                            <FeatureItem text="Custom aliases" />
                            <FeatureItem text="Priority support" />
                            <FeatureItem text="Early access features" />
                        </ul>
                        <Link href="/register" className={`${styles.btn} ${styles.btnLight}`}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                Start Free Trial <ArrowRight size={18} />
                            </span>
                        </Link>
                    </section>

                    {/* Business Tier */}
                    <section className={styles.card}>
                        <div className={styles.planName}>Enterprise</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.price} style={{ fontSize: '2.5rem' }}>Custom</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="Custom domains" />
                            <FeatureItem text="Team management" />
                            <FeatureItem text="Dedicated support" />
                            <FeatureItem text="API White-labeling" />
                            <FeatureItem text="SLA matching" />
                        </ul>
                        <Link href="/contact" className={`${styles.btn} ${styles.btnGray}`}>
                            Contact Sales
                        </Link>
                    </section>
                </div>
            </div>
        </main>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <li className={styles.feature}>
            <Check className={styles.icon} size={20} strokeWidth={2.5} />
            <span>{text}</span>
        </li>
    );
}
