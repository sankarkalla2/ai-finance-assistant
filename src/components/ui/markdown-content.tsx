import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown, { Options } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ComponentProps, HTMLAttributes } from "react";
import hardenReactMarkdown from "harden-react-markdown";
import { cn } from "@/lib/utils";

// Group tokens into logical Markdown blocks
function parseMarkdownIntoLogicalBlocks(markdown: string): string[] {
  const lines = markdown.split("\n");
  const blocks: string[] = [];
  let currentBlock: string[] = [];
  let inTable = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    const isTableSeparator = /^\s*\|[\s\-\|:]+\|\s*$/.test(line);
    const isTableRow = /^\s*\|.*\|\s*$/.test(line);

    if (isTableSeparator || (isTableRow && !inTable)) {
      inTable = true;
      currentBlock.push(line);
    } else if (inTable && isTableRow) {
      currentBlock.push(line);
    } else if (inTable && !isTableRow) {
      inTable = false;
      if (currentBlock.length > 0) {
        blocks.push(currentBlock.join("\n").trim());
        currentBlock = [];
      }

      if (trimmedLine) {
        currentBlock.push(line);
      } else if (currentBlock.length > 0) {
        blocks.push(currentBlock.join("\n").trim());
        currentBlock = [];
      }
    } else {
      if (trimmedLine === "" && currentBlock.length > 0) {
        blocks.push(currentBlock.join("\n").trim());
        currentBlock = [];
      } else if (trimmedLine) {
        currentBlock.push(line);
      }
    }
  }

  if (currentBlock.length > 0) {
    blocks.push(currentBlock.join("\n").trim());
  }

  return blocks.filter((block) => block.length > 0);
}

export type ResponseProps = HTMLAttributes<HTMLDivElement> & {
  options?: Options;
  children: Options["children"];
  allowedImagePrefixes?: ComponentProps<
    ReturnType<typeof hardenReactMarkdown>
  >["allowedImagePrefixes"];
  allowedLinkPrefixes?: ComponentProps<
    ReturnType<typeof hardenReactMarkdown>
  >["allowedLinkPrefixes"];
  defaultOrigin?: ComponentProps<
    ReturnType<typeof hardenReactMarkdown>
  >["defaultOrigin"];
  parseIncompleteMarkdown?: boolean;
};
// Custom components using your design system
const MarkdownComponents: Options["components"] = {
  ol: ({ node, children, className, ...props }) => (
    <ol className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({ node, children, className, ...props }) => (
    <li className={cn("py-1", className)} {...props}>
      {children}
    </li>
  ),
  ul: ({ node, children, className, ...props }) => (
    <ul className={cn("ml-4 list-outside list-decimal", className)} {...props}>
      {children}
    </ul>
  ),
  strong: ({ node, children, className, ...props }) => (
    <span className={cn("font-semibold", className)} {...props}>
      {children}
    </span>
  ),
  a: ({ node, children, className, ...props }) => (
    <a
      className={cn("font-medium text-primary underline", className)}
      rel="noreferrer"
      target="_blank"
      {...props}
    >
      {children}
    </a>
  ),
  h1: ({ node, children, className, ...props }) => (
    <h1
      className={cn("mt-6 mb-2 font-semibold text-3xl", className)}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ node, children, className, ...props }) => (
    <h2
      className={cn("mt-6 mb-2 font-semibold text-2xl", className)}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ node, children, className, ...props }) => (
    <h3 className={cn("mt-6 mb-2 font-semibold text-xl", className)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ node, children, className, ...props }) => (
    <h4 className={cn("mt-6 mb-2 font-semibold text-lg", className)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ node, children, className, ...props }) => (
    <h5
      className={cn("mt-6 mb-2 font-semibold text-base", className)}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({ node, children, className, ...props }) => (
    <h6 className={cn("mt-6 mb-2 font-semibold text-sm", className)} {...props}>
      {children}
    </h6>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-muted text-muted-foreground italic rounded-r">
      {children}
    </blockquote>
  ),
  code: ({ inline, children }: any) => {
    if (inline) {
      return (
        <code className="bg-muted text-foreground px-1.5 py-0.5 rounded-sm text-sm font-mono border">
          {children}
        </code>
      );
    }
    return (
      <code className="block bg-muted text-foreground p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4 border">
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => (
    <pre className="bg-muted text-foreground p-4 rounded-lg overflow-x-auto font-mono text-sm mb-4 border">
      {children}
    </pre>
  ),
  table: ({ children }: any) => (
    <div className="overflow-x-auto mb-6">
      <table className="min-w-full border border-border rounded-lg overflow-hidden shadow-sm">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }: any) => <thead className="bg-muted">{children}</thead>,
  tbody: ({ children }: any) => (
    <tbody className="bg-card divide-y divide-border">{children}</tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="hover:bg-muted/50 transition-colors">{children}</tr>
  ),
  th: ({ children }: any) => (
    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4 text-sm text-muted-foreground">{children}</td>
  ),
 
  em: ({ children }: any) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  link: ({ href, children }: any) => (
    <a
      href={href}
      className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary underline-offset-2 transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="border-0 border-t border-border my-4" />,
};

// Memoized Markdown block renderer
const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={MarkdownComponents}
      >
        {content}
      </ReactMarkdown>
    );
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

// Main component
export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(
      () => parseMarkdownIntoLogicalBlocks(content),
      [content]
    );

    return (
      <div className="prose max-w-none">
        {blocks.map((block, index) => (
          <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
        ))}
      </div>
    );
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
