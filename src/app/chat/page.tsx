import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "AI Advisor",
  description:
    "Chat with our AI real estate advisor powered by Claude. Get instant answers about buying, selling, and commercial real estate.",
};

export default function ChatPage() {
  return (
    <div className="fixed inset-0 top-[72px] z-30 flex flex-col bg-white">
      <ChatInterface />
    </div>
  );
}
