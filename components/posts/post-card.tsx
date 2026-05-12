import { Post } from "@/types/post";

interface Props {
  post: Post;
  onView: (post: Post) => void;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
}

export function PostCard({ post, onView, onEdit, onDelete }: Props) {
  return (
    <article className="flex flex-col justify-between rounded-2xl border border-zinc-800 bg-zinc-900/40 p-5 transition hover:border-zinc-700">
      <div className="mb-6 flex flex-col gap-3">
        <span className="text-xs text-zinc-500">Post #{post.id}</span>

        <h2 className="line-clamp-2 text-xl font-semibold tracking-tight">
          {post.title}
        </h2>

        <p className="line-clamp-3 text-sm leading-relaxed text-zinc-400">
          {post.body}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(post)}
          className="rounded-lg border border-zinc-800 px-3 py-2 text-sm transition hover:bg-zinc-800"
        >
          Ver
        </button>

        <button
          onClick={() => onEdit(post)}
          className="rounded-lg border border-zinc-800 px-3 py-2 text-sm transition hover:bg-zinc-800"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(post)}
          className="rounded-lg border border-red-950 bg-red-950/30 px-3 py-2 text-sm text-red-300 transition hover:bg-red-950/50"
        >
          Excluir
        </button>
      </div>
    </article>
  );
}
