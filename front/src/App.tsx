import { useEffect, useState } from "react";

export default function App() {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/comments", { credentials: "include" })
      .then(res => res.json())
      .then(setComments);
  }, []);

  return (
    <div className="min-h-dvh p-6">
      <h1 className="text-xl font-bold mb-4">댓글 목록</h1>
      <ul className="space-y-2">
        {comments.map((c, i) => (
          <li key={i} className="border p-2 rounded">
            <span className="font-semibold">{c.authorId}</span>: {c.body}
          </li>
        ))}
      </ul>
    </div>
  );
}
