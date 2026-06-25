import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "cta" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-oxford text-white hover:bg-oxford-light border border-oxford",
  secondary:
    "bg-transparent text-oxford border border-oxford hover:bg-oxford hover:text-white",
  cta:
    "bg-bone text-oxford hover:bg-white border border-bone",
  ghost:
    "bg-transparent text-platinum hover:text-white border border-transparent",
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-10 py-4 font-bebas text-sm tracking-[0.15em] uppercase transition-all duration-300",
    variants[variant],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
