import { FC, useState } from 'react';
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

const ContactModal: FC<ContactModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [agreed, setAgreed] = useState(false);

  if (!open) return null;

  const inputClass =
    'w-full bg-off-white/10 border border-off-white/20 rounded-lg px-5 py-3.5 text-off-white text-base font-body focus:outline-none focus:border-gold transition-colors placeholder:text-off-white/40';

  const selectClass =
    'w-full bg-off-white/10 border border-off-white/20 rounded-lg px-5 py-3.5 text-off-white text-base font-body focus:outline-none focus:border-gold transition-colors appearance-none cursor-pointer';

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
            <input
              type="text"
              required
              className={inputClass}
              placeholder={t('contact.fullNamePlaceholder')}
            />
          </div>

          {/* Company Name */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.company')}
            </label>
            <input
              type="text"
              className={inputClass}
              placeholder={t('contact.companyPlaceholder')}
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.email')}<span className="text-gold-text">*</span>
            </label>
            <input
              type="email"
              required
              className={inputClass}
              placeholder={t('contact.emailPlaceholder')}
            />
          </div>

          {/* Current Website */}
          <div>
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.website')}
            </label>
            <input
              type="url"
              className={inputClass}
              placeholder={t('contact.websitePlaceholder')}
            />
          </div>

          {/* How can we help you? */}
          <div className="relative">
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.service')}<span className="text-gold-text">*</span>
            </label>
            <div className="relative">
              <select required className={selectClass} defaultValue="">
                <option value="" disabled className="text-off-white/40">{t('contact.servicePlaceholder')}</option>
                {serviceOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-main-teal text-off-white">{opt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-off-white/50">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="relative">
            <label className="text-off-white text-base font-body block mb-2">
              {t('contact.budget')}
            </label>
            <div className="relative">
              <select className={selectClass} defaultValue="">
                <option value="" disabled className="text-off-white/40">{t('contact.budgetPlaceholder')}</option>
                {budgetOptions.map((opt) => (
                  <option key={opt} value={opt} className="bg-main-teal text-off-white">{opt}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-off-white/50">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" />
                </svg>
              </div>
            </div>
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