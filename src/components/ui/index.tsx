// shadcn/ui-style primitives (server-safe). Interactive Radix parts live in ./client.
//
// Every screen in the product — back office, both portals, the public site —
// is built from these, so this file is where the product's visual language
// actually lives. Three things it is deliberate about:
//
//   Size.    Controls are 40px tall, not 36px. 36px reads as a dense 2018
//            admin table; 40px is the current comfortable minimum and is also
//            closer to an honest touch target.
//   Depth.   Surfaces use the layered `--card-shadow` tokens rather than a
//            single hard shadow, so a card rests on the page instead of
//            floating above it.
//   Case.    Nothing is ALL-CAPS. Small uppercase labels were the old look's
//            signature; sentence case at a real weight reads better and is
//            what the portal design asked for anyway.
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export { cn };

// ── Button ─────────────────────────────────────────────
// `active:translate-y-px` is the whole press affordance: a 1px drop is enough
// to feel mechanical without animating layout. The focus ring is a soft wide
// halo rather than the browser outline, which the global focus-visible rule
// would otherwise draw square across these rounded corners.
const buttonVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-md",
    "text-sm font-semibold tracking-[-0.005em]",
    "transition-[background-color,border-color,color,box-shadow,transform] duration-150",
    "active:translate-y-px",
    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        // The coloured shadow is what makes a primary button read as raised
        // and clickable without a border.
        //
        // `btn-primary` carries no styles of its own — it is a hook, so a
        // theme can restyle its own primary buttons from one CSS rule instead
        // of every call site passing a className. The customer portal uses it
        // to paint them with the brand gradient; see globals.css. `bg-primary`
        // stays underneath it as the flat fallback.
        default:
          "btn-primary bg-primary text-white shadow-[0_1px_2px_rgba(11,18,32,0.08),0_8px_20px_-10px_var(--primary)] hover:bg-primary-hover hover:shadow-[0_1px_2px_rgba(11,18,32,0.1),0_12px_26px_-10px_var(--primary)]",
        outline:
          "border border-border bg-background text-foreground shadow-[0_1px_2px_rgba(11,18,32,0.04)] hover:border-primary/35 hover:bg-primary-soft/60 hover:text-primary",
        ghost: "text-muted hover:bg-surface hover:text-foreground",
        success: "bg-success text-white shadow-[0_8px_20px_-10px_var(--success)] hover:brightness-110",
        danger: "bg-danger text-white shadow-[0_8px_20px_-10px_var(--danger)] hover:brightness-110",
        "danger-outline":
          "border border-danger/35 bg-background text-danger hover:border-danger/60 hover:bg-danger-soft",
        link: "px-0 font-medium text-primary underline-offset-4 hover:underline active:translate-y-0",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 gap-1.5 px-3 text-[13px]",
        lg: "h-11 px-5 text-[15px]",
        icon: "size-9 p-0",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
export { buttonVariants };

