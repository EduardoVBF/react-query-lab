"use client";

import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Post } from "@/types/post";

import { PostFormData, postSchema } from "@/schemas/post-schema";

interface Props {
  open: boolean;
  isPending?: boolean;
  post?: Post | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: PostFormData) => void;
}

export function PostFormModal({
  open,
  isPending,
  post,
  onOpenChange,
  onSubmit,
}: Props) {
  const isEditing = Boolean(post);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        body: post.body,
      });

      return;
    }

    reset({
      title: "",
      body: "",
    });
  }, [post, reset]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-zinc-800 bg-zinc-950 text-zinc-100">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar post" : "Novo post"}</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-4 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <input
              {...register("title")}
              placeholder="Título"
              className="h-11 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm outline-none transition focus:border-zinc-700"
            />

            {errors.title && (
              <span className="text-xs text-red-400">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <textarea
              {...register("body")}
              placeholder="Conteúdo"
              className="min-h-35 rounded-lg border border-zinc-800 bg-zinc-900 p-4 text-sm outline-none transition focus:border-zinc-700"
            />

            {errors.body && (
              <span className="text-xs text-red-400">
                {errors.body.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="h-11 rounded-lg bg-zinc-100 text-sm font-medium text-zinc-950 transition hover:bg-zinc-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending
              ? "Salvando..."
              : isEditing
                ? "Salvar alterações"
                : "Criar post"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
