'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from '../faq.module.css';

const faqs = [
    {
        question: "How does the custom alias feature work?",
        answer: "The custom alias feature allows you to choose exactly what comes after the slash in your short link. Instead of a random string like /xHj9k2, you can create something like /summer-sale. This increases brand trust and click-through rates."
    },
    {
        question: "Can I connect my own professional domain?",
        answer: "Yes! On our Business plan, you can connect your own domain (e.g., link.yourcompany.com). You bring the domain from any provider like GoDaddy or Namecheap, and we provide the infrastructure to handle the redirections and SSL."
    },
    {
        question: "Is there a limit to how many links I can create?",
        answer: "Our Free plan allows up to 50 links per month. Our Pro and Business plans offer unlimited link creation, so you never have to worry about hitting a wall as your ecosystem grows."
    },
    {
        question: "Do you offer real-time analytics?",
        answer: "Absolutely. Every click is tracked instantly. You'll be able to see geographic data, device types, and referring sources in your dashboard the moment someone clicks your link."
    },
    {
        question: "What security measures do you have in place?",
        answer: "We use bank-grade encryption for all data. Every shortened link is automatically scanned for malware and phishing to protect your users. We also enforce strict IP-based registration to prevent bot abuse."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className={styles.wrapper}>
            <div className={styles.glow} />
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Frequently Asked Questions</h1>
                    <p className={styles.subtitle}>
                        Everything you need to know about My URL Shortner and how to maximize your link potential.
                    </p>
                </div>

                <div className={styles.faqList}>
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.faqItem} ${openIndex === index ? styles.isOpen : ''}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className={styles.questionText}>{faq.question}</span>
                                <ChevronDown className={styles.icon} />
                            </button>
                            {openIndex === index && (
                                <div className={styles.answer}>
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
