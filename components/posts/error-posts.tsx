interface Props {
  onRetry: () => void;
}

export function ErrorPosts({ onRetry }: Props) {
  return (
    <div className="flex h-75 flex-col items-center justify-center rounded-2xl border border-red-950 bg-red-950/10 text-center">
      <h2 className="mb-2 text-xl font-semibold tracking-tight text-red-300">
        Erro ao carregar posts
      </h2>

      <p className="mb-5 max-w-md text-sm leading-relaxed text-red-400">
        Ocorreu um erro durante a requisição.
      </p>

      <button
        onClick={onRetry}
        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
      >
        Tentar novamente
      </button>
    </div>
  );
}
