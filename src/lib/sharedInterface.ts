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