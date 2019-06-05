interface Comment {
  author: string;
  content: string
}

export interface Pin {
  title: string;
  author: {
    email: string,
    name: string
  };
  link: string;
  comments: Comment[];
  likers: string[]
}
