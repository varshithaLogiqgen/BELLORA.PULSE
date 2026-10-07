'use client';
import { useState, useEffect, useCallback } from 'react';
import type { InterviewQuestion } from '@/lib/interviews/catalog';
import {
  useConfidenceRatings,
  setConfidenceRating,
  type ConfidenceRating,
} from '@/lib/hooks/useConfidenceRatings';
import { recordPracticeSession } from '@/lib/hooks/usePracticeStreak';

const CONFIDENCE_LABELS: Record<ConfidenceRating, string> = {
  1: 'Not confident',
  2: 'Slightly confident',
  3: 'Getting there',
  4: 'Confident',
  5: 'Nailed it',
};

export function FlashcardMode({
  questions,
  onExit,
}: {
  questions: InterviewQuestion[];
  onExit: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const { ratings } = useConfidenceRatings();

  const current = questions[index];
  const progress = questions.length > 0 ? ((index + 1) / questions.length) * 100 : 0;
  const rating = current ? (ratings[current.id] as ConfidenceRating | undefined) : undefined;

  const reveal = useCallback(() => setRevealed(true), []);

  const next = useCallback(() => {
    if (index < questions.length - 1) {
      setIndex((i) => i + 1);
      setRevealed(false);
    } else {
      setFinished(true);
      recordPracticeSession();
    }
  }, [index, questions.length]);

  const prev = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setRevealed(false);
    }
  }, [index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ') {
        e.preventDefault();
        if (!revealed) reveal();
        else next();
      }
      if (e.key === 'ArrowRight' && revealed) next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [reveal, next, prev, onExit, revealed]);

  if (!questions.length) {
    return (
      <div className="py-20 text-center">
        <p className="text-fg-muted">No questions match your current filters.</p>
        <button className="directory-button mt-5" onClick={onExit}>
          ← Back to browse
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="mx-auto max-w-lg py-20 text-center">
        <div className="mb-5 text-5xl">✓</div>
        <h2 className="text-2xl font-bold">Session complete</h2>
        <p className="mt-2 text-fg-muted">{questions.length} question{questions.length !== 1 ? 's' : ''} reviewed</p>
        <div className="mt-8 flex justify-center gap-3">
          <button
            className="directory-button"
            onClick={() => { setIndex(0); setRevealed(false); setFinished(false); }}
          >
            Start over
          </button>
          <button className="directory-primary" onClick={onExit}>
            Back to browse
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Top bar */}
      <div className="mb-5 flex items-center justify-between gap-4">
        <button className="directory-button shrink-0" onClick={onExit}>
          ← Browse
        </button>
        <span className="text-sm text-fg-muted font-variant-numeric tabular-nums">
          {index + 1} / {questions.length}
        </span>
        <span className="directory-tag shrink-0">{current.topic}</span>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div
        className={`rounded-2xl border-2 bg-surface p-6 transition-colors sm:p-8 ${
          revealed ? 'border-accent' : 'border-border'
        }`}
      >
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="directory-badge">{current.difficulty}</span>
          <span className="directory-tag">{current.round}</span>
          <span className="directory-tag">{current.experience}</span>
        </div>

        <h2 className="text-xl font-semibold leading-relaxed">{current.question}</h2>
        <p className="mt-2 text-xs text-fg-muted">{current.roles.join(' · ')}</p>

        {!revealed ? (
          <button className="directory-primary mt-8 w-full" onClick={reveal}>
            Reveal answer
          </button>
        ) : (
          <div className="mt-6 space-y-4 border-t border-border pt-5 text-sm leading-relaxed">
            <p className="text-fg-muted">{current.answer}</p>

            {current.codeBlock && (
              <pre className="interview-code">
                <code>{current.codeBlock}</code>
              </pre>
            )}

            <p className="text-fg-muted">
              <strong className="text-fg">Follow-up: </strong>
              {current.followUp}
            </p>

            {/* Confidence rating */}
            <div className="border-t border-border pt-4">
              <p className="mb-3 text-xs font-semibold text-fg">How well did you know this?</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex gap-1">
                  {([1, 2, 3, 4, 5] as const).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setConfidenceRating(current.id, n)}
                      className={`text-2xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                        n <= (rating ?? 0) ? 'text-accent' : 'text-fg-muted hover:text-accent'
                      }`}
                      aria-label={`${n} out of 5 — ${CONFIDENCE_LABELS[n]}`}
                      aria-pressed={rating === n}
                    >
                      {n <= (rating ?? 0) ? '★' : '☆'}
                    </button>
                  ))}
                </div>
                {rating && (
                  <span className="text-xs text-fg-muted">{CONFIDENCE_LABELS[rating]}</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-5 flex gap-3">
        <button
          className="directory-button"
          onClick={prev}
          disabled={index === 0}
          aria-disabled={index === 0}
        >
          ← Prev
        </button>
        {revealed && (
          <button className="directory-primary flex-1" onClick={next}>
            {index < questions.length - 1 ? 'Next question →' : 'Finish session'}
          </button>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-fg-muted">
        Space to reveal · Arrow keys to navigate · Esc to exit
      </p>
    </div>
  );
}
