"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  Suspense,
} from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "@/lib/gsap-init";
import { cn } from "@/lib/utils";
import { getResponse, getWelcomeOptions, type ChatOption } from "@/lib/chatbot";
import { GenerativeScene } from "./GenerativeScene";
import { StreamingText } from "./StreamingText";
import { ParticleOrbitLoader } from "./ParticleOrbitLoader";

interface Message {
  role: "user" | "assistant";
  content: string;
  options?: ChatOption[];
  isStreaming?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

// ---------------------------------------------------------------------------
// Animated Message Wrapper
// ---------------------------------------------------------------------------

function AnimatedMessage({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.from(ref.current, {
        x: role === "user" ? 30 : -30,
        opacity: 0,
        duration: 0.4,
        ease: "power3.out",
      });
    },
    { scope: ref }
  );

  return <div ref={ref}>{children}</div>;
}

// ---------------------------------------------------------------------------
// Glow Input Bar
// ---------------------------------------------------------------------------

function GlowInputBar({
  value,
  onChange,
  onSubmit,
  onKeyDown,
  disabled,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  placeholder: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [expanded, setExpanded] = useState(false);
  const throttleRef = useRef<number | null>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const sh = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.min(sh, 104)}px`;
    }
  }, [value]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!throttleRef.current && containerRef.current) {
      throttleRef.current = window.setTimeout(() => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          setMousePos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          });
        }
        throttleRef.current = null;
      }, 40);
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const ripple: Ripple = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
      };
      setRipples((prev) => [...prev.slice(-4), ripple]);
      setTimeout(
        () => setRipples((prev) => prev.filter((r) => r.id !== ripple.id)),
        600
      );
    }
  }, []);

  const isDisabled = disabled || !value.trim();
  const handleFocus = () => setExpanded(true);
  const handleBlur = () => {
    if (!value.trim()) setTimeout(() => setExpanded(false), 150);
  };

  const glassClasses =
    "relative overflow-hidden bg-gradient-to-r from-white/[0.08] via-white/[0.12] to-white/[0.08] backdrop-blur-2xl";

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
      className={cn(
        "mx-auto flex items-center gap-3 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        expanded ? "w-full max-w-4xl" : "w-80 max-w-80 sm:w-96"
      )}
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onClick={(e) => {
          handleClick(e);
          if (!expanded) {
            setExpanded(true);
            setTimeout(() => textareaRef.current?.focus(), 100);
          }
        }}
        className={cn(
          "group flex-1 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          glassClasses,
          expanded
            ? "rounded-3xl p-3 px-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
            : "cursor-pointer rounded-full p-2 px-5 shadow-[0_2px_4px_rgba(0,0,0,0.06)]"
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
          style={{ boxShadow: "0 0 0 1px rgba(14,26,54,0.08), 0 0 8px rgba(14,26,54,0.06), 0 0 20px rgba(200,204,209,0.08)" }}
        />
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-20 group-focus-within:opacity-20"
          style={{ background: `radial-gradient(circle 120px at ${mousePos.x}% ${mousePos.y}%, rgba(14,26,54,0.06) 0%, rgba(200,204,209,0.04) 40%, transparent 70%)` }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-30 group-focus-within:opacity-30">
          <div
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent group-hover:translate-x-full"
            style={{ transitionProperty: "transform", transitionDuration: "1500ms", transitionTimingFunction: "ease-out" }}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-r from-oxford/[0.02] via-mercury/[0.03] to-oxford/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100" />
        <div className="pointer-events-none absolute inset-0 animate-pulse rounded-[inherit] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-25 group-focus-within:opacity-25" />
        {ripples.map((r) => (
          <div key={r.id} className="pointer-events-none absolute" style={{ left: r.x - 25, top: r.y - 25, width: 50, height: 50 }}>
            <div className="h-full w-full animate-ping rounded-full bg-gradient-to-r from-oxford/[0.08] via-mercury/[0.06] to-oxford/[0.08]" />
          </div>
        ))}
        {!expanded && (
          <span className="relative z-10 flex-1 select-none py-1.5 font-body text-sm text-oxford/40">{placeholder}</span>
        )}
        {expanded && (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            rows={1}
            disabled={disabled}
            className="relative z-10 max-h-[104px] min-h-[36px] w-full flex-1 resize-none bg-transparent px-3 py-2 font-body text-sm text-oxford outline-none placeholder:text-oxford/30"
            style={{ lineHeight: "22px" }}
          />
        )}
      </div>
      <button
        type="submit"
        disabled={isDisabled}
        aria-label="Send message"
        className={cn(
          "group relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full transition-all duration-300",
          glassClasses,
          isDisabled ? "cursor-not-allowed opacity-50" : "hover:shadow-[0_0_0_1px_rgba(14,26,54,0.1),0_0_12px_rgba(14,26,54,0.06)]"
        )}
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.06)" }}
      >
        <div className="pointer-events-none absolute inset-0 rounded-full bg-oxford/[0.06] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className={cn("relative z-10 transition-colors duration-200", isDisabled ? "text-oxford/30" : "text-oxford/70")}>
          <path d="M16 22L16 10M16 10L11 15M16 10L21 15" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}

// ---------------------------------------------------------------------------
// Main Chat Interface
// ---------------------------------------------------------------------------

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const welcomeHeadingRef = useRef<HTMLHeadingElement>(null);
  const welcomeEyebrowRef = useRef<HTMLParagraphElement>(null);
  const welcomeDescRef = useRef<HTMLParagraphElement>(null);
  const welcomeButtonsRef = useRef<HTMLDivElement>(null);

  // Welcome state GSAP animation
  useGSAP(
    () => {
      if (!welcomeRef.current || !welcomeHeadingRef.current || messages.length > 0) return;

      const tl = gsap.timeline({ delay: 0.3 });

      if (welcomeEyebrowRef.current) {
        tl.fromTo(
          welcomeEyebrowRef.current,
          { clipPath: "inset(0 100% 0 0)", opacity: 0 },
          { clipPath: "inset(0 0% 0 0)", opacity: 1, duration: 0.8, ease: "power2.out" },
          0
        );
      }

      const split = SplitText.create(welcomeHeadingRef.current, { type: "chars,words" });
      tl.from(split.chars, {
        y: 60,
        opacity: 0,
        filter: "blur(8px)",
        stagger: 0.03,
        duration: 1,
        ease: "power4.out",
      }, 0.15);

      if (welcomeDescRef.current) {
        tl.from(welcomeDescRef.current, {
          opacity: 0, y: 20, filter: "blur(4px)", duration: 0.8, ease: "power3.out",
        }, "-=0.5");
      }

      if (welcomeButtonsRef.current) {
        const buttons = welcomeButtonsRef.current.querySelectorAll("button");
        tl.from(buttons, {
          y: 20, opacity: 0, stagger: 0.08, duration: 0.5, ease: "power3.out",
        }, "-=0.3");
      }

      return () => split.revert();
    },
    { scope: welcomeRef, dependencies: [messages.length] }
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function simulateStreaming(responseText: string, responseOptions?: ChatOption[]) {
    const words = responseText.split(/(\s+)/);
    let accumulated = "";
    let wordIndex = 0;

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: "", isStreaming: true },
    ]);

    const interval = setInterval(() => {
      if (wordIndex >= words.length) {
        clearInterval(interval);
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];
          if (last.role === "assistant") {
            last.isStreaming = false;
            last.options = responseOptions;
          }
          return [...updated];
        });
        setIsTyping(false);
        return;
      }

      accumulated += words[wordIndex];
      wordIndex++;

      setMessages((prev) => {
        const updated = [...prev];
        const last = updated[updated.length - 1];
        if (last.role === "assistant") {
          last.content = accumulated;
        }
        return [...updated];
      });
    }, 40);
  }

  function sendMessage(text: string) {
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      simulateStreaming(response.text, response.options);
    }, 300 + Math.random() * 300);
  }

  function handleSubmit() {
    const text = input.trim();
    if (!text || isTyping) return;
    setInput("");
    sendMessage(text);
  }

  function handleOptionClick(option: ChatOption) {
    if (isTyping) return;
    sendMessage(option.value);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  const welcomeOptions = getWelcomeOptions();
  const hasMessages = messages.length > 0;

  return (
    <div className="flex h-full flex-col">
      <div className="relative flex-1 overflow-y-auto">
        {!hasMessages && (
          <div className="absolute inset-0 z-0">
            <Suspense fallback={null}>
              <GenerativeScene />
            </Suspense>
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
          </div>
        )}

        <div className="relative z-10 px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {/* Welcome State — GSAP animated */}
            {!hasMessages && (
              <div ref={welcomeRef} className="flex flex-col items-center justify-end pb-12 pt-[40vh] text-center">
                <div>
                  <p ref={welcomeEyebrowRef} className="font-bebas text-xs uppercase tracking-[0.2em] text-mercury">
                    AI-Powered Advisory
                  </p>
                  <h2 ref={welcomeHeadingRef} className="mt-3 text-3xl text-oxford sm:text-4xl md:text-5xl">
                    <span className="font-cormorant">Ask </span>
                    <span className="font-bebas">CRESTLINE.</span>
                  </h2>
                  <p ref={welcomeDescRef} className="mx-auto mt-4 max-w-md font-body text-sm text-oxford/50">
                    Get instant answers about our services, team, market
                    insights, and the real estate process.
                  </p>
                </div>

                <div ref={welcomeButtonsRef} className="mt-8 flex flex-wrap justify-center gap-2">
                  {welcomeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleOptionClick(option)}
                      className="rounded-full border border-mercury/40 bg-white/80 px-5 py-2.5 font-body text-sm text-oxford/60 backdrop-blur-sm transition-all duration-300 hover:border-oxford/30 hover:bg-white hover:text-oxford"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Bubbles — with entrance animations */}
            {messages.map((message, i) => (
              <AnimatedMessage key={i} role={message.role}>
                <div className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                  {message.role === "assistant" && (
                    <div className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oxford">
                      <span className="font-cormorant text-xs font-bold text-white">C</span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed sm:max-w-[75%]",
                      message.role === "user"
                        ? "bg-oxford font-body text-white"
                        : "bg-bone font-body text-oxford"
                    )}
                  >
                    {message.role === "assistant" && message.isStreaming ? (
                      <StreamingText text={message.content} isStreaming={true} />
                    ) : (
                      <FormattedText text={message.content} />
                    )}
                  </div>
                </div>

                {message.role === "assistant" &&
                  message.options &&
                  i === messages.length - 1 &&
                  !isTyping && (
                    <div className="ml-11 mt-3 flex flex-wrap gap-2">
                      {message.options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleOptionClick(option)}
                          className="rounded-full border border-mercury/40 px-4 py-2 font-body text-xs text-oxford/60 transition-all duration-300 hover:border-oxford/30 hover:bg-oxford/5 hover:text-oxford"
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  )}
              </AnimatedMessage>
            ))}

            {/* Typing Indicator — particle orbit */}
            {isTyping && !messages.some((m) => m.isStreaming) && (
              <AnimatedMessage role="assistant">
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oxford">
                    <span className="font-cormorant text-xs font-bold text-white">C</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 rounded-2xl bg-bone px-5 py-3.5">
                    <ParticleOrbitLoader size={80} />
                    <span className="font-body text-xs text-oxford/40">Thinking...</span>
                  </div>
                </div>
              </AnimatedMessage>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      <div className="bg-white/80 p-4 backdrop-blur-sm">
        <GlowInputBar
          value={input}
          onChange={setInput}
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          disabled={isTyping}
          placeholder="Ask anything..."
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Formatted Text
// ---------------------------------------------------------------------------

function FormattedText({ text }: { text: string }) {
  const lines = text.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-2" />;

        const formatted = line
          .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold">$1</strong>')
          .replace(/^• /, "");

        const isBullet = line.trimStart().startsWith("• ");

        if (isBullet) {
          return (
            <div key={i} className="flex items-start gap-2 pl-1">
              <span className="mt-2 block h-1 w-1 shrink-0 rounded-full bg-current opacity-40" />
              <span dangerouslySetInnerHTML={{ __html: formatted }} />
            </div>
          );
        }

        return <div key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
      })}
    </div>
  );
}
