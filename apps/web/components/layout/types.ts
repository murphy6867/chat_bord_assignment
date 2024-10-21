export interface Post {
    id: number;
    title: string;
    content: string;
    user_id: number;
    category_id: number;
    created_at: string; // or Date if you're converting to Date objects
    updated_at: string; // or Date
  }
  