import { FC } from "react";
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";

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
          <button onClick={onClose} className="text-off-white/60 hover:text-off-white transition-colors" aria-label="Close contact form">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <ContactForm variant="modal" formName="contact" onClose={onClose} />
      </div>
    </div>
  );
};

export default ContactModal;
