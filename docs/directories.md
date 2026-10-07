# Tools, interview preparation, and podcasts

The directories are curated TypeScript catalogs. They need no API keys or database setup.

## Editing content

- Tools: `lib/tools/catalog.ts`. Use a unique lowercase slug, an official website and source URL, accurate pricing classification, and an honest verification date. Free software can still require paid API calls or hardware; explain this in `pricingNote`. Open-source status is separate from pricing.
- Interview tracks and questions: `lib/interviews/catalog.ts`. Questions can belong to multiple tracks. Current entries are original practice material, not confirmed questions from employers. Reported questions require a public source URL and review date. Do not change this label based on a guess.
- Podcast shows and episodes: `lib/podcasts/catalog.ts`. Link each episode to an existing show slug. Use the publisher's publication date. Omit guest or duration if unknown. Episode summaries are short original descriptions; audio remains on the publisher's website.

The first release includes 24 tools, five company tracks with 20 shared practice questions, five shows, and five selected episodes. Alphabet browsing does not imply complete coverage of every AI tool. There is no scheduled RSS import or automatic pricing refresh.

Tool logos are local assets in `public/tools/`, referenced by each tool's optional `logo` field. `public/tools/sources.json` records where each asset came from. Cards use initials when an image is missing or fails to load. Keep replacement marks unmodified and check their appearance on the white logo tile in both themes.

## Routes and storage

- `/tools` and `/tools/[slug]`
- `/interviews` and `/interviews/[company]`
- `/podcasts` and `/podcasts/[slug]`
- `/saved?tab=articles|tools|questions|shows|episodes`

New saved IDs use independent `ai-pulse-saved-*` localStorage keys. Practised question IDs use `ai-pulse-saved-practised`. Existing article, creator, and job storage remains compatible. Save changes update within the page and across tabs; storage failures show a session-only notice. There is no account sync.

Header and footer navigation link to the tools directory. The AI Tools news category remains at `/?category=ai-tools`. New directories do not enter the news collection pipeline. Job detail pages link to matching company preparation or the general question bank.

## Verification

Run `npm run typecheck`, `npm run lint`, `npm test`, and `npm run build`. Check searches and combined filters, empty results, invalid detail routes, mobile navigation, dark mode, and saved items after refresh. Review official content sources periodically, particularly pricing and podcast links.

When a development server is running, set `AI_PULSE_BUILD_DIR=.next/directory-check` for the build and production preview processes to avoid sharing their output folder with development. Leave it unset for normal builds.
