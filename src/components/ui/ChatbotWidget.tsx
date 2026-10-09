"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../theme/ThemeProvider";
import { Bot, X, Send, Loader2, Sparkles, User, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
}

export function ChatbotWidget() {
  const { currentColorTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hi! I'm Prabhu's AI Assistant. Ask me anything about his skills, LAMP stack experience, or projects! 🚀",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await res.json();
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: data.reply || "I couldn't process that right now. Please try asking again!",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: "Connection error. Feel free to contact Prabhu directly at 0xdevprabhu@gmail.com!",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle AI Assistant"
        className="fixed bottom-20 sm:bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-primary/40"
        style={{
          backgroundColor: currentColorTheme.primary,
          boxShadow: `0 8px 25px ${currentColorTheme.primary}66`,
        }}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Bot className="h-5 w-5 transition-transform group-hover:rotate-12" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="AI Chat Assistant"
          className="fixed bottom-36 sm:bottom-20 right-4 sm:right-6 z-50 w-[92vw] sm:w-[380px] h-[480px] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-900 dark:text-slate-100 animate-slideUp"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 text-white"
            style={{ backgroundColor: currentColorTheme.primary }}
          >
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-full bg-white/20">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  <span>Prabhu&apos;s AI Assistant</span>
                  <Sparkles className="h-3 w-3" />
                </h4>
                <span className="text-[10px] text-white/80">Powered by Gemini AI</span>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/20 text-white transition-colors"
              aria-label="Minimize chat"
            >
              <Minimize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-slate-50/60 dark:bg-slate-950/60 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div
                    className="h-6 w-6 rounded-full flex items-center justify-center text-white shrink-0 text-xs"
                    style={{ backgroundColor: currentColorTheme.primary }}
                  >
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}

                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === "user"
                      ? "text-white rounded-tr-none shadow-xs"
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 rounded-tl-none text-slate-800 dark:text-slate-200 shadow-xs"
                  }`}
                  style={msg.sender === "user" ? { backgroundColor: currentColorTheme.primary } : {}}
                >
                  {msg.text}
                </div>

                {msg.sender === "user" && (
                  <div className="h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 shrink-0 text-xs">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2 items-center text-slate-400 text-xs">
                <div
                  className="h-6 w-6 rounded-full flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: currentColorTheme.primary }}
                >
                  <Bot className="h-3.5 w-3.5" />
                </div>
                <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about Prabhu..."
              className="flex-grow px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="p-2.5 rounded-xl text-white shadow-xs transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: currentColorTheme.primary }}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
