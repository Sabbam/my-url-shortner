'use client';

import { Mail, MapPin, Phone, Send } from 'lucide-react';
import styles from '../contact.module.css';

export default function Contact() {
    return (
        <main className={styles.wrapper}>
            <div className={styles.aurora1} />
            <div className={styles.aurora2} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Let's talk</h1>
                    <p className={styles.subtitle}>
                        Have questions about our premium plans or custom features? We're here to help.
                    </p>
                </div>

                <div className={styles.content}>
                    <div className={styles.formCard}>
                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>First Name</label>
                                    <input type="text" placeholder="Jane" className={styles.input} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Last Name</label>
                                    <input type="text" placeholder="Doe" className={styles.input} />
                                </div>
                            </div>

                            <div className={styles.inputGroup} style={{ marginBottom: '1.5rem' }}>
                                <label className={styles.label}>Work Email</label>
                                <input type="email" placeholder="jane@company.com" className={styles.input} />
                            </div>

                            <div className={styles.inputGroup} style={{ marginBottom: '2rem' }}>
                                <label className={styles.label}>Message</label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help your business?"
                                    className={styles.textarea}
                                />
                            </div>

                            <button type="submit" className={styles.submitBtn}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                                    Send Message <Send size={18} />
                                </div>
                            </button>
                        </form>
                    </div>

                    <div className={styles.infoGrid}>
                        <ContactInfo icon={<Mail size={24} />} title="Email" value="sales@myslink.com" />
                        <ContactInfo icon={<Phone size={24} />} title="Phone" value="+91 98765 43210" />
                        <ContactInfo icon={<MapPin size={24} />} title="Office" value="Bangalore, India" />
                    </div>
                </div>
            </div>
        </main>
    );
}

function ContactInfo({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
    return (
        <div className={styles.infoCard}>
            <div className={styles.iconBox}>{icon}</div>
            <h3 className={styles.infoTitle}>{title}</h3>
            <p className={styles.infoValue}>{value}</p>
        </div>
    );
}
