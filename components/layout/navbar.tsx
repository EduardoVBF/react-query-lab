import Link from "next/link";

export function Navbar() {
  return (
    <header className="mb-10 flex items-center justify-between border-b border-zinc-800 pb-6">
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-tight">
          React Query Lab
        </span>

        <span className="text-sm text-zinc-500">
          Tradicional vs TanStack Query
        </span>
      </div>

      <nav className="flex items-center gap-3">
        <Link
          href="/traditional"
          className="rounded-lg border border-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-900"
        >
          Tradicional
        </Link>

        <Link
          href="/react-query"
          className="rounded-lg border border-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-900"
        >
          React Query
        </Link>
      </nav>
    </header>
  );
}
