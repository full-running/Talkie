import { useEffect, useState,useMemo } from "react";
import type { Post } from "../../../../types/post";
import type { Comment } from "../../../../types/comment";
import Layout from "../../../../components/Layout/Layout";
import styles from "./PostPage.module.scss";
import Button from "../../../../components/Button/Button";
import Select from "../../../../components/Select/Select";

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
    return comments.reduce( // 모든 댓글을 돌면서 postId별 댓글 개수를 집계해서 객체로 반환하는 역할
      (commentCountByPostId, currentComment) => { //commentCountByPostId: postId를 키로 해서 댓글 개수를 저장한다, currentComment: 배열을 순회하면서 하나씩 꺼내오는 현재 댓글 객체
        commentCountByPostId[currentComment.postId] = // 현재 댓글의 postId 키에 저장된 개수
          (commentCountByPostId[currentComment.postId] ?? 0) + 1; // 기존 값이 없으면 0으로 간주한 뒤 1 증가시킨다.
        return commentCountByPostId; // 업데이트된 누적 객체를 다음 순회로 넘긴다.
      },
      {} as Record<string, number> // 초기 누적값: 빈 객체(키: postId, 값: 댓글 개수)
    );
  }, [comments]); // comments가 변경될 때만 위의 계산을 다시 수행

  // console.log(commentCounts); // { "1": 2, "2": 1 }

  return (
    <Layout wide paddedInner>
      <section>
        <header className={styles["post__header"]}>
          <h1 className={styles["post__header__title"]}>커뮤니티</h1>
          <p className={styles["post__header__desc"]}>
            다양한 사람을 만나고 생각의 폭을 넓혀보세요.
          </p>
        </header>

        <div className={styles["post__body"]}>

          {/* S:: 포스팅된 글 분류 */}
          <div className={styles["post__toolbar"]}>
            <Button type="button" onClick={() => {/* open modal or route */}}>글 작성하기</Button>
            <Select 
              aria-label="정렬 기준"
              defaultValue="latest"
              onChange={(e) => {/* setSort(e.target.value as SortKey) */}}
            >
              <option value="latest">최신순</option>
              <option value="byComment">댓글순</option>
            </Select>
          </div>
          {/* E:: 포스팅된 글 분류 */}

          {/* S:: 포스팅된 글 */}
          {posts.length === 0 ? (
            <div className={styles["post__empty"]}>
              아직 작성된 포스트가 없습니다.
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
          {/* E:: 포스팅된 글 */}
        </div>
      </section>
    </Layout>
  );
}
