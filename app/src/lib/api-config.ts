/**
 * Normalizes the API URL from environment variables.
 * Ensures it has a protocol (http/https) and no trailing slash.
 */
export function getBaseApiUrl(): string {
    const rawUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
    
    // Default to localhost if empty
    if (!rawUrl) return "http://localhost:8080";

    let url = rawUrl.trim();

    // Remove trailing slash
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    // Ensure protocol is present
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        // If it looks like localhost, use http, otherwise https
        if (url.startsWith('localhost') || url.startsWith('127.0.0.1')) {
            url = `http://${url}`;
        } else {
            url = `https://${url}`;
        }
    }

    return url;
}
