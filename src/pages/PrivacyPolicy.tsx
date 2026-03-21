import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

const PrivacyPolicy = () => {
  const sectionClass = 'mb-10';
  const headingClass = 'font-display text-xl md:text-2xl text-main-teal mb-4';
  const textClass = 'text-base font-body leading-relaxed mb-4' ;
  const listClass = 'list-disc pl-6 space-y-2 text-base font-body leading-relaxed mb-4';

  return (
    <div className="min-h-screen bg-off-white">
      <Navbar />
      <main className="pt-36 md:pt-44 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h1 className="font-body text-4xl md:text-5xl text-main-teal mb-3">Privacy Policy</h1>
            <p className="text-base font-body mb-12" style={{ color: '#0f4b5ae6' }}>
              Effective Date: February, 2026
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              This Privacy Policy explains how Moniré ("we", "our", "us") collects, uses, and protects your information when you visit our website or interact with our services.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Information We Collect</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>We collect the following types of information:</p>
            <ul className={listClass} style={{ color: '#0f4b5ae6' }}>
              <li>
                <strong>Usage Data:</strong> Through Google Analytics, we collect anonymised website usage information such as device type, browser, pages visited, time spent on pages, and general location (city or region). This data does not identify you personally.
              </li>
              <li>
                <strong>Contact form data:</strong> When you submit our contact form, we collect your name, email address, and any additional information you choose to provide.
              </li>
              <li>
                <strong>Client brief form downloads:</strong> When you click to download our client brief form, we may track anonymous analytics data (e.g., number of downloads). We do not collect personal information unless you later send the completed brief back to us.
              </li>
            </ul>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>How We Use Your Information</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>We use your information to:</p>
            <ul className={listClass} style={{ color: '#0f4b5ae6' }}>
              <li>Improve our website and user experience.</li>
              <li>Respond to your inquiries and communicate with you.</li>
              <li>Review information you voluntarily provide in a client brief form to prepare proposals or services.</li>
              <li>Maintain website performance, analytics, and security.</li>
            </ul>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Legal Basis for Processing</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              If you are located in the EU/EEA, the UK, or another GDPR-relevant region, we process your data based on:
            </p>
            <ul className={listClass} style={{ color: '#0f4b5ae6' }}>
              <li><strong>Your consent</strong> when you submit a contact form or provide information for project discussions.</li>
              <li><strong>Legitimate interests</strong> for analytics, website optimisation, and security.</li>
              <li><strong>Contractual necessity</strong> when communicating with you about potential or ongoing work.</li>
            </ul>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              You can control cookies through your browser settings.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Cookies and Google Analytics</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              Our website uses Google Analytics, which may set cookies in your browser to help us understand how visitors use our site. Google Analytics collects anonymised usage data only. You can opt out of Google Analytics at any time by using the{' '}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline hover:text-gold-hover transition-colors"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Data Storage and Security</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              We store personal data securely and restrict access to authorised persons only. We keep your data only for as long as necessary for the purposes outlined in this policy. We do not sell or rent your personal information.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Sharing Your Information</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>We may share information only when:</p>
            <ul className={listClass} style={{ color: '#0f4b5ae6' }}>
              <li>Required by law.</li>
              <li>Necessary to respond to enquiries (for example, using email service providers).</li>
              <li>Needed to deliver requested services, such as preparing a proposal.</li>
            </ul>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              We do not share your information with third parties for marketing purposes.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Your Data Rights (GDPR Regions)</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>You have the right to:</p>
            <ul className={listClass} style={{ color: '#0f4b5ae6' }}>
              <li>Request access to the data we hold about you.</li>
              <li>Ask for corrections or deletion.</li>
              <li>Withdraw your consent at any time.</li>
              <li>Request restriction of processing.</li>
              <li>Request data portability.</li>
            </ul>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              To exercise these rights, contact us at:{' '}
              <a href="mailto:hello@monire.ch" className="text-gold underline hover:text-gold-hover transition-colors">
                hello@monire.ch
              </a>.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Links to Other Websites</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              Our website may include external links. We are not responsible for their content or privacy practices.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Changes to This Privacy Policy</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              We may update this Privacy Policy from time to time. The latest version will always be available on this page.
            </p>
          </ScrollReveal>

          <ScrollReveal className={sectionClass}>
            <h2 className={headingClass}>Contact Us</h2>
            <p className={textClass} style={{ color: '#0f4b5ae6' }}>
              For any questions about this Privacy Policy or your data rights, you can contact us at:{' '}
              <a href="mailto:hello@monire.ch" className="text-gold underline hover:text-gold-hover transition-colors">
                hello@monire.ch
              </a>.
            </p>
          </ScrollReveal>
        </div>
      </main>
      <Footer hideWave />
    </div>
  );
};

export default PrivacyPolicy;
