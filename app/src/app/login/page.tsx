'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Zap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from '../auth-refined.module.css';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState('');
    const { login, user } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/dashboard');
        }

        // Show success if redirected from register
        if (searchParams.get('registered') === 'true') {
            toast.success('Account created! Please sign in.', { id: 'registered-success' });
        }
    }, [user, router, searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError('');
        setLoading(true);

        const loginPromise = async () => {
            const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://my-url-shortner-saas.up.railway.app";
            const apiUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
            
            const res = await fetch(`${apiUrl}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.text();
            
            // Safety Check: If we get HTML instead of JSON, the URL is wrong
            if (data.trim().startsWith('<!DOCTYPE') || data.trim().startsWith('<html')) {
                throw new Error('Backend URL Misconfigured: The server returned an HTML error page instead of an API response.');
            }
            if (!res.ok) {
                let errorMsg = 'Login failed';
                try {
                    const jsonError = JSON.parse(data);
                    errorMsg = jsonError.message || data;
                } catch {
                    errorMsg = data || 'Login failed';
                }
                throw new Error(errorMsg);
            }

            let userData;
            try {
                userData = JSON.parse(data);
            } catch {
                userData = { email };
            }

            login(userData);
            return userData;
        };

        toast.promise(loginPromise(), {
            loading: 'Verifying credentials...',
            success: 'Welcome back!',
            error: (err) => {
                console.error('Login Fetch Error:', err);
                const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://my-url-shortner-saas.up.railway.app";
                const displayUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
                
                if (err.message === 'Failed to fetch') {
                    return `Network Error: DNS failure or server down at ${displayUrl}. Check Railway status.`;
                }
                return err.message;
            },
        }).then(() => {
            router.push('/dashboard');
        }).catch((err) => {
            const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://my-url-shortner-saas.up.railway.app";
            const displayUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
            
            setLocalError(err.message === 'Failed to fetch' 
                ? `Network Error: Could not connect to the backend at ${displayUrl}. This is likely a DNS issue or the server is down. Ensure the backend is running and CORS is enabled for ${window.location.origin}.` 
                : err.message);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.glow} />

            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.logo}>
                        <Zap size={28} fill="currentColor" />
                    </div>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to manage your premium links</p>
                </div>

                {localError && <div className={styles.error}>{localError}</div>}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className={styles.inputField}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={styles.inputField}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    </div>

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Processing...' : 'Sign In to Dashboard'}
                    </button>
                </form>

                <p className={styles.footer}>
                    New to My URL Shortner? <Link href="/register" className={styles.footerLink}>Create free account</Link>
                </p>
            </div>
        </div>
    );
}

export default function Login() {
    return (
        <Suspense fallback={<div className={styles.wrapper}><div className={styles.loading}>Loading...</div></div>}>
            <LoginForm />
        </Suspense>
    );
}
