export interface postCardProps {
  id: string;
  cover_image: string;
  title: string;
  body: {
    content: string;
  };
  likes_count: number
  comments_count: number
  created_at: string;
}


export interface BlogPostProps extends postCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    created_at: string;
  }
}