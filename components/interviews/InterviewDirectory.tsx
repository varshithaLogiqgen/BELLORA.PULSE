'use client';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import {
  companies,
  questions,
  practiceNotice,
  filterQuestions,
  type InterviewCompany,
} from '@/lib/interviews/catalog';
import { matchesSearch } from '@/lib/utils/directory';
import { useSavedResources } from '@/lib/hooks/useSavedResources';
import { useConfidenceRatings } from '@/lib/hooks/useConfidenceRatings';
import { usePracticeStreak } from '@/lib/hooks/usePracticeStreak';
import {
  DirectoryHero,
  DirectorySearch,
  DirectorySelect,
  DirectoryEmpty,
  Monogram,
  selectOptions,
} from '@/components/directory/DirectoryUI';
import { QuestionCard } from './QuestionCard';
import { FlashcardMode } from './FlashcardMode';

type Mode = 'browse' | 'flashcard';

const defaults = {
  search: '',
  role: '',
  topic: '',
  difficulty: '',
  round: '',
  experience: '',
};

export function InterviewDirectory({
  company,
}: {
  company?: InterviewCompany;
}) {
  const [filters, setFilters] = useState(defaults);
  const [savedOnly, setSavedOnly] = useState(false);
  const [unpractised, setUnpractised] = useState(false);
  const [mode, setMode] = useState<Mode>('browse');

  const { savedIds } = useSavedResources('questions');
  const { savedIds: practised } = useSavedResources('practised');
  const { ratings } = useConfidenceRatings();
  const streak = usePracticeStreak();

  const available = company
    ? questions.filter((q) => q.companySlugs.includes(company.slug))
    : questions;

  const results = filterQuestions(available, filters).filter(
    (q) =>
      (!savedOnly || savedIds.includes(q.id)) &&
      (!unpractised || !practised.includes(q.id)),
  );

  const update = (key: keyof typeof defaults, value: string) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const reset = () => {
    setFilters(defaults);
    setSavedOnly(false);
    setUnpractised(false);
  };

  const companyResults = companies.filter((item) =>
    matchesSearch(filters.search, [item.name, item.focus, ...item.topics]),
  );

  const completed = available.filter((q) => practised.includes(q.id)).length;

  // Weak areas: topics with avg confidence < 3, only for questions that have been rated
  const weakAreas = useMemo(() => {
    const topicMap: Record<string, { total: number; count: number }> = {};
    for (const q of available) {
      const r = ratings[q.id];
      if (!r) continue;
      if (!topicMap[q.topic]) topicMap[q.topic] = { total: 0, count: 0 };
      topicMap[q.topic].total += r;
      topicMap[q.topic].count += 1;
    }
    return Object.entries(topicMap)
      .filter(([, s]) => s.count >= 2 && s.total / s.count < 3)
      .map(([topic]) => topic);
  }, [available, ratings]);

  // Daily queue: 5 questions that need the most work (unrated or low confidence)
  const dailyQueue = useMemo(() => {
    const scored = available.map((q) => ({
      q,
      score: ratings[q.id] ?? 0, // 0 = unrated, lowest priority shown first
    }));
    scored.sort((a, b) => a.score - b.score);
    return scored.slice(0, 5).map((s) => s.q);
  }, [available, ratings]);

  const practicedToday = streak.lastDate === new Date().toISOString().slice(0, 10);

  return (
    <div className="directory-page" id="interview-directory">
      {company && (
        <Link href="/interviews" className="directory-back">
          ← All companies
        </Link>
      )}

      <DirectoryHero
        eyebrow="Your next career chapter"
        title={
          company
            ? `${company.name} interview prep`
            : 'Build confidence. One question at a time.'
        }
        description={
          company
            ? company.description
            : 'Choose a company track, sharpen your AI fundamentals, and practise explaining your decisions.'
        }
      >
        <span className="directory-badge">
          {company
            ? available.length + ' practice questions'
            : companies.length + ' company tracks'}
        </span>
        <span className="directory-badge">
          {completed} / {available.length} practised
        </span>
        {streak.streak > 0 && (
          <span className="directory-badge" title={`${streak.total} total sessions`}>
            🔥 {streak.streak} day streak
          </span>
        )}
        <Link href="/jobs" className="directory-button">
          Explore AI jobs →
        </Link>
      </DirectoryHero>

      {/* Company interview tips */}
      {company?.interviewTips && (
        <div className="mt-5 rounded-xl border border-accent/20 bg-accent-soft px-5 py-4 text-sm text-fg-muted">
          <strong className="text-fg">Interview style: </strong>
          {company.interviewTips}
          {company.rounds && (
            <span className="mt-2 flex flex-wrap gap-2">
              {company.rounds.map((r) => (
                <span key={r} className="directory-tag">{r}</span>
              ))}
            </span>
          )}
        </div>
      )}

      {/* Weak area alert */}
      {weakAreas.length > 0 && (
        <div className="mt-5 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-200">
          <strong>Needs work: </strong>
          {weakAreas.join(', ')} — your confidence here is below average. Filter by these topics to focus your practice.
        </div>
      )}

      {/* Daily queue (main page only, when not filtering) */}
      {!company && !filters.search && !filters.topic && !filters.role && !practicedToday && (
        <section className="mt-7 rounded-2xl border border-border bg-surface p-5 sm:p-6" aria-labelledby="daily-queue-heading">
          <h2 id="daily-queue-heading" className="mb-1 text-base font-semibold">
            Today&apos;s practice queue
          </h2>
          <p className="mb-4 text-xs text-fg-muted">
            5 questions that need the most work based on your ratings
          </p>
          <div className="flex flex-wrap gap-2">
            {dailyQueue.map((q) => (
              <a
                key={q.id}
                href={`#${q.id}`}
                className="directory-button"
                onClick={() => setMode('browse')}
              >
                <span className="directory-badge text-[10px]">{q.difficulty}</span>
                <span className="min-w-0 truncate max-w-[240px]">{q.question}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="directory-filters" aria-label="Filter practice questions">
        <DirectorySearch
          value={filters.search}
          onChange={(value) => update('search', value)}
          placeholder={
            company
              ? 'Search questions, topics, or roles…'
              : 'Search companies, questions, or topics…'
          }
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <DirectorySelect
            label="Role"
            value={filters.role}
            onChange={(value) => update('role', value)}
            options={selectOptions(
              [...new Set(available.flatMap((q) => q.roles))].sort(),
              'All roles',
            )}
          />
          <DirectorySelect
            label="Topic"
            value={filters.topic}
            onChange={(value) => update('topic', value)}
            options={selectOptions(
              [...new Set(available.map((q) => q.topic))].sort(),
              'All topics',
            )}
          />
          <DirectorySelect
            label="Difficulty"
            value={filters.difficulty}
            onChange={(value) => update('difficulty', value)}
            options={selectOptions(['Easy', 'Medium', 'Hard'], 'All difficulties')}
          />
          <DirectorySelect
            label="Round"
            value={filters.round}
            onChange={(value) => update('round', value)}
            options={selectOptions(
              [...new Set(available.map((q) => q.round))].sort(),
              'All rounds',
            )}
          />
          <DirectorySelect
            label="Experience"
            value={filters.experience}
            onChange={(value) => update('experience', value)}
            options={selectOptions(
              ['Entry level', 'Mid level', 'Senior'],
              'All experience levels',
            )}
          />
        </div>
        <div className="mt-5 flex flex-wrap gap-5 text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={savedOnly}
              onChange={(e) => setSavedOnly(e.target.checked)}
            />
            Saved questions
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={unpractised}
              onChange={(e) => setUnpractised(e.target.checked)}
            />
            Not yet practised
          </label>
          <button className="text-accent hover:underline" onClick={reset}>
            Reset filters
          </button>
        </div>
      </section>

      {!company && (
        <section className="mt-8" aria-labelledby="company-heading">
          <h2 id="company-heading" className="mb-5 text-2xl font-semibold">
            Choose your company
          </h2>
          {companyResults.length ? (
            <div className="directory-grid">
              {companyResults.map((item, index) => (
                <Link
                  href={`/interviews/${item.slug}`}
                  key={item.slug}
                  className="directory-card group"
                >
                  <Monogram name={item.name} tone={index} />
                  <h3 className="mt-4 text-xl font-semibold group-hover:text-accent">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-accent">{item.focus}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-fg-muted">
                    {item.description}
                  </p>
                  <p className="mt-5 text-sm font-semibold">
                    {questions.filter((q) => q.companySlugs.includes(item.slug)).length}{' '}
                    questions · Start practising →
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <DirectoryEmpty
              onReset={reset}
              message="No company matches. Matching practice questions appear below."
            />
          )}
        </section>
      )}

      <section className="mt-8" aria-labelledby="questions-heading">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 id="questions-heading" className="text-2xl font-semibold">
              {company ? 'Your practice questions' : 'Explore the question bank'}
            </h2>
            <p role="status" className="mt-1 text-sm text-fg-muted">
              {results.length} question{results.length !== 1 ? 's' : ''} found
            </p>
          </div>
          {/* Mode switcher */}
          <div className="flex rounded-lg border border-border bg-surface p-1 gap-1">
            <button
              className="directory-button"
              aria-pressed={mode === 'browse'}
              onClick={() => setMode('browse')}
            >
              Browse
            </button>
            <button
              className="directory-button"
              aria-pressed={mode === 'flashcard'}
              onClick={() => setMode('flashcard')}
              title="Flashcard mode — question first, reveal answer when ready"
            >
              Flashcard
            </button>
          </div>
        </div>

        {mode === 'flashcard' ? (
          <FlashcardMode questions={results} onExit={() => setMode('browse')} />
        ) : results.length ? (
          <div className="space-y-5">
            {results.map((q) => (
              <QuestionCard key={q.id} question={q} />
            ))}
          </div>
        ) : (
          <DirectoryEmpty onReset={reset} />
        )}
      </section>

      {mode === 'browse' && (
        <p className="mt-8 text-xs leading-relaxed text-fg-muted">{practiceNotice}</p>
      )}
    </div>
  );
}
