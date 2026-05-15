interface Props {
  items: {
    label: string;
    value: string;
  }[];
}

export function PostsStatus({ items }: Props) {
  return (
    <div className="grid gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4 md:grid-cols-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-4"
        >
          <span className="text-xs uppercase tracking-wide text-zinc-500">
            {item.label}
          </span>

          <span className="text-sm font-medium">
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
}