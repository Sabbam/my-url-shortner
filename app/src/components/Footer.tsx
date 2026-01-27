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
                            <Zap size={24} fill="#2563eb" color="#2563eb" />
                            My URL Shortner
                        </Link>
                        <p className={styles.tagline}>
                            Making the web more accessible, one short link at a time. Built for modern brands.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className={styles.colTitle}>Product</h4>
                        <div className={styles.linkList}>
                            <Link href="/pricing" className={styles.footerLink}>Pricing</Link>
                            <Link href="/features" className={styles.footerLink}>Features</Link>
                            <Link href="/analytics" className={styles.footerLink}>Analytics</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className={styles.colTitle}>Support</h4>
                        <div className={styles.linkList}>
                            <Link href="/contact" className={styles.footerLink}>Contact</Link>
                            <Link href="/faq" className={styles.footerLink}>FAQ</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className={styles.colTitle}>Legal</h4>
                        <div className={styles.linkList}>
                            <Link href="/privacy" className={styles.footerLink}>Privacy</Link>
                            <Link href="/terms" className={styles.footerLink}>Terms</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div>&copy; {new Date().getFullYear()} My Ecosystems. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
