'use client';

import { BarChart, PieChart, LineChart, TrendingUp, Users, MousePointer2 } from 'lucide-react';

export default function Analytics() {
    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '8rem 1.5rem' }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <header style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                        Data that drives decisions.
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#64748b', maxWidth: '600px', margin: '0 auto' }}>
                        Get granular insights into who is clicking your links and where they're coming from.
                    </p>
                </header>

                {/* Analytics Mockup Preview */}
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '2.5rem', padding: '3rem', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                        <StatCard icon={<TrendingUp size={20} />} label="Total Clicks" value="124,592" growth="+12%" />
                        <StatCard icon={<MousePointer2 size={20} />} label="Average CTR" value="4.2%" growth="+1.5%" />
                        <StatCard icon={<Users size={20} />} label="Unique Visitors" value="89,203" growth="+8%" />
                    </div>

                    <div style={{ background: '#f8fafc', borderRadius: '1.5rem', padding: '2rem', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px dashed #cbd5e2' }}>
                        {/* Visual representation of a chart */}
                        <div style={{ textAlign: 'center' }}>
                            <LineChart size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p style={{ fontWeight: 600 }}>Interactive Analytics Chart Mockup</p>
                            <p style={{ fontSize: '0.875rem' }}>Available in your personal dashboard after login.</p>
                        </div>
                    </div>
                </div>

                <section style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>Device Tracking</h2>
                        <p style={{ color: '#64748b', lineHeight: 1.6, marginBottom: '2rem' }}>
                            Identify if your audience is primarily on mobile or desktop. Optimize your landing pages based on real user hardware data.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <div style={{ padding: '0.75rem 1.5rem', background: '#eff6ff', color: '#2563eb', borderRadius: '1rem', fontWeight: 600 }}>98% Precision</div>
                        </div>
                    </div>
                    <div style={{ background: 'white', padding: '2rem', borderRadius: '2rem', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
                        <PieChart size={120} color="#2563eb" style={{ opacity: 0.8 }} />
                    </div>
                </section>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, growth }: { icon: any, label: string, value: string, growth: string }) {
    return (
        <div style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '1.5rem', border: '1px solid #f1f5f9' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ color: '#2563eb' }}>{icon}</div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#22c55e' }}>{growth}</div>
            </div>
            <div style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{value}</div>
        </div>
    );
}
