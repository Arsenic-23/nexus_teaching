'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TutorMessage, type MessageRole } from './tutor-message';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

const SUGGESTED_PROMPTS = [
  'Explain this concept in simpler terms',
  'Give me a real-world example',
  'What are common mistakes to avoid?',
  'Can you create a practice problem?',
];

interface TutorChatProps {
  topicContext?: string;
  initialMessages?: Message[];
  onSendMessage?: (message: string) => Promise<string>;
  className?: string;
}

export function TutorChat({
  topicContext,
  initialMessages = [],
  onSendMessage,
  className,
}: TutorChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: topicContext
        ? `Hi! I'm your AI tutor for **${topicContext}**. I'm here to help you understand concepts, work through problems, and answer any questions you have. What would you like to explore? 🎓`
        : "Hi! I'm your AI tutor. Ask me anything about your studies — I'll explain concepts, work through problems with you, and help you understand difficult topics. What's on your mind? 🎓",
      timestamp: new Date(),
    },
    ...initialMessages,
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (text?: string) => {
    const content = text || input.trim();
    if (!content || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
    };

    const loadingMsg: Message = {
      id: 'loading',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMsg, loadingMsg]);
    setInput('');
    setIsLoading(true);

    try {
      let response = '';
      if (onSendMessage) {
        response = await onSendMessage(content);
      } else {
        // Mock response for demo
        await new Promise((r) => setTimeout(r, 1200));
        response = `Great question! Let me explain that for you.\n\nThis is a mock response since the AI backend isn't connected yet. In a real scenario, I would provide a detailed, personalized explanation based on your question about "${content}".\n\nWould you like me to elaborate on any specific aspect?`;
      }

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== 'loading'),
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev.filter((m) => m.id !== 'loading'),
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: "Chat cleared. How can I help you?",
      timestamp: new Date(),
    }]);
  };

  return (
    <div className={cn('flex flex-col h-full bg-background rounded-xl border border-border overflow-hidden', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">Nexsori AI Tutor</p>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>
        </div>
        <Button size="icon-sm" variant="ghost" onClick={handleClear} title="Clear chat">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TutorMessage message={message} />
            </motion.div>
          ))}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Suggested prompts */}
      <AnimatePresence>
        {messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pb-2"
          >
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSend(prompt)}
                  className="text-xs px-3 py-1.5 rounded-full border border-border bg-secondary/50 hover:border-primary/40 hover:bg-primary/5 transition-all text-muted-foreground hover:text-foreground"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border bg-muted/50">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 min-h-[44px] max-h-[120px] resize-none text-sm"
            disabled={isLoading}
            rows={1}
          />
          <Button
            size="icon"
            onClick={() => handleSend()}
            disabled={!input.trim() || isLoading}
            variant="glow"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-1.5 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
