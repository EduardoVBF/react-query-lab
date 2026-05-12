interface Props {
  children: React.ReactNode;
}

export function AppShell({ children }: Props) {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col px-6 py-10">
        {children}
      </div>
    </main>
  );
}
