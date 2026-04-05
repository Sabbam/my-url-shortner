'use client';

import { useRouter } from 'next/navigation';
import { Check, ArrowRight, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/context/AuthContext';
import styles from '../pricing-refined.module.css';
import { useState } from 'react';

export default function Pricing() {
    const { user } = useAuth();
    const router = useRouter();
    const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

    const handleSubscription = async (planType: string) => {
        if (!user) {
            toast.error('Please login to subscribe');
            router.push('/login');
            return;
        }

        if (user.planType === planType) {
            toast.success('You are already on this plan!');
            return;
        }

        setLoadingPlan(planType);
        try {
            // 1. Create subscription on backend
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080'}/api/subscriptions/create`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: user.email, planType })
            });

            if (!response.ok) throw new Error('Failed to create subscription');
            const { subscriptionId } = await response.json();

            // 2. Open Razorpay Checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_SZqXibp4r8bckV',
                subscription_id: subscriptionId,
                name: 'My URL Shortner',
                description: `${planType} Subscription`,
                image: '/icon.png',
                handler: function (response: any) {
                    toast.success('Payment Successful! Your plan will update shortly.');
                    // The backend webhook will handle the plan update in real-time
                    router.push('/dashboard');
                },
                prefill: {
                    email: user.email,
                },
                theme: {
                    color: '#6366f1',
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error) {
            console.error('Subscription error:', error);
            toast.error('Could not initiate subscription. Please try again.');
        } finally {
            setLoadingPlan(null);
        }
    };

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
                        <button 
                            disabled={user?.planType === 'FREE'}
                            onClick={() => router.push('/dashboard')}
                            className={`${styles.btn} ${styles.btnGray}`}
                        >
                            {user?.planType === 'FREE' ? 'Current Plan' : 'Get Started'}
                        </button>
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
                        <button 
                            onClick={() => handleSubscription('PRO')}
                            disabled={loadingPlan === 'PRO'}
                            className={`${styles.btn} ${styles.btnLight}`}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                {loadingPlan === 'PRO' ? <Loader2 className="animate-spin" /> : (user?.planType === 'PRO' ? 'Current Plan' : 'Upgrade Now')} 
                                {user?.planType !== 'PRO' && !loadingPlan && <ArrowRight size={18} />}
                            </span>
                        </button>
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
                        <button 
                            onClick={() => handleSubscription('ELITE')}
                            disabled={loadingPlan === 'ELITE'}
                            className={`${styles.btn} ${styles.btnGray}`}
                        >
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                                {loadingPlan === 'ELITE' ? <Loader2 className="animate-spin" /> : (user?.planType === 'ELITE' ? 'Current Plan' : 'Choose Elite')}
                            </span>
                        </button>
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
