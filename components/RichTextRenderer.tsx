import React from "react";

interface RichTextRendererProps {
  content: string;
  className?: string;
}

export function RichTextRenderer({ content, className = "" }: RichTextRendererProps) {
  if (!content) return null;

  // Split text into paragraphs/lines
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];

  let currentList: { type: "ul" | "ol"; items: string[] } | null = null;

  const flushList = () => {
    if (!currentList) return;
    if (currentList.type === "ul") {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-3 space-y-1.5 pl-6 list-disc text-slate-800 text-lg leading-relaxed">
          {currentList.items.map((item, idx) => (
            <li key={idx}>{parseInlineFormatting(item)}</li>
          ))}
        </ul>
      );
    } else {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-3 space-y-1.5 pl-6 list-decimal text-slate-800 text-lg leading-relaxed">
          {currentList.items.map((item, idx) => (
            <li key={idx}>{parseInlineFormatting(item)}</li>
          ))}
        </ol>
      );
    }
    currentList = null;
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Header 1 (# Header)
    if (trimmed.startsWith("# ")) {
      flushList();
      elements.push(
        <h1 key={index} className="mt-8 mb-4 text-3xl font-extrabold text-slate-900 border-b border-slate-200 pb-2">
          {parseInlineFormatting(trimmed.slice(2))}
        </h1>
      );
      return;
    }

    // Header 2 (## Header)
    if (trimmed.startsWith("## ")) {
      flushList();
      elements.push(
        <h2 key={index} className="mt-6 mb-3 text-2xl font-bold text-slate-900">
          {parseInlineFormatting(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    // Header 3 (### Header)
    if (trimmed.startsWith("### ")) {
      flushList();
      elements.push(
        <h3 key={index} className="mt-5 mb-2 text-xl font-bold text-emerald-800">
          {parseInlineFormatting(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    // Blockquote (> Quote)
    if (trimmed.startsWith("> ")) {
      flushList();
      elements.push(
        <blockquote key={index} className="my-4 border-l-4 border-emerald-500 bg-emerald-50/70 p-4 rounded-r-xl italic text-slate-800 text-lg shadow-sm">
          {parseInlineFormatting(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    // Unordered List Bullet (- Item, * Item, • Item)
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ") || trimmed.startsWith("• ")) {
      const itemText = trimmed.replace(/^[-*•]\s+/, "");
      if (!currentList || currentList.type !== "ul") {
        flushList();
        currentList = { type: "ul", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      return;
    }

    // Ordered List Numbered (1. Item, 2. Item)
    if (/^\d+\.\s+/.test(trimmed)) {
      const itemText = trimmed.replace(/^\d+\.\s+/, "");
      if (!currentList || currentList.type !== "ol") {
        flushList();
        currentList = { type: "ol", items: [itemText] };
      } else {
        currentList.items.push(itemText);
      }
      return;
    }

    // Regular Paragraph
    flushList();
    elements.push(
      <p key={index} className="my-3 text-lg leading-relaxed text-slate-800">
        {parseInlineFormatting(trimmed)}
      </p>
    );
  });

  flushList();

  return <div className={`space-y-1 ${className}`}>{elements}</div>;
}

function parseInlineFormatting(text: string): React.ReactNode {
  // Regex to match **bold**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, idx) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={idx} className="font-bold text-slate-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
