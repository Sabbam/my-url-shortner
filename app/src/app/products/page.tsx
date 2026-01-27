'use client';

import { Link2, QrCode, PieChart, Shield, Zap } from 'lucide-react';

export default function Products() {
    return (
        <main style={{ background: '#f8fafc', minHeight: '100vh', padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem' }}>Our Products</h1>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '40rem', margin: '0 auto' }}>
                        Tools designed to help you connect with your audience and track your success.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                    <ProductCard
                        icon={<Link2 size={32} />}
                        title="URL Shortener"
                        desc="Transform long, ugly links into short, memorable branded links. Custom aliases, domain masking, and click tracking included."
                    />

                    <ProductCard
                        icon={<QrCode size={32} />}
                        title="QR Code Generator"
                        desc="Create custom QR codes that align with your brand. Change colors, add logos, and track scans in real-time."
                    />

                    <ProductCard
                        icon={<PieChart size={32} />}
                        title="Advanced Analytics"
                        desc="Gain insights into your audience. Track geographic location, device type, referrer sources, and time of day activity."
                    />

                    <ProductCard
                        icon={<Shield size={32} />}
                        title="Link Security"
                        desc="Protect your users with automatic malware scanning and HTTPS encryption. Set password protection for sensitive links."
                    />

                    <ProductCard
                        icon={<Zap size={32} />}
                        title="API Access"
                        desc="Integrate our powerful shortening engine directly into your applications with our robust REST API."
                    />

                </div>
            </div>
        </main>
    );
}

function ProductCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
    return (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ color: '#2563eb', padding: '1rem', background: '#eff6ff', borderRadius: '0.75rem', width: 'fit-content' }}>
                {icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a' }}>{title}</h3>
            <p style={{ color: '#64748b', lineHeight: 1.6 }}>{desc}</p>
            <a href="#" style={{ marginTop: 'auto', color: '#2563eb', fontWeight: 500, textDecoration: 'none' }}>Learn more →</a>
        </div>
    )
}
