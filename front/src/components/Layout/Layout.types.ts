// Layout.types.ts
import type { PropsWithChildren } from "react";

export type LayoutProps = PropsWithChildren<{
  center?: boolean;  // .layout--center
  wide?: boolean;    // .layout--wide
  paddedInner?: boolean; // .layout__inner--padded
}>;
