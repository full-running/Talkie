import { useId, type SelectHTMLAttributes } from "react";
import clsx from "clsx";
import styles from "./Select.module.scss";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  id?: string;
  size?: "sm" | "md" | "lg"; // ← 크기 조절용 prop
};

export default function Select({
  label,
  className,
  id,
  size = "md",
  children,
  ...props
}: SelectProps) {
  const selectId = id ?? useId();

  return (
    <div className={clsx(styles.select, styles[`select--${size}`], className)}>
      {label && (
        <label htmlFor={selectId} className={styles.select__label}>
          {label}
        </label>
      )}
      <select id={selectId} {...props} className={styles.select__native}>
        {children}
      </select>
    </div>
  );
}
