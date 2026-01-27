'use client';

export default function Privacy() {
    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '8rem 1.5rem' }}>
            <div style={{ maxWidth: '700px', margin: '0 auto', background: 'white', padding: '4rem', borderRadius: '2.5rem', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '2rem' }}>Privacy Policy</h1>
                <p style={{ color: '#94a3b8', marginBottom: '3rem' }}>Last updated: January 2026</p>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>1. Information We Collect</h2>
                    <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                        At My Ecosystems, your privacy is our priority. When you use our service, we collect basic account information (email, password) and link interaction data (IP addresses, device type) purely for analytics purposes.
                    </p>
                </section>

                <section style={{ marginBottom: '3rem' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>2. How We Use Data</h2>
                    <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                        Analytical data is used to provide insights to our users. We do not sell your personal information or the browsing history of your link clickers to third parties.
                    </p>
                </section>

                <section>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>3. Data Sovereignty</h2>
                    <p style={{ color: '#475569', lineHeight: 1.7, marginBottom: '1rem' }}>
                        You have the right to request the deletion of your account and all associated link data at any time from your dashboard settings.
                    </p>
                </section>
            </div>
        </div>
    );
}
