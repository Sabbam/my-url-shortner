'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Zap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './navbar.module.css';

export default function Navbar() {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContent}>
                <Link href="/" className={styles.logo} onClick={() => setIsOpen(false)}>
                    <Zap className={styles.logoIcon} size={24} fill="#2563eb" color="#2563eb" />
                    My URL Shortner
                </Link>

                {/* Desktop Links */}
                <div className={styles.navLinks}>
                    <Link href="/features" className={styles.navLink}>Features</Link>
                    <Link href="/pricing" className={styles.navLink}>Pricing</Link>
                    <Link href="/contact" className={styles.navLink}>Contact</Link>

                    <div style={{ width: '1px', height: '24px', background: '#e2e8f0', margin: '0 0.5rem' }}></div>

                    {user ? (
                        <>
                            <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
                            <button
                                onClick={() => {
                                    logout();
                                    window.location.href = '/login';
                                }}
                                className={styles.navButtonOutline}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className={styles.navLink}>Login</Link>
                            <Link href="/register" className={styles.navButton}>Get Started</Link>
                        </>
                    )}
                </div>

                {/* Mobile Hamburger */}
                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className={styles.mobileMenu}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Link href="/features" className={styles.mobileLink} onClick={toggleMenu}>Features</Link>
                            <Link href="/pricing" className={styles.mobileLink} onClick={toggleMenu}>Pricing</Link>
                            <Link href="/contact" className={styles.mobileLink} onClick={toggleMenu}>Contact</Link>
                            {user && (
                                <Link href="/dashboard" className={styles.mobileLink} onClick={toggleMenu}>Dashboard</Link>
                            )}

                            <div className={styles.mobileActions}>
                                {user ? (
                                    <button onClick={() => { logout(); toggleMenu(); window.location.href = '/login'; }} className={styles.navButtonOutline} style={{ width: '100%', justifyContent: 'center' }}>
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link href="/login" className={styles.navButtonOutline} style={{ textAlign: 'center' }} onClick={toggleMenu}>Login</Link>
                                        <Link href="/register" className={styles.mobileButton} onClick={toggleMenu}>Get Started</Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
