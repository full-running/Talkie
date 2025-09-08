import { useEffect, useState } from "react";
import type { Comment } from "../../../types/comment"; // 경로 맞게 수정

export default function PostPage() {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/comments", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Comment[]) => setComments(data));
  }, []);

  return (
    <div className="min-h-dvh p-6">
      <h1 className="text-xl font-bold mb-4">댓글 목록</h1>
      <ul className="space-y-2">
        {comments.map((c) => (
          <li key={c.id} className="border p-2 rounded">
            <span className="font-semibold">{c.authorId}</span>: {c.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
