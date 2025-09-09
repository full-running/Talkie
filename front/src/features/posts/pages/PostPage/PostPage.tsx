import { useEffect, useState,useMemo } from "react";
import type { Post } from "../../../../types/post";
import type { Comment } from "../../../../types/comment";
import Layout from "../../../../components/Layout/Layout";
import styles from "./PostPage.module.scss";

export default function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch("/api/posts", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Post[]) => setPosts(data));

    fetch("/api/comments", { credentials: "include" })
      .then((res) => res.json())
      .then((data: Comment[]) => setComments(data));
  }, []);

  // postId -> count 집계
  const commentCounts = useMemo(() => {
    return comments.reduce((acc, c) => {
      acc[c.postId] = (acc[c.postId] ?? 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [comments]);

  return (
    <Layout wide paddedInner>
      <section>
        <header className={styles["post__header"]}>
          <h1 className={styles["post__header__title"]}>커뮤니티</h1>
          <p className={styles["post__header__desc"]}>
            다양한 사람을 만나고 생각의 폭을 넓혀보세요.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className={styles["post__empty"]}>
            아직 댓글이 없습니다.
          </div>
        ) : (
          <ul className={styles["post__list"]}>
            {posts.map((post) => (
              <li key={post.id} className={styles["post__item"]}>
                <div className={styles["post__item__head"]}>
                  <span className={styles["post__item__author"]}>{post.authorId}</span>
                  <span className={styles["post__item__created_time"]}>
                    {post.createdAt.split("T")[0].replace(/-/g, ".")}
                  </span>
                </div>
                <div className={styles["post__item__body"]}>
                  <span className={styles["post__item__title"]}>{post.title}</span>
                </div>
                <div className={styles["post__item__foot"]}>
                  <span className={styles["post__item__count"]} aria-label="댓글 수" title="댓글 수">
                    💬 {commentCounts[post.id] ?? 0}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </Layout>
  );
}
