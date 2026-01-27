'use client';

import styles from '../legal.module.css';

export default function Terms() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.glow} />
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>Terms of Service</h1>
                    <p className={styles.lastUpdated}>Last updated: January 2026</p>
                </header>

                <div className={styles.content}>
                    <section>
                        <h2>1. Acceptable Use</h2>
                        <p>
                            By utilizing My URL Shortner, you explicitly agree not to create shortened links for malicious purposes, including but not limited to phishing, malware distribution, or promotion of illegal content. Violation of these ethical standards will result in immediate, permanent account termination.
                        </p>
                    </section>

                    <section>
                        <h2>2. Subscription & Usage</h2>
                        <p>
                            Basic Free accounts are limited to 50 links per month. Premium features are billed on a recurring monthly cycle and can be deactivated at any time from your account settings. Subscriptions are non-refundable for the current billing period once activated.
                        </p>
                    </section>

                    <section>
                        <h2>3. Performance & Liability</h2>
                        <p>
                            While we engineer our systems for 99.9% uptime and low-latency redirections, My URL Shortner is provided 'as is'. We are not liable for any strategic or economic losses resulting from temporary service unavailability.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
}
