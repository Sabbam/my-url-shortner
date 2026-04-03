# 🌌 Quantum URL Shortener

![Quantum Banner](https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=2000)

**Quantum URL Shortener** is a high-performance, full-stack link management platform designed for modern teams. It combines a stunning, motion-heavy Next.js frontend with a robust Java Spring Boot backend to deliver instant redirections and beautiful analytics.

---

## ✨ Key Features

-   **Instant Shortening**: Transform long URLs into quantum-safe short links in milliseconds.
-   **Custom Aliases**: Brand your links with personalized paths (e.g., `/my-brand`).
-   **Premium UI/UX**: Glassmorphic design with smooth Framer Motion animations.
-   **Interactive Dashboard**: Manage your links and track performance with a sleek data interface.
-   **Tiered Pricing**: Flexible plans from "Basic Free" to "Elite Brand."
-   **Secure Authentication**: Role-based access control and secure user management.
-   **Real-time Previews**: Generate and download QR codes for every link.

---

## 🛠️ Tech Stack

### Frontend (Next.js)
-   **Framework**: Next.js 15+ (App Router)
-   **Logic**: React 19, TypeScript
-   **Styling**: Vanilla CSS Modules (Quantum Design System)
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Deployment**: [Netlify](https://www.netlify.com/)

### Backend (Spring Boot)
-   **Framework**: Spring Boot 3.2 (Java 17)
-   **Database**: PostgreSQL (Production) / H2 (Development)
-   **Build Tool**: Maven
-   **Security**: Spring Security & JWT (Context-ready)

---

## 🚀 Getting Started

### Prerequisites
-   **Node.js**: v20 or later
-   **Java JDK**: v17 or later
-   **Maven**: v3.8 or later

### Local Setup

The project includes convenient scripts to handle everything:

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Sabbam/my-url-shortner.git
    cd my-url-shortner
    ```

2.  **Start both servers**:
    ```bash
    ./start-all.sh
    ```
    This script will build the Java backend and start the Next.js development server simultaneously.

3.  **Access the project**:
    -   Frontend: [http://localhost:3000](http://localhost:3000)
    -   Backend: [http://localhost:8080](http://localhost:8080)

---

## 📁 Project Structure

```text
├── app/                  # Next.js 15 Frontend
│   ├── src/app/          # App Router & Pages
│   └── src/components/   # Shared UI Components
├── backend/              # Java Spring Boot Backend
│   ├── src/main/java/    # Backend Logic
│   └── pom.xml           # Maven Configuration
├── netlify.toml          # Deployment & Redirect Config
├── start-all.sh          # Full-stack Startup Script
└── setup-and-run-...sh   # Backend Setup Script
```

---

## 🌐 Deployment

The frontend is optimized for **Netlify**. It includes a `netlify.toml` file configured with:
-   Automatic builds via `npm run build`.
-   Domain-level redirects to enforce the primary host `https://myurl.mannayuvatha.com/`.
-   Catch-all routing for short link redirection.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Developed with ❤️ by **Sabbam Chandraneel (Manna Yuvatha)** for the next generation of link management.
