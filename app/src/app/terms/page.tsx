'use client';

export default function Terms() {
    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '8rem 1.5rem' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '4rem', borderRadius: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '2rem' }}>Terms of Service</h1>
                <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>Last updated: January 2026</p>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>1. Acceptable Use</h2>
                    <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                        By using My Ecosystems, you agree not to create shortened links for malicious purposes, including phishing, malware distribution, or illegal content. Violation of these terms will result in immediate account termination.
                    </p>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>2. Subscription Plans</h2>
                    <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                        Free accounts are limited to 50 links per month. Pro features are billed monthly and can be canceled at any time. We do not offer partial refunds for mid-cycle cancellations.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>3. Service Availability</h2>
                    <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                        While we strive for 100% uptime, My Ecosystems is provided 'as is'. We are not liable for any business interruption caused by service downtime.
                    </p>
                </section>
            </div>
        </div>
    );
}
