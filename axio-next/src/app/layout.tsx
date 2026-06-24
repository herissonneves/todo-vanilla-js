import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Axio",
  description: "A simple and efficient todo list app to manage your daily tasks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body>{children}</body>
    </html>
  );
}
