'use client';
import { useEffect, useRef, type ReactNode } from 'react';

export function DirectoryHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="directory-hero">
      <div className="relative">
        <p className="section-eyebrow mb-3">{eyebrow}</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-muted sm:text-base">
          {description}
        </p>
      </div>
      {children && (
        <div className="relative mt-6 flex flex-wrap gap-3">{children}</div>
      )}
    </section>
  );
}
export function DirectorySearch({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('focus') === 'search')
      ref.current?.focus();
  }, []);
  return (
    <label className="directory-search">
      <span className="sr-only">{placeholder}</span>
      <span aria-hidden="true" className="text-accent">
        ⌕
      </span>
      <input
        ref={ref}
        id="site-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none"
      />
    </label>
  );
}
export function DirectorySelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <label className="flex min-w-0 flex-col gap-2 text-xs font-medium text-fg-muted">
      {label}
      <select
        className="directory-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
export const selectOptions = (values: string[], all: string) => [
  { value: '', label: all },
  ...values.map((value) => ({ value, label: value })),
];
export function DirectoryEmpty({
  onReset,
  message = 'Try another search or clear your filters.',
}: {
  onReset?: () => void;
  message?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center">
      <h2 className="text-xl font-semibold">No matches yet</h2>
      <p className="mt-2 text-sm text-fg-muted">{message}</p>
      {onReset && (
        <button className="directory-button mt-5" onClick={onReset}>
          Reset filters
        </button>
      )}
    </div>
  );
}
export function Monogram({ name, tone = 0 }: { name: string; tone?: number }) {
  const initials = name
    .split(/[\s-]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
  return (
    <span aria-hidden="true" className="creator-avatar" data-tone={tone % 4}>
      {initials}
    </span>
  );
}
