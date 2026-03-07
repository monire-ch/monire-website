import { FC, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const serviceOptions = [
  'Web Design',
  'Web Development',
  'AI Automations',
  'Website Migration',
  'SEO & Analytics',
  'Other',
];

const budgetOptions = [
  '<CHF 5\'000',
  'CHF 5\'000 – 10\'000',
  'CHF 10\'000 – 20\'000',
  'CHF 20\'000+',
];

interface CustomSelectProps {
  options: string[];
  placeholder: string;
  value: string;
  onChange: (val: string) => void;
  required?: boolean;
}

const CustomSelect: FC<CustomSelectProps> = ({ options, placeholder, value, onChange, required }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-off-white/10 border rounded-lg px-5 py-3.5 text-base font-body text-left flex items-center justify-between transition-colors ${
          isOpen ? 'border-gold' : 'border-off-white/20'
        } ${value ? 'text-off-white' : 'text-off-white/40'}`}
      >
        <span>{value || placeholder}</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-off-white/50 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M5 7l4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1.5 w-full rounded-lg border border-off-white/20 bg-[#0a3a4a] overflow-hidden shadow-xl">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setIsOpen(false); }}
              className={`w-full text-left px-5 py-3 text-base font-body transition-colors ${
                value === opt
                  ? 'text-off-white bg-off-white/10'
                  : 'text-off-white hover:bg-off-white/[0.06]'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}

      {required && <input tabIndex={-1} className="sr-only" value={value} onChange={() => {}} required />}
    </div>
  );
};

const ContactModal: FC<ContactModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [agreed, setAgreed] = useState(false);
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');

  if (!open) return null;

  const inputClass =
    'w-full bg-off-white/10 border border-off-white/20 rounded-lg px-5 py-3.5 text-off-white text-base font-body focus:outline-none focus:border-gold transition-colors placeholder:text-off-white/40';

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className={`absolute inset-0 bg-deep-ink/60 contact-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />

      <div className={`absolute top-0 right-0 bottom-0 w-full max-w-md dark-teal-surface contact-panel ${open ? 'open' : ''} p-8 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-body text-2xl text-off-white">{t('contact.title')}</h2>
          <button onClick={onClose} className="text-off-white/60 hover:text-off-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {/* Full Name */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.fullName')}<span className="text-gold-text">*</span>
            </label>
            <input type="text" required className={inputClass} placeholder={t('contact.fullNamePlaceholder')} />
          </div>

          {/* Company Name */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.company')}
            </label>
            <input type="text" className={inputClass} placeholder={t('contact.companyPlaceholder')} />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.email')}<span className="text-gold-text">*</span>
            </label>
            <input type="email" required className={inputClass} placeholder={t('contact.emailPlaceholder')} />
          </div>

          {/* Current Website */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.website')}
            </label>
            <input type="url" className={inputClass} placeholder={t('contact.websitePlaceholder')} />
          </div>

          {/* How can we help you? */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.service')}<span className="text-gold-text">*</span>
            </label>
            <CustomSelect
              options={serviceOptions}
              placeholder={t('contact.servicePlaceholder')}
              value={service}
              onChange={setService}
              required
            />
          </div>

          {/* Budget */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.budget')}
            </label>
            <CustomSelect
              options={budgetOptions}
              placeholder={t('contact.budgetPlaceholder')}
              value={budget}
              onChange={setBudget}
            />
          </div>

          {/* Tell us about your project */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.message')}<span className="text-gold-text">*</span>
            </label>
            <textarea
              rows={5}
              required
              className={`${inputClass} resize-vertical`}
              placeholder={t('contact.messagePlaceholder')}
            />
          </div>

          {/* Terms checkbox */}
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-off-white/30 bg-transparent accent-gold cursor-pointer"
            />
            <span className="text-off-white text-base font-body">
              {t('contact.terms')}{' '}
              <a href="/privacy" className="text-gold-text underline hover:text-gold-hover transition-colors">
                {t('contact.privacyPolicy')}
              </a>.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!agreed}
            className="btn-gold text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t('contact.send')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;