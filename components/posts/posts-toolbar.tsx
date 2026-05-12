interface Props {
  search: string;
  onSearch: (value: string) => void;
  onCreate: () => void;
}

export function PostsToolbar({ search, onSearch, onCreate }: Props) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 md:flex-row md:items-center md:justify-between">
      <input
        value={search}
        onChange={(event) => onSearch(event.target.value)}
        placeholder="Buscar posts..."
        className="h-11 w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 text-sm outline-none transition focus:border-zinc-700 md:max-w-sm"
      />

      <button
        onClick={onCreate}
        className="h-11 rounded-lg bg-zinc-100 px-5 text-sm font-medium text-zinc-950 transition hover:bg-zinc-300"
      >
        Novo post
      </button>
    </div>
  );
}
