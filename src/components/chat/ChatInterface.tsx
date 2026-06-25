"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import { getResponse, getWelcomeOptions, type ChatOption } from "@/lib/chatbot";

interface Message {
  role: "user" | "assistant";
  content: string;
  options?: ChatOption[];
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function sendMessage(text: string) {
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      const assistantMessage: Message = {
        role: "assistant",
        content: response.text,
        options: response.options,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 400 + Math.random() * 400);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
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
      handleSubmit(e);
    }
  }

  const welcomeOptions = getWelcomeOptions();
  const lastAssistantMessage = [...messages].reverse().find((m) => m.role === "assistant");

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col">
      <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-oxford">
                <span className="font-cormorant text-2xl font-bold text-white">C</span>
              </div>
              <h2 className="font-cormorant text-2xl text-oxford">
                Crestline Advisor
              </h2>
              <p className="mt-3 max-w-md font-body text-sm text-oxford/50">
                Get instant answers about our services, team, market insights,
                and the real estate process. Choose a topic or type your question.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-2">
                {welcomeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className="rounded-lg border border-mercury/40 px-5 py-2.5 font-body text-sm text-oxford/60 transition-colors duration-300 hover:border-oxford/30 hover:bg-oxford/5 hover:text-oxford"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message, i) => (
            <div key={i}>
              <div
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
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
                  <FormattedText text={message.content} />
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
                        className="rounded-lg border border-mercury/40 px-4 py-2 font-body text-xs text-oxford/60 transition-colors duration-300 hover:border-oxford/30 hover:bg-oxford/5 hover:text-oxford"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start">
              <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-oxford">
                <span className="font-cormorant text-xs font-bold text-white">C</span>
              </div>
              <div className="rounded-2xl bg-bone px-5 py-3.5">
                <div className="flex gap-1.5">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-oxford/30 [animation-delay:0ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-oxford/30 [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-oxford/30 [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="border-t border-mercury/30 bg-white p-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a question or choose an option above..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-mercury/40 bg-bone/50 px-4 py-3 font-body text-sm text-oxford outline-none placeholder:text-oxford/30 focus:border-oxford"
            style={{ maxHeight: "120px" }}
          />
          <button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-oxford text-white transition-colors duration-300 hover:bg-oxford-light disabled:opacity-40"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}

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

        return (
          <div key={i} dangerouslySetInnerHTML={{ __html: formatted }} />
        );
      })}
    </div>
  );
}
