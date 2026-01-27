'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import styles from '../pricing-refined.module.css';

export default function Pricing() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.glow} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.badge}>Pricing Plans</div>
                    <h1 className={styles.title}>Scale your brand <br /><span className="text-gradient">affordably.</span></h1>
                    <p className={styles.subtitle}>
                        Choose the plan that fits your growth. From hobbyist to enterprise-grade management.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Free Tier */}
                    <section className={styles.card}>
                        <div className={styles.planName}>Basic Free</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>0</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="50 Shortened URLs" />
                            <FeatureItem text="Basic Dashboard" />
                            <FeatureItem text="Contains Ads" />
                            <FeatureItem text="Community Support" />
                        </ul>
                        <Link href="/register" className={`${styles.btn} ${styles.btnGray}`}>
                            Get Started
                        </Link>
                    </section>

                    {/* Pro Tier (Featured) */}
                    <section className={`${styles.card} ${styles.cardHighlight}`}>
                        <div className={styles.popularBadge}>Best Value</div>
                        <div className={styles.planName}>Premium Plus</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>100</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="100 Shortened URLs" />
                            <FeatureItem text="Advanced Analytics" />
                            <FeatureItem text="Extra Dashboard Props" />
                            <FeatureItem text="Ad-Free Experience" />
                        </ul>
                        <Link href="/register" className={`${styles.btn} ${styles.btnLight}`}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                Start Free Trial <ArrowRight size={18} />
                            </span>
                        </Link>
                    </section>

                    {/* Business Tier */}
                    <section className={styles.card}>
                        <div className={styles.planName}>Elite Brand</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>400</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="100 Shortened URLs" />
                            <FeatureItem text="Custom Domain Support" />
                            <FeatureItem text="Priority 24/7 Support" />
                            <FeatureItem text="Full API Access" />
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
