import Image from 'next/image';
import { siteConfig } from '@/lib/config/site';

/** Bellora.pulse brand logo image. */
export function BrandLogo({ footer = false }: { footer?: boolean }) {
  return (
    <Image
      src="/logo.png"
      alt={siteConfig.name}
      width={footer ? 220 : 320}
      height={footer ? 56 : 84}
      className={`brand-logo${footer ? ' brand-logo-footer' : ''}`}
      priority
    />
  );
}
