"use client";
import {
  createPost,
  deletePost,
  updatePost,
} from "@/services/api/posts.service";
import { PostsPageLayout } from "@/components/posts/posts-page-layout";
import { PostsPagination } from "@/components/posts/posts-pagination";
import { PostFormModal } from "@/components/posts/post-form-modal";
import { PostsSkeleton } from "@/components/posts/posts-skeleton";
import { PostsToolbar } from "@/components/posts/posts-toolbar";
import { EmptyPosts } from "@/components/posts/empty-posts";
import { ErrorPosts } from "@/components/posts/error-posts";
import { PostsGrid } from "@/components/posts/posts-grid";
import { AppShell } from "@/components/layout/app-shell";
import { getPosts } from "@/services/api/posts.service";
import { PostFormData } from "@/schemas/post-schema";
import { Navbar } from "@/components/layout/navbar";
import { useDebounce } from "@/hooks/use-debounce";
import { useEffect, useState } from "react";
import { Post } from "@/types/post";

const POSTS_PER_PAGE = 9;

export default function TraditionalPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  async function fetchPosts() {
    try {
      setIsLoading(true);

      setIsError(false);

      const data = await getPosts({
        page,
        limit: POSTS_PER_PAGE,
        search: debouncedSearch,
      });

      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmitPost(data: PostFormData) {
    try {
      setIsSubmitting(true);

      if (selectedPost) {
        const updatedPost = await updatePost(selectedPost.id, data);

        setPosts((currentPosts) =>
          currentPosts.map((post) =>
            post.id === selectedPost.id
              ? {
                  ...post,
                  ...updatedPost,
                }
              : post,
          ),
        );
      } else {
        const createdPost = await createPost(data);

        setPosts((currentPosts) => [
          {
            ...createdPost,
            id: Date.now(),
          },
          ...currentPosts,
        ]);
      }

      setIsFormOpen(false);
      setSelectedPost(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDeletePost(post: Post) {
    const confirmDelete = window.confirm(
      `Deseja excluir o post "${post.title}"?`,
    );

    if (!confirmDelete) {
      return;
    }

    const previousPosts = posts;

    setPosts((currentPosts) =>
      currentPosts.filter((item) => item.id !== post.id),
    );

    try {
      await deletePost(post.id);
    } catch {
      setPosts(previousPosts);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, debouncedSearch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [debouncedSearch]);

  return (
    <AppShell>
      <Navbar />

      <PostsPageLayout
        title="Implementação Tradicional"
        description="Gerenciamento manual de estado assíncrono utilizando useEffect e useState."
      >
        <PostsToolbar
          search={search}
          onSearch={setSearch}
          onCreate={() => {
            setSelectedPost(null);
            setIsFormOpen(true);
          }}
        />

        {isLoading && <PostsSkeleton />}

        {!isLoading && isError && <ErrorPosts onRetry={fetchPosts} />}

        {!isLoading && !isError && posts.length === 0 && <EmptyPosts />}

        {!isLoading && !isError && posts.length > 0 && (
          <PostsGrid
            posts={posts}
            onView={() => {}}
            onEdit={(post) => {
              setSelectedPost(post);
              setIsFormOpen(true);
            }}
            onDelete={handleDeletePost}
          />
        )}

        {!isLoading && !isError && posts.length > 0 && (
          <PostsPagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </PostsPageLayout>
      <PostFormModal
        open={isFormOpen}
        post={selectedPost}
        isPending={isSubmitting}
        onOpenChange={setIsFormOpen}
        onSubmit={handleSubmitPost}
      />
    </AppShell>
  );
}
