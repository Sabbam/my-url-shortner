'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import styles from '../auth-split.module.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState('');
    const { login, user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"}/api/auth/login`, {
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
                    throw new Error(data || 'Login failed');
                }
            }

            let userData;
            try {
                userData = JSON.parse(data);
            } catch {
                userData = { email };
            }

            login(userData);
            router.push('/dashboard');
        } catch (err: any) {
            setLocalError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Visual Side (Marketing) */}
            <div className={styles.visualSide}>
                <div className={styles.auroraBlob}></div>
                <div className={styles.visualContent}>
                    <h1 className={styles.visualTitle}>Analyze your links in real-time.</h1>
                    <p className={styles.visualText}>
                        Join 10,000+ teams who use My URL Shortner to track, manage, and optimize their digital touchpoints.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className={styles.formSide}>
                <div className={styles.formWrapper}>
                    <Link href="/" className={styles.logoLink}>
                        <Zap size={24} fill="#2563eb" color="#2563eb" />
                        My URL Shortner
                    </Link>

                    <div className={styles.header}>
                        <h2 className={styles.title}>Welcome back</h2>
                        <p className={styles.subtitle}>Enter your details to sign in to your account.</p>
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
                                placeholder="••••••••"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className={styles.submitButton} disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className={styles.footerText}>
                        Don't have an account? <Link href="/register" className={styles.link}>Sign up for free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
