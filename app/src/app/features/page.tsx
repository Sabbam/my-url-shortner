'use client';

import { BarChart3, Globe2, ShieldCheck, Zap, Scissors, Smartphone } from 'lucide-react';

export default function Features() {
    const features = [
        {
            icon: <Scissors />,
            title: "Smart Shortening",
            desc: "Turn long, complex URLs into memorable, branded links in seconds."
        },
        {
            icon: <BarChart3 />,
            title: "Deep Analytics",
            desc: "Track every click. See device types, browser info, and geographic locations."
        },
        {
            icon: <Globe2 />,
            title: "Custom Domains",
            desc: "Use your own domain name (e.g., yourname.com/link) to build trust and brand recognition."
        },
        {
            icon: <Zap />,
            title: "Micro-Transitions",
            desc: "Links that load instantly and track interactions without slowing down the user experience."
        },
        {
            icon: <ShieldCheck />,
            title: "Advanced Security",
            desc: "Every link is scanned for malware and phishing to protect your audience."
        },
        {
            icon: <Smartphone />,
            title: "Mobile Optimized",
            desc: "Dashboard and links work perfectly on every device, from mobile to desktop."
        }
    ];

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '8rem 1.5rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                        Everything you need for link management.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                        A comprehensive suite of tools designed to help you share better and track smarter.
                    </p>
                </header>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                    {features.map((f, idx) => (
                        <div key={idx} style={{ background: 'white', padding: '2.5rem', borderRadius: '2rem', border: '1px solid #e2e8f0', transition: 'all 0.3s' }}>
                            <div style={{ width: '3.5rem', height: '3.5rem', background: '#eff6ff', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', marginBottom: '1.5rem' }}>
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>{f.title}</h3>
                            <p style={{ color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
