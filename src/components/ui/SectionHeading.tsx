import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-16",
        align === "center" && "text-center",
        align === "left" && "text-left"
      )}
    >
      {eyebrow && (
        <p
          className="mb-4 font-bebas text-sm uppercase tracking-[0.2em] text-mercury"
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-4xl leading-tight sm:text-5xl md:text-6xl",
          dark ? "text-white" : "text-oxford"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mx-auto mt-6 max-w-2xl font-body text-[17px] leading-relaxed",
            dark ? "text-platinum/80" : "text-oxford/60",
            align === "left" && "mx-0"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
