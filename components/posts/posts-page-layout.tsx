interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function PostsPageLayout({
  title,
  description,
  children,
}: Props) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold tracking-tight">{title}</h1>

        <p className="max-w-2xl text-sm leading-relaxed text-zinc-400">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}