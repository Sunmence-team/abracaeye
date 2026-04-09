export interface postCardProps {
  id: string;
  cover_image: string;
  images: string[];
  title: string;
  body: {
    content: string;
  };
  likes_count: number;
  comments_count: number;
  created_at: string;
  status?: string;
  published_at?: string;
  is_published?: boolean;
  user_id?: number;
}

export interface userProps {
  id: string;
  name: string;
  email: string;
  created_at: string;
  role: string;
  blog: boolean;
  vendor: boolean;
}

export interface ContactProps extends userProps {
  message: string;
}

export interface BlogPostProps extends postCardProps {
  user: userProps;
  showBottom?: boolean;
}

export interface CommentProps {
  id: number;
  text: string;
  created_at: string;
  user: {
    name: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  user_id: number;
  category_id: number;
  images: string[];
  name: string;
  price: string;
  category: Category;
  description: string;
  quantity: number;
  user: userProps;
}