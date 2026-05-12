import { QueryProvider } from "@/providers/query-provider";
import { Inter, Geist } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "React Query Lab",
  description:
    "Uma aplicação de exemplo para demonstrar o uso do React Query em comparação com o uso tradicional de estados locais e efeitos colaterais.",
};

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body
        className={`${inter.className} bg-zinc-950 text-zinc-100 antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
