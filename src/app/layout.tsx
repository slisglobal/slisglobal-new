import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Silver Lining Intellectual Services Pvt Ltd",
  description: "Bridging Human Potential & Global Requirements. Shaping Lives, Igniting Success.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} dark antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body selection:bg-primary/30 overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
