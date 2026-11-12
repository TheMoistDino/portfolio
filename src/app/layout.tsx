import type { Metadata } from "next";
import { Bricolage_Grotesque, JetBrains_Mono, Manrope } from "next/font/google";
import { SettingsSync } from "@/components/SettingsSync";
import { profile, SITE_URL } from "@/content/profile";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({ variable: "--font-bricolage", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

const description = `${profile.name}, ${profile.role}. Projects, skills and experience.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${profile.name} | Portfolio`, template: `%s | ${profile.name}` },
  description,
  openGraph: {
    type: "website",
    siteName: `${profile.name} | Portfolio`,
    title: `${profile.name} | Portfolio`,
    description,
    url: "/",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${bricolage.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <SettingsSync />
        {children}
      </body>
    </html>
  );
}
