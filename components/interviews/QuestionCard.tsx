'use client';
import type { InterviewQuestion } from '@/lib/interviews/catalog';
import { SaveResourceButton } from '@/components/directory/SaveResourceButton';
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

export function QuestionCard({ question }: { question: InterviewQuestion }) {
  const { ratings } = useConfidenceRatings();
  const rating = ratings[question.id] as ConfidenceRating | undefined;

  return (
    <article className="directory-panel" id={question.id}>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="directory-badge">{question.difficulty}</span>
        <span className="directory-tag">{question.topic}</span>
        <span className="directory-tag">{question.round}</span>
        <span className="directory-tag">{question.experience}</span>
        {rating && (
          <span className="directory-tag" aria-label={`Confidence: ${CONFIDENCE_LABELS[rating]}`}>
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
          </span>
        )}
      </div>

      <h2 className="text-lg font-semibold leading-relaxed">{question.question}</h2>
      <p className="mt-2 text-xs text-fg-muted">
        {question.roles.join(' · ')} ·{' '}
        {question.sourceType === 'practice'
          ? 'Original practice question'
          : 'Reported interview question'}
      </p>

      <details className="mt-5 rounded-xl border border-border p-4">
        <summary className="cursor-pointer text-sm font-semibold text-accent">
          Answer & explanation
        </summary>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-fg-muted">
          <p>{question.answer}</p>

          {question.codeBlock && (
            <pre className="interview-code">
              <code>{question.codeBlock}</code>
            </pre>
          )}

          <p>
            <strong className="text-fg">What a strong answer covers: </strong>
            {question.explanation}
          </p>
          <p>
            <strong className="text-fg">Follow-up: </strong>
            {question.followUp}
          </p>

          {question.resources && question.resources.length > 0 && (
            <div>
              <strong className="text-fg">Further reading: </strong>
              <span className="mt-1 flex flex-wrap gap-3">
                {question.resources.map((r) => (
                  <a
                    key={r.url}
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline"
                  >
                    {r.label} ↗
                  </a>
                ))}
              </span>
            </div>
          )}

          {question.sourceType === 'reported' && question.sourceUrl && (
            <a
              className="text-accent underline"
              href={question.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reported source ↗
            </a>
          )}

          <p className="text-xs">Last reviewed {question.reviewedAt}</p>

          {/* Confidence self-rating */}
          <div className="border-t border-border pt-3">
            <p className="mb-2 text-xs font-semibold text-fg">Rate your confidence:</p>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex gap-1">
                {([1, 2, 3, 4, 5] as const).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => {
                      setConfidenceRating(question.id, n);
                      recordPracticeSession();
                    }}
                    className={`text-xl leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
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
      </details>

      <div className="mt-4 flex flex-wrap gap-3">
        <SaveResourceButton
          kind="questions"
          id={question.id}
          title={question.question}
        />
        <SaveResourceButton
          kind="practised"
          id={question.id}
          title={question.question}
        />
      </div>
    </article>
  );
}
