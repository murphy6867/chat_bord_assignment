export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  user: {
    username: string;
    id: number;
  };
}

export interface GeneralPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number | null;
  _count: {
    comments: number;
  };
  category: {
    id: number;
    name: string;
  };
  user: {
    id: number;
    username: string;
  };
}

export interface Category {
  id: number;
  name: string;
}

export interface SiglePost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    username: string;
  };
  _count: { comments: number };
  categoryId: number | null;
  category: { name: string };
  comments: Comment[];
}

export interface OurPostContent {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  _count: {
    comments: number;
  };
  user: {
    username: string;
  };
}
