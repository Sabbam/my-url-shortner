import { NextRequest, NextResponse } from 'next/server';
import { getBaseApiUrl } from '@/lib/api-config';


export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
    const { code } = await params;

    if (code === 'favicon.ico') {
        return new Response(null, { status: 404 });
    }

    try {
        const res = await fetch(`${getBaseApiUrl()}/api/url/${code}`, {
            cache: 'no-store'
        });

        if (res.ok) {
            const data = await res.json();
            if (data && data.originalUrl) { // Check for truthiness and property
                return NextResponse.redirect(data.originalUrl);
            }
        }
    } catch (error) {
        console.error("Error fetching from backend:", error);
    }

    // If not found or error, redirect to home with error parameter
    const url = new URL('/', req.url);
    url.searchParams.set('error', 'not_found');
    return NextResponse.redirect(url);
}
