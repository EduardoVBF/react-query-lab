import { AppShell } from "@/components/layout/app-shell";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export default function HomePage() {
  return (
    <AppShell>
      <Navbar />

      <section className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight">
            Comparando gerenciamento de estado assíncrono tradicional com
            TanStack Query.
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-zinc-400">
            Este projeto demonstra as diferenças arquiteturais e de experiência
            de desenvolvimento entre o gerenciamento manual de estado assíncrono
            utilizando useState e useEffect versus o uso do TanStack Query.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Link
            href="/traditional"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-zinc-500">Tradicional</span>

              <span className="text-xs text-zinc-600 transition group-hover:text-zinc-400">
                useEffect + useState
              </span>
            </div>

            <h2 className="mb-3 text-2xl font-semibold tracking-tight">
              Gerenciamento manual de estado assíncrono
            </h2>

            <p className="text-sm leading-relaxed text-zinc-400">
              Loading, sincronização, refetch e mutations controlados
              manualmente utilizando hooks nativos do React.
            </p>
          </Link>

          <Link
            href="/react-query"
            className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-zinc-700 hover:bg-zinc-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-zinc-500">TanStack Query</span>

              <span className="text-xs text-zinc-600 transition group-hover:text-zinc-400">
                Server State
              </span>
            </div>

            <h2 className="mb-3 text-2xl font-semibold tracking-tight">
              Gerenciamento moderno de estado assíncrono
            </h2>

            <p className="text-sm leading-relaxed text-zinc-400">
              Cache automático, background refetch, optimistic updates e
              mutations simplificadas utilizando TanStack Query.
            </p>
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
