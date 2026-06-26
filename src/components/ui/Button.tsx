"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap-init";

type ButtonVariant = "primary" | "secondary" | "cta" | "ghost";

interface ButtonProps {
  variant?: ButtonVariant;
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  transitionType?: string;
  viewTransitionName?: string;
}

const variantBase: Record<ButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-oxford border border-oxford",
  cta: "text-oxford",
  ghost: "text-platinum",
};

const overlayBg: Record<ButtonVariant, string> = {
  primary: "bg-oxford/85 group-hover:bg-oxford/75",
  secondary: "bg-transparent",
  cta: "bg-bone/85 group-hover:bg-bone/75",
  ghost: "bg-transparent",
};

const rimColor: Record<ButtonVariant, string> = {
  primary: "rgba(255,255,255,0.5)",
  secondary: "rgba(14,26,54,0.25)",
  cta: "rgba(14,26,54,0.15)",
  ghost: "transparent",
};

const hasShader: Record<ButtonVariant, boolean> = {
  primary: true,
  secondary: false,
  cta: true,
  ghost: false,
};

const shadowIdle =
  "0px 0px 0px 1px rgba(14,26,54,0.12), 0px 2px 5px rgba(14,26,54,0.08), 0px 9px 9px rgba(14,26,54,0.06)";
const shadowHover =
  "0px 0px 0px 1px rgba(14,26,54,0.18), 0px 4px 4px rgba(14,26,54,0.08), 0px 8px 5px rgba(14,26,54,0.04)";
const shadowPressed =
  "0px 0px 0px 1px rgba(14,26,54,0.25), 0px 1px 2px rgba(14,26,54,0.15)";

const smoothEase = "cubic-bezier(0.22, 1, 0.36, 1)";
const springEase = "cubic-bezier(0.34, 1.56, 0.64, 1)";

interface Ripple {
  x: number;
  y: number;
  id: number;
}

let rippleCounter = 0;

function splitText(children: React.ReactNode): string[] | null {
  if (typeof children === "string") return children.split("");
  return null;
}

