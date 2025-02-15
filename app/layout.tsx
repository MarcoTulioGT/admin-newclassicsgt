import '@/app/ui/global.css';
import type { Metadata } from "next";
import { inter } from '@/app/ui/fonts';


export const metadata: Metadata = {
  title: "Administrado de New Classics GT",
  description: "Administracion de new classics toys GT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
           <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}