import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// Group tokens into logical Markdown blocks
function parseMarkdownIntoLogicalBlocks(markdown: string): string[] {
  const lines = markdown.split('\n');
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
        blocks.push(currentBlock.join('\n').trim());
        currentBlock = [];
      }
      
      if (trimmedLine) {
        currentBlock.push(line);
      } else if (currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n').trim());
        currentBlock = [];
      }
    } else {
      if (trimmedLine === '' && currentBlock.length > 0) {
        blocks.push(currentBlock.join('\n').trim());
        currentBlock = [];
      } else if (trimmedLine) {
        currentBlock.push(line);
      }
    }
  }

  if (currentBlock.length > 0) {
    blocks.push(currentBlock.join('\n').trim());
  }

  return blocks.filter(block => block.length > 0);
}

// Custom components using your design system
const MarkdownComponents = {
  h1: ({ children }: any) => (
    <h1 className="text-3xl font-bold text-foreground mb-4 mt-6 first:mt-0 border-b border-border pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-2xl font-semibold text-foreground mb-4 mt-5 first:mt-0">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-xl font-semibold text-foreground mb-3 mt-4 first:mt-0">
      {children}
    </h3>
  ),
  h4: ({ children }: any) => (
    <h4 className="text-lg font-medium text-foreground mb-2 mt-3 first:mt-0">
      {children}
    </h4>
  ),
  p: ({ children }: any) => (
    <p className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-1 ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside text-muted-foreground mb-4 space-y-1 ml-4">
      {children}
    </ol>
  ),
  li: ({ children }: any) => (
    <li className="leading-relaxed">{children}</li>
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
  thead: ({ children }: any) => (
    <thead className="bg-muted">
      {children}
    </thead>
  ),
  tbody: ({ children }: any) => (
    <tbody className="bg-card divide-y divide-border">
      {children}
    </tbody>
  ),
  tr: ({ children }: any) => (
    <tr className="hover:bg-muted/50 transition-colors">
      {children}
    </tr>

    
  ),
  th: ({ children }: any) => (
    <th className="px-6 py-3 text-left text-xs font-semibold text-foreground uppercase tracking-wider">
      {children}
    </th>
  ),
  td: ({ children }: any) => (
    <td className="px-6 py-4 text-sm text-muted-foreground">
      {children}
    </td>
  ),
  strong: ({ children }: any) => (
    <strong className="font-semibold text-foreground">
      {children}
    </strong>
  ),
  em: ({ children }: any) => (
    <em className="italic text-muted-foreground">{children}</em>
  ),
  a: ({ href, children }: any) => (
    <a 
      href={href} 
      className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary underline-offset-2 transition-colors"
      target="_blank" 
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  hr: () => (
    <hr className="border-0 border-t border-border my-4" />
  ),
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
    const blocks = useMemo(() => parseMarkdownIntoLogicalBlocks(content), [content]);

    return (
      <div className="prose max-w-none">
        {blocks.map((block, index) => (
          <MemoizedMarkdownBlock 
            content={block} 
            key={`${id}-block_${index}`} 
          />
        ))}
      </div>
    );
  }
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";