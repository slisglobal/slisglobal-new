import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://slisglobal.com"),
  title: {
    default: "Silver Lining Intellectual Services | Career & Corporate Excellence",
    template: "%s | Silver Lining Intellectual Services"
  },
  description: "SLIS offers comprehensive career guidance, campus placement support, higher education consulting, and human capital & IT solutions. Bridging human potential & global requirements.",
  keywords: ["Career Guidance", "Placement Support", "Higher Education Support", "Corporate Hiring", "IT Solutions", "TNPSC Coaching", "UPSC Preparation", "Silver Lining Intellectual Services", "SLIS", "Trichy Education"],
  authors: [{ name: "Silver Lining Intellectual Services" }],
  creator: "Silver Lining",
  publisher: "Silver Lining Intellectual Services",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Silver Lining Intellectual Services | Career & Corporate Excellence",
    description: "Bridging Human Potential & Global Requirements. Expert placement, education, and corporate solutions in Trichy.",
    url: "https://slisglobal.com",
    siteName: "Silver Lining",
    images: [
      {
        url: "/images/hero_crystal.png",
        width: 1200,
        height: 630,
        alt: "Silver Lining Intellectual Services",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silver Lining Intellectual Services",
    description: "Expert career guidance, placement coordination, and corporate IT solutions.",
    creator: "@Slisglobal",
    images: ["/images/hero_crystal.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
        />
      </head>
      <body className="font-body selection:bg-primary/30 overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
