import type { Metadata } from "next";
import "./globals.css";
import "./beyond-the-spark/beyond-spark.css";
export const metadata: Metadata = {
  title: "AI Marriage — Beyond the spark",
  description:
    "Looks catch your eye. Shared values make you stay. Explore a thoughtful, fictional demonstration of meaningful compatibility.",
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
