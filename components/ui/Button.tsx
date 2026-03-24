import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = {
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
};

export default function Button({
  href,
  variant = "primary",
  className,
  children,
}: Props) {
  const base = "vw-btn";

  const styles =
    variant === "primary" ? "vw-btn-primary" : "vw-btn-ghost";

  if (href) {
    return (
      <Link href={href} className={cn(base, styles, className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(base, styles, className)}>{children}</button>
  );
}
