'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import styles from '../pricing.module.css';

export default function Pricing() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.auroraBackground}>
                <div className={styles.aurora1} />
                <div className={styles.aurora2} />
            </div>

            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.badge}>Pricing Plans</div>
                    <h1 className={styles.title}>Scalable plans for <br />every ecosystem.</h1>
                    <p className={styles.subtitle}>
                        Simple, honest pricing. All paid plans include a 14-day premium trial.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* Free Tier */}
                    <section className={styles.card}>
                        <div className={styles.planName}>Free Tier</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>0</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="50 links per month" />
                            <FeatureItem text="Standard analytics" />
                            <FeatureItem text="QR codes included" />
                            <FeatureItem text="Email support" />
                        </ul>
                        <Link href="/register" className={`${styles.btn} ${styles.btnGray}`}>
                            Get Started
                        </Link>
                    </section>

                    {/* Pro Tier (Featured) */}
                    <section className={`${styles.card} ${styles.cardHighlight}`}>
                        <div className={styles.popularBadge}>Most Popular</div>
                        <div className={styles.planName}>Pro Professional</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>249</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="Unlimited links" />
                            <FeatureItem text="Real-time analytics" />
                            <FeatureItem text="Custom URL aliases" />
                            <FeatureItem text="Priority email support" />
                            <FeatureItem text="Ad-free dashboard" />
                        </ul>
                        <Link href="/register" className={`${styles.btn} ${styles.btnLight}`}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                Start Free Trial <ArrowRight size={20} />
                            </span>
                        </Link>
                    </section>

                    {/* Business Tier */}
                    <section className={styles.card}>
                        <div className={styles.planName}>Business</div>
                        <div className={styles.priceDisplay}>
                            <span className={styles.currency}>₹</span>
                            <span className={styles.price}>799</span>
                            <span className={styles.period}>/mo</span>
                        </div>
                        <ul className={styles.features}>
                            <FeatureItem text="Everything in Pro" />
                            <FeatureItem text="Use your own domain" />
                            <FeatureItem text="Team collaboration" />
                            <FeatureItem text="Detailed click reports" />
                        </ul>
                        <Link href="/contact" className={`${styles.btn} ${styles.btnDark}`}>
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
            <Check className={styles.icon} size={22} strokeWidth={3} />
            <span>{text}</span>
        </li>
    );
}
