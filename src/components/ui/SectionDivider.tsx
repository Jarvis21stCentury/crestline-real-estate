import { cn } from "@/lib/utils";

export function SectionDivider({ dark = false }: { dark?: boolean }) {
  return (
    <hr
      className={cn(
        "border-0 border-t",
        dark ? "border-mercury/20" : "border-mercury/40"
      )}
    />
  );
}
