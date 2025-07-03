"use client";

import { ChatRequestOptions, JSONValue, Message, UIMessage } from "ai";
import { useEffect, useMemo, useState } from "react";
import { MemoizedMarkdown } from "../../../components/ui/markdown-content";
import { AvatarProvider } from "@/components/avatar";

interface ChatSection {
  id: string;
  userMessage: Message;
  assistantMessages: Message[];
}

interface ChatMessagesProps {
  sections: ChatSection[]; // Changed from messages to sections
  data: JSONValue[] | undefined;
  onQuerySelect: (query: string) => void;
  isLoading: boolean;
  chatId?: string;
  addToolResult?: (params: { toolCallId: string; result: any }) => void;
  /** Ref for the scroll container */
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onUpdateMessage?: (messageId: string, newContent: string) => Promise<void>;
  reload?: (
    messageId: string,
    options?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  messages: UIMessage[];
  userImgUrl: string | null | undefined;
  userName?: string;
}

export function ChatMessages({
  sections,
  data,
  onQuerySelect,
  isLoading,
  chatId,
  addToolResult,
  scrollContainerRef,
  onUpdateMessage,
  reload,
  messages,
  userImgUrl,
  userName,
}: ChatMessagesProps) {
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({});
  const manualToolCallId = "manual-tool-call";

  useEffect(() => {
    // Open manual tool call when the last section is a user message
    if (sections.length > 0) {
      const lastSection = sections[sections.length - 1];
      if (lastSection.userMessage.role === "user") {
        setOpenStates({ [manualToolCallId]: true });
      }
    }
  }, [sections]);

  // get last tool data for manual tool call
  const lastToolData = useMemo(() => {
    if (!data || !Array.isArray(data) || data.length === 0) return null;

    const lastItem = data[data.length - 1] as {
      type: "tool_call";
      data: {
        toolCallId: string;
        state: "call" | "result";
        toolName: string;
        args: string;
      };
    };

    if (lastItem.type !== "tool_call") return null;

    const toolData = lastItem.data;
    return {
      state: "call" as const,
      toolCallId: toolData.toolCallId,
      toolName: toolData.toolName,
      args: toolData.args ? JSON.parse(toolData.args) : undefined,
    };
  }, [data]);

  if (!sections.length) return null;

  // Get all messages as a flattened array
  const allMessages = sections.flatMap((section) => [
    section.userMessage,
    ...section.assistantMessages,
  ]);

  const lastUserIndex =
    allMessages.length -
    1 -
    [...allMessages].reverse().findIndex((msg) => msg.role === "user");

  // Check if loading indicator should be shown
  const showLoading =
    isLoading &&
    sections.length > 0 &&
    sections[sections.length - 1].assistantMessages.length === 0;

  const getIsOpen = (id: string) => {
    if (id.includes("call")) {
      return openStates[id] ?? true;
    }
    const baseId = id.endsWith("-related") ? id.slice(0, -8) : id;
    const index = allMessages.findIndex((msg) => msg.id === baseId);
    return openStates[id] ?? index >= lastUserIndex;
  };

  const handleOpenChange = (id: string, open: boolean) => {
    setOpenStates((prev) => ({
      ...prev,
      [id]: open,
    }));
  };

  if (!messages.length) return null;

  return (
    <div className="relative size-full pt-14 flex-1 overflow-y-auto">
      <div
        className="relative mx-auto w-full max-w-3xl px-4"
        ref={scrollContainerRef}
      >
        {messages.map((message, idx) => (
          <div
            key={idx}
            className="mb-4 flex gap-x-2 items-start justify-start rounded-md leading-7 [&:not(:first-child)]:mt-6"
          >
            <span>
              {message.role === "user" ? (
                <AvatarProvider
                  imgUrl={`${userImgUrl}`}
                  fallbackName={userName || "N"}
                />
              ) : (
                <AvatarProvider
                  imgUrl="https://github.com/evilrabbit.png"
                  fallbackName="AI"
                />
              )}
            </span>
            <div>
              <MemoizedMarkdown content={message.content} id={idx.toString()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
