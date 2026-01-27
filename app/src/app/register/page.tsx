'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import styles from '../auth-split.module.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        setLoading(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.text();
            if (!res.ok) {
                try {
                    const jsonError = JSON.parse(data);
                    throw new Error(jsonError.message || data);
                } catch {
                    throw new Error(data || 'Registration failed');
                }
            }

            router.push('/login?registered=true');
        } catch (err: any) {
            setLocalError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.visualSide}>
                <div className={styles.auroraBlob}></div>
                <div className={styles.visualContent}>
                    <h1 className={styles.visualTitle}>Shorten. Share. Measure.</h1>
                    <p className={styles.visualText}>
                        Create your account today and get access to custom domains, branded QR codes, and advanced click tracking.
                    </p>
                </div>
            </div>

            <div className={styles.formSide}>
                <div className={styles.formWrapper}>
                    <Link href="/" className={styles.logoLink}>
                        <Zap size={24} fill="#2563eb" color="#2563eb" />
                        My URL Shortner
                    </Link>

                    <div className={styles.header}>
                        <h2 className={styles.title}>Create account</h2>
                        <p className={styles.subtitle}>Get started for free. No credit card required.</p>
                    </div>

                    {localError && <div className={styles.error}>{localError}</div>}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Email Address</label>
                            <input
                                type="email"
                                placeholder="name@company.com"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Password</label>
                            <input
                                type="password"
                                placeholder="At least 8 characters"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className={styles.footerText}>
                        Already have an account? <Link href="/login" className={styles.link}>Sign in instead</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
