"use client";
import { usePathname } from "next/navigation";
import { House } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const pathname = usePathname();

  const linkClass = (path: string) =>
    `rounded-lg border px-4 py-2 text-sm transition ${
      pathname === path
        ? "border-blue-500 bg-blue-500/10 text-blue-400"
        : "border-zinc-800 hover:bg-zinc-900"
    }`;

  return (
    <header className="mb-10 flex items-center justify-between border-b border-zinc-800 pb-6">
      <div className="flex items-center gap-3">
        {pathname !== "/" && (
          <Link
            href="/"
            className="rounded-lg border border-zinc-800 p-2 transition hover:bg-zinc-900"
          >
            <House className="h-5 w-5" />
          </Link>
        )}

        <div className="flex flex-col">
          <span className="text-lg font-semibold tracking-tight">
            React Query Lab
          </span>

          <span className="text-sm text-zinc-500">
            Tradicional vs TanStack Query
          </span>
        </div>
      </div>

      <nav className="flex items-center gap-3">
        <Link href="/traditional" className={linkClass("/traditional")}>
          Tradicional
        </Link>

        <Link href="/react-query" className={linkClass("/react-query")}>
          React Query
        </Link>
      </nav>
    </header>
  );
}