export function Button({
  variant = "primary",
  href,
  children,
  className,
  type = "button",
  onClick,
  transitionType,
  viewTransitionName,
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const elRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const shaderDivRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderMountRef = useRef<any>(null);
  const showShader = hasShader[variant];

  useEffect(() => {
    if (!showShader || !shaderDivRef.current) return;

    let mounted = true;

    const styleId = "shader-canvas-style";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `.shader-btn canvas { width:100%!important; height:100%!important; display:block!important; position:absolute!important; top:0!important; left:0!important; border-radius:9999px!important; }`;
      document.head.appendChild(style);
    }

    import("@paper-design/shaders").then(
      ({ liquidMetalFragmentShader, ShaderMount }) => {
        if (!mounted || !shaderDivRef.current) return;
        if (shaderMountRef.current?.destroy) shaderMountRef.current.destroy();

        shaderMountRef.current = new ShaderMount(
          shaderDivRef.current,
          liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.4
        );
      }
    );

    return () => {
      mounted = false;
      if (shaderMountRef.current?.destroy) {
        shaderMountRef.current.destroy();
        shaderMountRef.current = null;
      }
    };
  }, [showShader]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    shaderMountRef.current?.setSpeed?.(0.8);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setIsPressed(false);
    shaderMountRef.current?.setSpeed?.(0.4);
  }, []);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      const el = elRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const ripple: Ripple = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          id: rippleCounter++,
        };
        setRipples((prev) => [...prev, ripple]);
        setTimeout(
          () => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)),
          600
        );
      }

      if (transitionType && href) {
        const x = ((e.clientX / window.innerWidth) * 100).toFixed(1);
        const y = ((e.clientY / window.innerHeight) * 100).toFixed(1);
        document.documentElement.style.setProperty("--click-x", `${x}%`);
        document.documentElement.style.setProperty("--click-y", `${y}%`);
      }

      if (shaderMountRef.current?.setSpeed) {
        shaderMountRef.current.setSpeed(2.0);
        setTimeout(() => {
          shaderMountRef.current?.setSpeed?.(isHovered ? 0.8 : 0.4);
        }, 300);
      }

      onClick?.();
    },
    [onClick, isHovered]
  );

  const letters = splitText(children);

  const classes = cn(
    "group relative inline-flex items-center justify-center rounded-full px-10 py-4 font-bebas text-sm tracking-[0.15em] uppercase overflow-hidden",
    variantBase[variant],
    className
  );

  const transform = isPressed
    ? "scale(0.97) translateY(1px)"
    : "scale(1) translateY(0)";
  const boxShadow = isPressed
    ? shadowPressed
    : isHovered
      ? shadowHover
      : shadowIdle;

  const style: React.CSSProperties = {
    transform,
    boxShadow,
    transition: `transform 0.15s ${springEase}, box-shadow 0.15s ease`,
  };

  const innerContent = (
    <>
      {/* Layer 1: Liquid metal shader */}
      {showShader && (
        <div
          ref={shaderDivRef}
          className="shader-btn absolute inset-0 z-0 overflow-hidden rounded-full"
        />
      )}

      {/* Layer 2: Tinted overlay for readability */}
      <span
        className={cn(
          "absolute inset-0 z-[1] rounded-full transition-colors duration-300",
          overlayBg[variant]
        )}
      />

      {/* Layer 2.5: Shimmer sweep on hover */}
      <span className="absolute inset-0 z-[1] rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </span>

      {/* Layer 3: Rim light */}
      {variant !== "ghost" && (
        <span className="absolute inset-0 z-[2] overflow-hidden rounded-full">
          <span
            className="absolute inset-[-2px] animate-[rim-rotate_3s_linear_infinite]"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, transparent 70%, ${rimColor[variant]} 80%, transparent 90%, transparent 100%)`,
            }}
          />
          <span
            className={cn(
              "absolute inset-[1.5px] rounded-full",
              variant === "primary" && "bg-oxford",
              variant === "secondary" && "bg-white",
              variant === "cta" && "bg-bone"
            )}
          />
        </span>
      )}

      {/* Layer 4: Per-letter rolling text */}
      <span className="relative z-[3] flex items-center">
        {letters ? (
          letters.map((char, i) => (
            <span
              key={i}
              className="relative inline-block overflow-hidden"
              style={{ perspective: "600px" }}
            >
              {/* Front */}
              <span
                className="block transition-all duration-700 [backface-visibility:hidden] [transform-origin:center_bottom] group-hover:[transform:rotateX(-90deg)] group-hover:opacity-0"
                style={{
                  transitionTimingFunction: smoothEase,
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                {char === " " ? " " : char}
              </span>
              {/* Back */}
              <span
                className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-700 [backface-visibility:hidden] [transform-origin:center_top] [transform:rotateX(90deg)] group-hover:[transform:rotateX(0deg)] group-hover:opacity-100"
                style={{
                  transitionTimingFunction: smoothEase,
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                {char === " " ? " " : char}
              </span>
            </span>
          ))
        ) : (
          <span className="relative inline-block overflow-hidden" style={{ perspective: "600px" }}>
            <span
              className="block transition-all duration-700 [backface-visibility:hidden] [transform-origin:center_bottom] group-hover:[transform:rotateX(-90deg)] group-hover:opacity-0"
              style={{ transitionTimingFunction: smoothEase }}
            >
              {children}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-700 [backface-visibility:hidden] [transform-origin:center_top] [transform:rotateX(90deg)] group-hover:[transform:rotateX(0deg)] group-hover:opacity-100"
              style={{ transitionTimingFunction: smoothEase }}
            >
              {children}
            </span>
          </span>
        )}
      </span>

      {/* Layer 5: Click ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute z-[4] h-5 w-5 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}
    </>
  );

  const handlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: () => setIsPressed(true),
    onMouseUp: () => setIsPressed(false),
    onClick: handleClick,
  };

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const canHover = window.matchMedia("(hover: hover)").matches;
    if (!canHover) return;

    const xTo = gsap.quickTo(wrapper, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(wrapper, "y", { duration: 0.4, ease: "power3" });

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo(x * 0.35);
      yTo(y * 0.35);
    };

    const onLeave = () => {
      gsap.to(wrapper, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.3)" });
    };

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (href) {
    return (
      <div ref={wrapperRef} style={{ perspective: "800px" }} className="inline-block" data-cursor="pointer">
        <Link
          href={href}
          ref={elRef as React.Ref<HTMLAnchorElement>}
          className={classes}
          style={{ ...style, viewTransitionName: viewTransitionName || undefined }}
          {...(transitionType ? { transitionTypes: [transitionType] } : {})}
          {...handlers}
        >
          {innerContent}
        </Link>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ perspective: "800px" }} className="inline-block" data-cursor="pointer">
      <button
        type={type}
        ref={elRef as React.Ref<HTMLButtonElement>}
        className={classes}
        style={style}
        {...handlers}
      >
        {innerContent}
      </button>
    </div>
  );
}
