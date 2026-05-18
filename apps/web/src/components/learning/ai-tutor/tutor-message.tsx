import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bot } from 'lucide-react';

export type MessageRole = 'user' | 'assistant' | 'system';

interface TutorMessageProps {
  message: {
    id: string;
    role: MessageRole;
    content: string;
    timestamp?: Date;
    isLoading?: boolean;
  };
  className?: string;
}

export function TutorMessage({ message, className }: TutorMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3',
        isUser ? 'flex-row-reverse' : 'flex-row',
        className,
      )}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-lg bg-gradient-brand flex items-center justify-center shrink-0 mt-1">
          <Bot className="w-4 h-4 text-white" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
          isUser
            ? 'bg-primary text-primary-foreground rounded-tr-sm'
            : 'bg-card border border-border text-foreground rounded-tl-sm',
        )}
      >
        {message.isLoading ? (
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:150ms]" />
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:300ms]" />
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{message.content}</p>
        )}
        {message.timestamp && (
          <p className={cn(
            'text-[10px] mt-1',
            isUser ? 'text-primary-foreground/60 text-right' : 'text-muted-foreground',
          )}>
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  );
}
