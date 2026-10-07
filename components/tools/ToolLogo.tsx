'use client';

import { useState } from 'react';
import { Monogram } from '@/components/directory/DirectoryUI';
import type { AITool } from '@/lib/tools/catalog';

export function ToolLogo({ tool }: { tool: Pick<AITool, 'name' | 'logo'> }) {
  const [failedSource, setFailedSource] = useState<string>();
  if (!tool.logo || failedSource === tool.logo) {
    return <Monogram name={tool.name} tone={tool.name.charCodeAt(0)} />;
  }
  return (
    <span
      className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-sm"
      style={{ colorScheme: 'light' }}
    >
      {/* Local brand assets include SVG and ICO files, served without transformation. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tool.logo}
        alt={`${tool.name} logo`}
        width={40}
        height={40}
        loading="lazy"
        decoding="async"
        className="h-10 w-10 object-contain"
        onError={() => setFailedSource(tool.logo)}
      />
    </span>
  );
}
