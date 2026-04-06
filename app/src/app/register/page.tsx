'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Zap, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import styles from '../auth-refined.module.css';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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

        const registerPromise = async () => {
            const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://my-url-shortner-saas.up.railway.app";
            const apiUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
            
            const res = await fetch(`${apiUrl}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name: "New User" }),
            });

            const data = await res.text();

            // Safety Check: If we get HTML instead of JSON, the URL is wrong
            if (data.trim().startsWith('<!DOCTYPE') || data.trim().startsWith('<html')) {
                throw new Error('Backend URL Misconfigured: The server returned an HTML error page instead of an API response.');
            }
            if (!res.ok) {
                let errorMsg = 'Registration failed';
                try {
                    const jsonError = JSON.parse(data);
                    errorMsg = jsonError.message || data;
                } catch {
                    errorMsg = data || 'Registration failed';
                }
                throw new Error(errorMsg);
            }
            return data;
        };

        toast.promise(registerPromise(), {
            loading: 'Creating your account...',
            success: 'Registration successful!',
            error: (err) => {
                console.error('Registration Fetch Error:', err);
                const rawUrl = process.env.NEXT_PUBLIC_API_URL || "https://my-url-shortner-saas.up.railway.app";
                const displayUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
                
                if (err.message === 'Failed to fetch') {
                    return `Network Error: DNS failure or server down at ${displayUrl}. Check Railway status.`;
                }
                return err.message;
            },
        }).then(() => {
            router.push('/login?registered=true');
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
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>Join My URL Shortner and start scaling your links</p>
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
                            placeholder="Min. 8 characters"
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
                        {loading ? 'Creating...' : 'Get Started For Free'}
                    </button>
                </form>

                <p className={styles.footer}>
                    Already have an account? <Link href="/login" className={styles.footerLink}>Sign in here</Link>
                </p>
            </div>
        </div>
    );
}
