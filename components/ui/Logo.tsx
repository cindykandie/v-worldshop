import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function Logo({
  className,
  width = 140,
  height = 140,
  priority = false,
}: Props) {
  return (
    <Image
      src="/mainlogo.jpg"
      alt="The Vagina Worldshop logo"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto", className)}
    />
  );
}
