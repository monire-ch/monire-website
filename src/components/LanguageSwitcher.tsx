import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const languages = [
  { code: 'en', shortLabel: 'EN', label: 'English' },
  { code: 'de', shortLabel: 'DE', label: 'Deutsch' },
] as const;

type LanguageSwitcherProps = {
  className?: string;
};

const LanguageSwitcher = ({ className = '' }: LanguageSwitcherProps) => {
  const { i18n, t } = useTranslation();
  const activeLanguage = i18n.resolvedLanguage === 'de' ? 'de' : 'en';
  const activeLanguageLabel =
    languages.find((language) => language.code === activeLanguage)?.shortLabel ?? 'EN';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center gap-1.5 rounded-full border border-gold-text/25 bg-off-white/[0.03] px-3 py-1.5 text-[11px] font-body font-semibold tracking-widest text-off-white/85 transition-colors duration-200 hover:border-gold-text/45 hover:text-gold-hover focus:outline-none focus:ring-2 focus:ring-gold-text/35 ${className}`}
          aria-label={t('common.languageSwitcherLabel')}
        >
          <Globe size={13} strokeWidth={1.8} aria-hidden="true" />
          <span>{activeLanguageLabel}</span>
          <ChevronDown size={13} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="z-[100] min-w-[9rem] rounded-2xl border border-gold-text/20 bg-main-teal p-1.5 text-off-white shadow-xl"
      >
        {languages.map((language) => {
          const isActive = activeLanguage === language.code;

          return (
            <DropdownMenuItem
              key={language.code}
              onClick={() => {
                if (!isActive) {
                  i18n.changeLanguage(language.code);
                }
              }}
              className="flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 font-body text-sm text-off-white/85 outline-none transition-colors focus:bg-off-white/10 focus:text-gold-hover"
            >
              <span>{language.label}</span>
              {isActive && <Check size={15} strokeWidth={1.8} className="text-gold-text" aria-hidden="true" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
