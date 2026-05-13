"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getPostComments, getPostById } from "@/services/api/posts.service";
import { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import { Post } from "@/types/post";

interface Props {
  open: boolean;
  postId?: number | null;
  onOpenChange: (open: boolean) => void;
}

export function PostDetailsModal({ open, postId, onOpenChange }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchDetails() {
    if (!postId) {
      return;
    }

    try {
      setIsLoading(true);

      const [postResponse, commentsResponse] = await Promise.all([
        getPostById(postId),
        getPostComments(postId),
      ]);

      setPost(postResponse);

      setComments(commentsResponse);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, postId]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto border-zinc-800 bg-zinc-950 text-zinc-100 sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isLoading ? "Carregando post..." : post?.title}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex flex-col gap-4">
            <div className="h-24 animate-pulse rounded bg-zinc-800" />

            <div className="mt-4 flex flex-col gap-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-xl bg-zinc-900"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-8">
            <p className="text-sm leading-relaxed text-zinc-400">
              {post?.body}
            </p>

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-semibold tracking-tight">
                Comentários
              </h2>

              <div className="flex flex-col gap-3">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4"
                  >
                    <div className="mb-3 flex flex-col">
                      <span className="text-sm font-medium">
                        {comment.name}
                      </span>

                      <span className="text-xs text-zinc-500">
                        {comment.email}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-zinc-400">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
