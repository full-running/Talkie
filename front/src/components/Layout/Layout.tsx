// Layout.tsx
import type { PropsWithChildren } from "react";
import clsx from "clsx";
import styles from "./Layout.module.scss";

type LayoutProps = PropsWithChildren<{
  /** 레이아웃 전체를 화면 중앙 배치 (폼/단일 페이지 등) */
  center?: boolean;
  /** 컨테이너 최대폭을 좀 더 넓게 */
  wide?: boolean;
  /** 내부 패딩을 더 크게 */
  paddedInner?: boolean;
}>;

export default function Layout({
  children,
  center,
  wide,
  paddedInner,
}: LayoutProps) {
  return (
    <div
      className={clsx(
        styles.layout,
        center && styles["layout--center"],
        wide && styles["layout--wide"]
      )}
    >
      <div className={styles["layout__container"]}>
        <div className={clsx(styles["layout__panel"])}>
          <div
            className={clsx(
              styles["layout__inner"],
              paddedInner && styles["layout__inner--padded"]
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
