import { Instagram } from 'lucide-react';
import linkedinIcon from '@/assets/linkedin.svg';
import xIcon from '@/assets/x.svg';
import { cn } from '@/lib/utils';

type SocialPlatform = 'instagram' | 'linkedin' | 'x';
type SocialMediaIconSize = 'footer' | 'contact';

type SocialMediaIconProps = {
  href: string;
  platform: SocialPlatform;
  size?: SocialMediaIconSize;
};

const goldIconFilter = 'brightness(0) saturate(100%) invert(85%) sepia(25%) saturate(600%) hue-rotate(5deg) brightness(95%)';

const socialLabels: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  x: 'X',
};

const sizeClasses: Record<SocialMediaIconSize, string> = {
  footer: 'w-[2.4rem] h-[2.4rem] border-gold-text/40 hover:border-gold-text/70',
  contact: 'w-10 h-10 border-gold-text/30 hover:border-gold-text/60',
};

const SocialMediaIcon = ({ href, platform, size = 'footer' }: SocialMediaIconProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={socialLabels[platform]}
    className={cn(
      'flex items-center justify-center rounded-full border transition-all duration-200 hover:shadow-[0_0_8px_rgba(207,169,71,0.2)]',
      sizeClasses[size],
      platform === 'instagram' && 'text-gold-text',
    )}
  >
    {platform === 'instagram' ? (
      <Instagram size={18} />
    ) : (
      <img
        src={platform === 'linkedin' ? linkedinIcon : xIcon}
        alt=""
        aria-hidden="true"
        className="w-4 h-4"
        style={{ filter: goldIconFilter }}
      />
    )}
  </a>
);

export default SocialMediaIcon;
