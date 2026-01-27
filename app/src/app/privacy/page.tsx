'use client';

import styles from '../legal.module.css';

export default function Privacy() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.glow} />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <p className={styles.lastUpdated}>Last updated: January 2026</p>
                </header>

                <div className={styles.content}>
                    <section>
                        <h2>1. Information We Collect</h2>
                        <p>
                            At My URL Shortner, your privacy is our supreme priority. When you use our high-performance service, we collect essential account information (email) and link interaction telemetry (anonymized IP addresses, device headers) purely for analytics purposes.
                        </p>
                    </section>

                    <section>
                        <h2>2. How We Use Data</h2>
                        <p>
                            Analytical data is used exclusively to provide insights to our users. We strictly do not sell your personal information or the browsing history of your link visitors to any third parties for marketing or tracking.
                        </p>
                    </section>

                    <section>
                        <h2>3. Data Sovereignty</h2>
                        <p>
                            You maintain full control over your data. You have the right to request the complete deletion of your account and all associated link history at any time through our automated support channels.
                        </p>
                    </section>

                    <section>
                        <h2>4. Cookie Policy</h2>
                        <p>
                            We use standard technical cookies to keep you signed in securely. No cross-site tracking cookies are utilized for advertising on our platform.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
