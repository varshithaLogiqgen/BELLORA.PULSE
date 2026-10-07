'use client';
import {
  useSavedResources,
  type ResourceKind,
} from '@/lib/hooks/useSavedResources';

export function SaveResourceButton({
  kind,
  id,
  title,
}: {
  kind: ResourceKind;
  id: string;
  title: string;
}) {
  const { savedIds, toggleSaved, storageError } = useSavedResources(kind);
  const saved = savedIds.includes(id);
  const label =
    kind === 'practised'
      ? saved
        ? 'Practised'
        : 'Mark practised'
      : saved
        ? 'Saved'
        : kind === 'episodes'
          ? 'Listen later'
          : 'Save';
  return (
    <div>
      <button
        type="button"
        className="directory-button"
        aria-pressed={saved}
        aria-label={`${label}: ${title}`}
        onClick={() => toggleSaved(id)}
      >
        <span aria-hidden="true">{saved ? '✓' : '+'}</span> {label}
      </button>
      {storageError && (
        <p role="status" className="mt-2 text-xs text-fg-muted">
          Saved for this session only. Browser storage is unavailable.
        </p>
      )}
    </div>
  );
}
