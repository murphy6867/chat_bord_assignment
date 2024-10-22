export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  postId: number;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number | null;
}

export interface SiglePost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number | null;
  comments: Comment[];
}
