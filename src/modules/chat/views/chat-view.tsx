"use client";

// import { CHAT_ID } from "@/lib/constants";
// import { Model } from "@/lib/types/models";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ChatRequestOptions } from "ai";
import { Message } from "ai/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { ChatPanel } from "./chat-panel";
import { ChatMessages } from "./chat-messages";
import { useChatView } from "../hooks/useChatView";

// Define section structure
interface ChatSection {
  id: string; // User message ID
  userMessage: Message;
  assistantMessages: Message[];
}

export function Chat({
  id,
  savedMessages = [],
  query,
  userImgUrl
}: {
  id: string;
  savedMessages?: Message[];
  query?: string
  userImgUrl: string | undefined | null
}) {
  const {
    messages,
    onSubmit,
    scrollContainerRef,
    sections,
    data,
    onQuerySelect,
    isLoading,
    addToolResult,
    handleUpdateAndReloadMessage,
    handleReloadFrom,
    input,
    handleInputChange,
    setMessages,
    append,
    isAtBottom,
    stop,
  } = useChatView(savedMessages, id);

  return (
    <div
      className={cn(
        "relative flex h-full min-w-0 flex-1 flex-col",
        messages.length === 0 ? "items-center justify-center" : ""
      )}
      data-testid="full-chat"
    >
      <ChatMessages
        sections={sections}
        data={data}
        onQuerySelect={onQuerySelect}
        isLoading={isLoading}
        chatId={id}
        addToolResult={addToolResult}
        scrollContainerRef={scrollContainerRef}
        onUpdateMessage={handleUpdateAndReloadMessage}
        reload={handleReloadFrom}
        messages={messages}
        userImgUrl={userImgUrl}

      />

      <ChatPanel
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={onSubmit}
        isLoading={isLoading}
        messages={messages}
        setMessages={setMessages}
        stop={stop}
        query={query}
        append={append}
        showScrollToBottomButton={!isAtBottom}
        scrollContainerRef={scrollContainerRef}
      />
    </div>
  );
}
