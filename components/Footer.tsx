import { FeedLink as Link } from '@/components/FeedLink';
import { siteConfig } from '@/lib/config/site';

const footerGroups = [
  {
    title: 'Discover',
    links: [
      { label: 'Latest news', href: '/' },
      { label: 'Generative AI', href: '/?category=generative-ai' },
      { label: 'Machine learning', href: '/?category=machine-learning' },
      { label: 'Startups', href: '/?category=startups' },
      { label: 'Funding', href: '/?category=funding' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'AI Tools A–Z', href: '/tools' },
      { label: 'AI podcasts', href: '/podcasts' },
      { label: 'AI events', href: '/?category=ai-events' },
      { label: 'Robotics', href: '/?category=robotics' },
      { label: 'Creator directory', href: '/?category=ai-content-creators' },
      { label: 'Saved items', href: '/saved' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="site-chrome overflow-hidden border-t border-border bg-surface pb-[var(--search-dock-space)] text-fg">
      <div className="mx-auto max-w-content px-4 pt-12 sm:px-6 sm:pt-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <section aria-labelledby="footer-heading" className="max-w-xl">
            <Link href="/" className="inline-flex items-center gap-2 font-display text-sm font-bold tracking-tight text-fg">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-accent">
                <path d="M2 12h5l3-8 4 16 3-8h5" />
              </svg>
              {siteConfig.name}
            </Link>
            <h2 id="footer-heading" className="mt-6 text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
              Stay ahead of<br />
              <span className="text-accent">what&apos;s next.</span>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-fg-muted sm:text-base">
              A little clarity in the world of artificial intelligence.
              Discover the voices making sense of it all.
            </p>
            <Link
              href="/?category=ai-content-creators"
              className="group mt-7 inline-flex min-h-14 w-full max-w-sm items-center justify-between gap-4 rounded-full border border-accent/25 bg-accent/10 py-2 pl-5 pr-2 text-sm font-semibold text-fg transition-colors hover:border-accent/60 hover:bg-accent/15"
            >
              Discover AI creators
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-transform group-hover:translate-x-0.5">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          </section>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-6 lg:pt-1">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-semibold text-fg">{group.title}</h3>
                <ul className="mt-5 space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="inline-block py-2 text-sm text-fg-muted underline-offset-4 transition-colors hover:text-accent hover:underline sm:text-base">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 text-xs leading-relaxed text-fg-muted sm:mt-16 lg:flex-row lg:gap-12">
          <p className="max-w-xl">Headlines and images belong to their original publishers. Follow a story to read it at the source. News collected via GNews.</p>
          <p>Your saved stories stay in your browser.</p>
        </div>

        <div aria-hidden="true" className="footer-wordmark select-none py-8 text-center font-bold sm:py-12">
          {siteConfig.name}
        </div>

        <div className="border-t border-border py-7 sm:py-8">
          <p className="text-center text-xs leading-7 text-fg-muted sm:text-sm">
            <span className="inline-block">&copy; {new Date().getFullYear()} {siteConfig.name}</span>
            <span aria-hidden="true" className="mx-2">&middot;</span>{' '}
            <span className="inline-block">Developed by <strong className="font-semibold text-fg">Indrasena Seetana</strong></span>
            <span aria-hidden="true" className="mx-2">&middot;</span>{' '}
            <span className="inline-block">AI Sr ERP Applications Engineer</span>
            <span aria-hidden="true" className="mx-2">&middot;</span>{' '}
            <span className="inline-block">Bell Integrations</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
