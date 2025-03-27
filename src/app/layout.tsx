/*
This file defines the RootLayout component, which serves as the layout wrapper for the application.
It uses the Poppins font from Google Fonts, optimized with Next.js, and applies global styles.

Key Features:
1. Imports the Poppins font with specific subsets, display settings, CSS variable name, and weight options.
2. Applies the font and antialiasing to the body element for consistent and smooth text rendering.
3. Wraps the application content (children) within an HTML structure with the language set to English.
*/

import { Poppins } from "next/font/google"; // Import the Poppins font.
import "./globals.css";                     // Import global CSS styles.

const poppins = Poppins({
    subsets: ['latin'],                                                         // Character subsets to include.
    display: 'swap',                                                            // Fallback font display until the custom font loads.
    variable: '--font-poppins',                                                 // CSS variable for the font.
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']     // Available font weights.
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} antialiased`}>
                {children}
            </body>
        </html>
    );
}
