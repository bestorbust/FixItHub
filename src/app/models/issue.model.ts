export interface Issue {
  _id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  images?: string[];
  createdAt: string;
  votes: { upvotes: number; downvotes: number };
  comments: { user: string; text: string }[];
  isUserIssue?: boolean;  // ✅ Add this field
}
