interface Props {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PostsPagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded-lg border border-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Anterior
      </button>

      <span className="text-sm text-zinc-400">
        Página {page} de {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded-lg border border-zinc-800 px-4 py-2 text-sm transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Próxima
      </button>
    </div>
  );
}
