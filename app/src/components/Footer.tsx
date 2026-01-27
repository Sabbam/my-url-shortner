import Link from 'next/link';
import { Zap } from 'lucide-react';
import styles from './footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {/* Brand Column */}
                    <div className={styles.brandCol}>
                        <Link href="/" className={styles.logo}>
                            <Zap size={24} fill="currentColor" color="hsl(var(--primary-hsl))" />
                            <span className="text-gradient">SLink</span>
                        </Link>
                        <p className={styles.tagline}>
                            Fast, secure, and branded URL shortening for elite performance. Transform your links into powerful assets.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className={styles.colTitle}>Product</h4>
                        <div className={styles.linkList}>
                            <Link href="/features" className={styles.footerLink}>Features</Link>
                            <Link href="/pricing" className={styles.footerLink}>Pricing</Link>
                            <Link href="/analytics" className={styles.footerLink}>Analytics</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className={styles.colTitle}>Support</h4>
                        <div className={styles.linkList}>
                            <Link href="/contact" className={styles.footerLink}>Contact Us</Link>
                            <Link href="/faq" className={styles.footerLink}>Help Center</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className={styles.colTitle}>Legal</h4>
                        <div className={styles.linkList}>
                            <Link href="/privacy" className={styles.footerLink}>Privacy Policy</Link>
                            <Link href="/terms" className={styles.footerLink}>Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div>&copy; {new Date().getFullYear()} SLink Enterprises. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link href="#" className={styles.footerLink}>Twitter</Link>
                        <Link href="#" className={styles.footerLink}>LinkedIn</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
