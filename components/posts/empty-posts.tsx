export function EmptyPosts() {
  return (
    <div className="flex h-75 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/20 text-center">
      <h2 className="mb-2 text-xl font-semibold tracking-tight">
        Nenhum post encontrado
      </h2>

      <p className="max-w-md text-sm leading-relaxed text-zinc-500">
        Tente realizar uma nova busca ou criar um novo post.
      </p>
    </div>
  );
}
