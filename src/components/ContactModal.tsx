import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal: FC<ContactModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className={`absolute inset-0 bg-deep-ink/60 contact-overlay ${open ? "open" : ""}`} onClick={onClose} />

      <div
        className={`absolute top-0 right-0 bottom-0 w-full max-w-md dark-teal-surface contact-panel ${open ? "open" : ""} p-8 overflow-y-auto`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-body text-2xl text-off-white">{t("contact.title")}</h2>
          <button onClick={onClose} className="text-off-white/60 hover:text-off-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <form name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" className="space-y-5">
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />

          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.name")}</label>
            <input
              type="text"
              name="name"
              className="w-full bg-off-white/10 border border-off-white/20 rounded-md px-4 py-2.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors"
              placeholder={t("contact.namePlaceholder")}
              required
            />
          </div>

          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.email")}</label>
            <input
              type="email"
              name="email"
              className="w-full bg-off-white/10 border border-off-white/20 rounded-md px-4 py-2.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors"
              placeholder={t("contact.emailPlaceholder")}
              required
            />
          </div>

          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">{t("contact.message")}</label>
            <textarea
              name="message"
              rows={5}
              className="w-full bg-off-white/10 border border-off-white/20 rounded-md px-4 py-2.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder={t("contact.messagePlaceholder")}
              required
            />
          </div>

          <button type="submit" className="btn-gold w-full text-sm">
            {t("contact.send")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
