import { matchesSearch } from '@/lib/utils/directory';
export interface PodcastShow {
  slug: string;
  title: string;
  host: string;
  description: string;
  topics: string[];
  language: string;
  website: string;
  listeningLinks: { label: string; url: string }[];
  verifiedAt: string;
}
export interface PodcastEpisode {
  id: string;
  showSlug: string;
  title: string;
  guest?: string;
  publishedAt: string;
  durationMinutes?: number;
  summary: string;
  episodeUrl: string;
  topics: string[];
  verifiedAt: string;
}
// Manually curated selections. Publication dates belong to the publisher, not ingestion.
export const shows: PodcastShow[] = [
  {
    slug: 'practical-ai',
    title: 'Practical AI',
    host: 'Daniel Whitenack & Chris Benson',
    description:
      'Conversations about building useful AI, from model development to real-world deployment.',
    topics: ['Technical Learning', 'AI Engineering'],
    language: 'English',
    website: 'https://practicalai.show/',
    listeningLinks: [
      {
        label: 'Official player',
        url: 'https://practicalai.show/',
      },
      {
        label: 'Listening apps',
        url: 'https://practicalai.show/subscribe',
      },
    ],
    verifiedAt: '2026-09-28',
  },
  {
    slug: 'twiml',
    title: 'The TWIML AI Podcast',
    host: 'Sam Charrington',
    description:
      'Research and engineering interviews exploring how machine learning works in practice.',
    topics: ['Research', 'Technical Learning'],
    language: 'English',
    website: 'https://twimlai.com/podcast/twimlai/',
    listeningLinks: [
      {
        label: 'Official episodes',
        url: 'https://twimlai.com/podcast/twimlai/',
      },
    ],
    verifiedAt: '2026-09-28',
  },
  {
    slug: 'latent-space',
    title: 'Latent Space',
    host: 'swyx & guest cohosts',
    description:
      'Technical conversations with people building AI models, developer tools, and infrastructure.',
    topics: ['AI Engineering', 'Research'],
    language: 'English',
    website: 'https://www.latent.space/podcast',
    listeningLinks: [
      {
        label: 'Official episodes',
        url: 'https://www.latent.space/podcast',
      },
    ],
    verifiedAt: '2026-09-28',
  },
  {
    slug: 'cognitive-revolution',
    title: 'The Cognitive Revolution',
    host: 'Nathan Labenz',
    description:
      'Interviews about AI capabilities, businesses, and the changes emerging from adoption.',
    topics: ['Business', 'AI Engineering'],
    language: 'English',
    website: 'https://www.cognitiverevolution.ai/',
    listeningLinks: [
      {
        label: 'Spotify',
        url: 'https://open.spotify.com/show/6yHyok3M3BjqzR0VB5MSyk',
      },
      {
        label: 'Apple Podcasts',
        url: 'https://podcasts.apple.com/podcast/id1669813431',
      },
      {
        label: 'Official episodes',
        url: 'https://www.cognitiverevolution.ai/',
      },
    ],
    verifiedAt: '2026-09-28',
  },
  {
    slug: 'nvidia-ai-podcast',
    title: 'NVIDIA AI Podcast',
    host: 'NVIDIA podcast team',
    description:
      'Stories about applied AI and the people bringing it to different industries.',
    topics: ['Business', 'Research'],
    language: 'English',
    website: 'https://www.nvidia.com/en-us/ai-podcast/',
    listeningLinks: [
      {
        label: 'Spotify',
        url: 'https://open.spotify.com/show/4TB4pnynaiZ6YHoKmyVN0L',
      },
      {
        label: 'Official episodes',
        url: 'https://www.nvidia.com/en-us/ai-podcast/',
      },
    ],
    verifiedAt: '2026-09-28',
  },
];
export const episodes: PodcastEpisode[] = [
  {
    id: 'practical-ai-373',
    showSlug: 'practical-ai',
    title: 'From AGENTS.md to Enterprise Deployment',
    guest: 'Nick Kuhn',
    publishedAt: '2026-09-24',
    durationMinutes: 49,
    summary:
      'A discussion of deploying agents in enterprise environments, including identity, shared memory, and platform engineering.',
    episodeUrl: 'https://practicalai.show/373',
    topics: ['AI Engineering'],
    verifiedAt: '2026-09-28',
  },
  {
    id: 'practical-ai-370',
    showSlug: 'practical-ai',
    title: 'Less about Models; More about Architecture',
    publishedAt: '2026-09-03',
    durationMinutes: 46,
    summary:
      'A conversation about the architectural decisions involved in taking AI systems beyond experimentation.',
    episodeUrl: 'https://practicalai.show/370',
    topics: ['AI Engineering', 'Technical Learning'],
    verifiedAt: '2026-09-28',
  },
  {
    id: 'twiml-709',
    showSlug: 'twiml',
    title: 'Why Your RAG System Is Broken, and How to Fix It',
    guest: 'Jason Liu',
    publishedAt: '2024-11-11',
    summary:
      'How to diagnose retrieval failures and use evaluation datasets to improve a RAG application.',
    episodeUrl:
      'https://twimlai.com/podcast/twimlai/why-your-rag-system-is-broken-and-how-to-fix-it',
    topics: ['Technical Learning', 'Research'],
    verifiedAt: '2026-09-28',
  },
  {
    id: 'twiml-767',
    showSlug: 'twiml',
    title: 'How to Find the Agent Failures Your Evals Miss',
    guest: 'Scott Clark',
    publishedAt: '2026-05-07',
    summary:
      'Looking for unexpected agent behavior through production traces, observability, and continuous evaluation.',
    episodeUrl:
      'https://twimlai.com/podcast/twimlai/how-find-agent-failures-your-evals-miss',
    topics: ['AI Engineering', 'Research'],
    verifiedAt: '2026-09-28',
  },
  {
    id: 'cogrev-zapier',
    showSlug: 'cognitive-revolution',
    title:
      'No Code Is Code: Zapier CEO Wade Foster on Headless Tools, Zapier MCP & Automation Bench',
    guest: 'Wade Foster',
    publishedAt: '2026-09-17',
    summary:
      'A conversation about AI workflows and the role of deterministic automation alongside language models.',
    episodeUrl:
      'https://www.cognitiverevolution.ai/no-code-is-code-zapier-ceo-wade-foster-on-headless-tools-zapier-mcp-automation-bench/',
    topics: ['Business', 'AI Engineering'],
    verifiedAt: '2026-09-28',
  },
];
export const podcastTopics = [
  ...new Set(shows.flatMap((show) => show.topics)),
].sort();
export function filterEpisodes(
  items: PodcastEpisode[],
  search: string,
  topic: string,
  showSlug: string,
  sort: string,
) {
  return items
    .filter((episode) => {
      const show = shows.find((item) => item.slug === episode.showSlug);
      return (
        matchesSearch(search, [
          episode.title,
          episode.summary,
          ...episode.topics,
          episode.guest ?? '',
          show?.title ?? '',
          show?.host ?? '',
        ]) &&
        (!topic || episode.topics.includes(topic)) &&
        (!showSlug || episode.showSlug === showSlug)
      );
    })
    .sort((a, b) =>
      sort === 'oldest'
        ? a.publishedAt.localeCompare(b.publishedAt)
        : b.publishedAt.localeCompare(a.publishedAt),
    );
}