// ── Card ───────────────────────────────────────────────
export function Card({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-xl border border-border bg-background shadow-card", className)} {...p} />;
}
export function CardHeader({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-between gap-3 border-b border-border px-5 py-4", className)} {...p} />;
}
export function CardTitle({ className, ...p }: React.ComponentProps<"h2">) {
  return <h2 className={cn("text-[15px] font-semibold text-foreground", className)} {...p} />;
}
export function CardContent({ className, ...p }: React.ComponentProps<"div">) {
  return <div className={cn("p-5", className)} {...p} />;
}

// ── Form controls ───────────────────────────────────────
// One shared string, so an input, a select and a textarea cannot drift apart.
// The focus state moves the border AND lays a soft ring: the border alone is
// a 1px change that people genuinely miss on a dense form.
const controlBase = [
  "w-full rounded-md border border-border bg-background text-sm text-foreground",
  "transition-[border-color,box-shadow,background-color] duration-150",
  "placeholder:text-muted/60",
  "focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/12",
  "disabled:cursor-not-allowed disabled:bg-surface disabled:text-muted",
  // An invalid field is marked on the field itself, not only by a message
  // underneath it. On a long form the message can be off-screen, or simply
  // not the thing the eye lands on — the red edge is what says "here".
  // Driven by aria-invalid so the visual state and the state screen readers
  // announce can never disagree: one attribute sets both.
  "aria-invalid:border-danger aria-invalid:ring-4 aria-invalid:ring-danger/12",
  "aria-invalid:focus:border-danger aria-invalid:focus:ring-danger/20",
].join(" ");

export const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(function Input({ className, ...p }, ref) {
  return <input ref={ref} className={cn(controlBase, "h-10 px-3", className)} {...p} />;
});

export function Textarea({ className, ...p }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(controlBase, "min-h-20 px-3 py-2.5 leading-relaxed", className)} {...p} />;
}

export function Select({ className, ...p }: React.ComponentProps<"select">) {
  return <select className={cn(controlBase, "h-10 px-2.5", className)} {...p} />;
}

export function Label({ className, ...p }: React.ComponentProps<"label">) {
  return <label className={cn("mb-1.5 block text-[13px] font-medium text-foreground", className)} {...p} />;
}

export function Field({
  label,
  hint,
  error,
  children,
  className,
  /** Set on the message so an input can point at it with aria-describedby. */
  errorId,
}: {
  label: string;
  hint?: React.ReactNode;
  /** Validation message. Replaces the hint while it is showing — two lines of
   *  small print under one field is how people miss the one that matters. */
  error?: string | null;
  children: React.ReactNode;
  className?: string;
  errorId?: string;
}) {
  return (
    <div className={className}>
      <Label>{label}</Label>
      {children}
      {error ? (
        // role="alert" so it is announced when it appears, not only on focus.
        <p id={errorId} role="alert" className="mt-1.5 text-xs font-medium leading-relaxed text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="mt-1.5 text-xs leading-relaxed text-muted">{hint}</p>
      )}
    </div>
  );
}

// ── Badge ───────────────────────────────────────────────
// Sentence case, and an inset ring instead of a border so a badge never grows
// by 2px relative to its neighbours.
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11.5px] font-semibold leading-5 whitespace-nowrap",
  {
    variants: {
      tone: {
        neutral: "bg-surface text-muted ring-1 ring-inset ring-border",
        blue: "bg-primary-soft text-primary ring-1 ring-inset ring-primary/15",
        green: "bg-success-soft text-success ring-1 ring-inset ring-success/15",
        orange: "bg-warning-soft text-warning ring-1 ring-inset ring-warning/15",
        red: "bg-danger-soft text-danger ring-1 ring-inset ring-danger/15",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);
export function Badge({ className, tone, ...p }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...p} />;
}

// ── Table ───────────────────────────────────────────────
export function Table({ className, ...p }: React.ComponentProps<"table">) {
  return (
    <div className="w-full overflow-x-auto">
      <table className={cn("w-full text-sm", className)} {...p} />
    </div>
  );
}
export function Th({ className, ...p }: React.ComponentProps<"th">) {
  return <th className={cn("border-b border-border bg-surface/70 px-4 py-3 text-left text-xs font-semibold text-muted", className)} {...p} />;
}
export function Td({ className, ...p }: React.ComponentProps<"td">) {
  return <td className={cn("border-b border-border px-4 py-3.5 align-middle", className)} {...p} />;
}

// ── Alert ───────────────────────────────────────────────
export function Alert({ tone = "blue", title, children, className }: { tone?: "blue" | "green" | "orange" | "red"; title?: string; children?: React.ReactNode; className?: string }) {
  const styles = {
    blue: "border-primary/20 bg-primary-soft text-foreground",
    green: "border-success/20 bg-success-soft text-foreground",
    orange: "border-warning/20 bg-warning-soft text-foreground",
    red: "border-danger/20 bg-danger-soft text-foreground",
  }[tone];
  return (
    <div role={tone === "red" ? "alert" : "status"} className={cn("rounded-lg border px-4 py-3.5 text-sm", styles, className)}>
      {title && <p className="font-semibold">{title}</p>}
      {children && <div className={cn(title && "mt-1", "text-[13px] leading-relaxed")}>{children}</div>}
    </div>
  );
}

// ── Misc ────────────────────────────────────────────────
export function Spinner({ className }: { className?: string }) {
  return <span className={cn("inline-block size-4 animate-spin rounded-full border-2 border-current border-r-transparent", className)} aria-hidden />;
}

export function EmptyState({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="text-[15px] font-semibold text-foreground">{title}</p>
      {children && <div className="mx-auto mt-1.5 max-w-sm text-sm leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
