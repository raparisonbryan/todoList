import { Inter } from "next/font/google";
import "@/public/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo list",
  description: "Meilleure Todo list existante",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
