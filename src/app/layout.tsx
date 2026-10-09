import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/config/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${site.instructor.name} | Instrutor de Direção Autônomo`,
  description:
    "Aulas de direção com paciência e segurança. Perca o medo de dirigir, prepare-se para o exame prático ou comece como motorista de aplicativo.",
};

export const viewport: Viewport = {
  themeColor: "#1d4ed8",
};

import { ThemeProvider } from "@/components/ui/ThemeProvider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={`${jakarta.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
