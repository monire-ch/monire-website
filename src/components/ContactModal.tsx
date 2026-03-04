import { FC } from 'react';

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal: FC<ContactModalProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-deep-ink/60 contact-overlay ${open ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Panel */}
      <div className={`absolute top-0 right-0 bottom-0 w-full max-w-md dark-teal-surface contact-panel ${open ? 'open' : ''} p-8 overflow-y-auto`}>
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-serif text-2xl text-off-white">Get In Touch</h2>
          <button onClick={onClose} className="text-off-white/60 hover:text-off-white transition-colors">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">Name</label>
            <input
              type="text"
              className="w-full bg-off-white/10 border border-off-white/20 rounded-md px-4 py-2.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">Email</label>
            <input
              type="email"
              className="w-full bg-off-white/10 border border-off-white/20 rounded-md px-4 py-2.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="text-off-white/70 text-sm font-body block mb-1.5">Message</label>
            <textarea
              rows={5}
              className="w-full bg-off-white/10 border border-off-white/20 rounded-md px-4 py-2.5 text-off-white text-sm font-body focus:outline-none focus:border-gold transition-colors resize-none"
              placeholder="Tell us about your project..."
            />
          </div>
          <button type="submit" className="btn-gold w-full text-sm">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
