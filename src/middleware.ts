// Importing NextResponse and NextRequest from 'next/server' to handle middleware responses and requests.
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware function to handle incoming requests.
export function middleware(request: NextRequest) {

    // Check if the requested URL path is the root ('/').
    if (request.nextUrl.pathname === '/') {
        // Redirect the user to the '/home' page if the root path is accessed.
        return NextResponse.redirect(new URL('/home', request.url))
    }

    // Additional middleware logic can be added here if needed.
}