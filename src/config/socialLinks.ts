export type SocialPlatform = 'instagram' | 'linkedin' | 'x';

export type SocialLink = {
  platform: SocialPlatform;
  href: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'instagram', href: 'https://www.instagram.com/hello.monire' },
  { platform: 'linkedin', href: 'https://www.linkedin.com/company/monire' },
  { platform: 'x', href: 'https://x.com/hellomonire' },
];
