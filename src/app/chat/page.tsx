import type { Metadata } from "next";
import { ChatInterface } from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "AI Advisor",
  description:
    "Chat with our AI real estate advisor powered by Claude. Get instant answers about buying, selling, and commercial real estate.",
};

export default function ChatPage() {
  return (
    <div className="pt-20">
      <ChatInterface />
    </div>
  );
}
