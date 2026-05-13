import { Comment } from "@/types/comment";
import { Post } from "@/types/post";
import { api } from "./client";

interface GetPostsParams {
  page: number;
  limit: number;
  search?: string;
}

interface GetPostsResponse {
  posts: Post[];
  total: number;
  totalPages: number;
}

export async function getPosts({
  page,
  limit,
  search,
}: GetPostsParams): Promise<GetPostsResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const response = await api.get<Post[]>("/posts");

  let posts = response.data;

  if (search) {
    posts = posts.filter((post) =>
      post.title.toLowerCase().includes(search.toLowerCase()),
    );
  }

  const total = posts.length;

  const totalPages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    posts: posts.slice(start, end),
    total,
    totalPages,
  };
}

export async function getPostById(id: number): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const response = await api.get<Post>(`/posts/${id}`);

  return response.data;
}

export async function createPost(
  data: Pick<Post, "title" | "body">,
): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await api.post<Post>("/posts", data);

  return response.data;
}

export async function updatePost(
  id: number,
  data: Pick<Post, "title" | "body">,
): Promise<Post> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await api.put<Post>(`/posts/${id}`, data);

  return response.data;
}

export async function deletePost(id: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  await api.delete(`/posts/${id}`);
}

export async function getPostComments(
  postId: number,
): Promise<Comment[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await api.get<Comment[]>(
    `/posts/${postId}/comments`,
  );

  return response.data;
}
