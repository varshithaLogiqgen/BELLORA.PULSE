import { describe, expect, it } from 'vitest';
import { tools, filterTools } from '@/lib/tools/catalog';
import {
  companies,
  questions,
  filterQuestions,
  preparationHref,
} from '@/lib/interviews/catalog';
import { shows, episodes, filterEpisodes } from '@/lib/podcasts/catalog';
import { initialLetter, parseSavedIds } from '@/lib/utils/directory';

const toolFilters = {
  search: '',
  category: '',
  pricing: '',
  letter: '',
  openSource: false,
  sort: 'az',
};
const questionFilters = {
  search: '',
  role: '',
  topic: '',
  round: '',
  difficulty: '',
  experience: '',
};

describe('directory browsing', () => {
  it('combines task search, category, pricing, and letter filters', () => {
    expect(
      filterTools(tools, {
        ...toolFilters,
        search: '  PROJECT  ',
        category: 'Coding',
        pricing: 'freemium',
        letter: 'C',
      }).map((tool) => tool.slug),
    ).toEqual(['cursor']);
    expect(
      filterTools(tools, { ...toolFilters, letter: 'C', pricing: 'paid' }),
    ).toEqual([]);
  });
  it('keeps free software separate from open-source status and reverses sorting', () => {
    expect(
      filterTools(tools, { ...toolFilters, openSource: true }).map(
        (tool) => tool.slug,
      ),
    ).toEqual(['aider', 'ollama']);
    expect(
      filterTools(tools, { ...toolFilters, sort: 'za' }).map(
        (tool) => tool.slug,
      ),
    ).toEqual(
      filterTools(tools, toolFilters)
        .map((tool) => tool.slug)
        .reverse(),
    );
    expect(initialLetter('  123 AI')).toBe('#');
    expect(initialLetter('v0')).toBe('V');
  });
  it('filters questions by role, topic, and difficulty together', () => {
    const microsoft = questions.filter((question) =>
      question.companySlugs.includes('microsoft'),
    );
    expect(
      filterQuestions(microsoft, {
        ...questionFilters,
        role: 'AI Engineer',
        topic: 'RAG',
        difficulty: 'Hard',
      }).map((question) => question.id),
    ).toEqual(['rag-assistant']);
    expect(preparationHref(' NVIDIA ')).toBe('/interviews/nvidia');
    expect(preparationHref('Unknown employer')).toBe('/interviews');
  });
  it('searches episode guests and combines show/topic filters', () => {
    expect(
      filterEpisodes(episodes, 'Research', '', '', 'newest').length,
    ).toBeGreaterThan(0);
    expect(
      filterEpisodes(episodes, 'jason', 'Research', 'twiml', 'newest').map(
        (episode) => episode.id,
      ),
    ).toEqual(['twiml-709']);
    const newest = filterEpisodes(episodes, '', '', '', 'newest');
    expect(newest[0].publishedAt >= newest[newest.length - 1].publishedAt).toBe(
      true,
    );
    expect(
      filterEpisodes(episodes, '', '', '', 'oldest').map(
        (episode) => episode.id,
      ),
    ).toEqual(newest.map((episode) => episode.id).reverse());
  });
});

describe('content integrity', () => {
  it('uses unique IDs and valid internal references for every detail route', () => {
    for (const ids of [
      tools.map((tool) => tool.slug),
      companies.map((company) => company.slug),
      questions.map((question) => question.id),
      shows.map((show) => show.slug),
      episodes.map((episode) => episode.id),
    ]) {
      expect(new Set(ids).size).toBe(ids.length);
      expect(ids.every((id) => /^[a-z0-9-]+$/.test(id))).toBe(true);
    }
    for (const question of questions) {
      expect(
        question.companySlugs.every((slug) =>
          companies.some((company) => company.slug === slug),
        ),
      ).toBe(true);
      expect(question.answer.length).toBeGreaterThan(100);
      if (question.sourceType === 'reported')
        expect(question.sourceUrl).toMatch(/^https:\/\//);
    }
    expect(
      episodes.every((episode) =>
        shows.some((show) => show.slug === episode.showSlug),
      ),
    ).toBe(true);
    for (const url of [
      ...tools.flatMap((tool) => [tool.website, tool.sourceUrl]),
      ...shows.flatMap((show) => [
        show.website,
        ...show.listeningLinks.map((link) => link.url),
      ]),
      ...episodes.map((episode) => episode.episodeUrl),
    ]) {
      expect(new URL(url).protocol).toBe('https:');
      expect(new URL(url).hostname).not.toBe('example.com');
    }
  });
  it('recovers malformed browser storage and removes duplicate or invalid saved IDs', () => {
    expect(parseSavedIds('{broken')).toEqual([]);
    expect(parseSavedIds('{"id":"cursor"}')).toEqual([]);
    expect(parseSavedIds('["cursor",null,3,"cursor","", "aider"]')).toEqual([
      'cursor',
      'aider',
    ]);
    expect(parseSavedIds(null)).toEqual([]);
  });
});
