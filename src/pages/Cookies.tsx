import React from 'react';

export const Cookies = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[40px] p-12 shadow-sm border border-zinc-100">
          <h1 className="font-display text-4xl font-bold mb-8">Cookie Policy</h1>
          <p className="text-zinc-500 mb-8">Last updated: March 4, 2026</p>

          <div className="space-y-10 text-zinc-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. What Are Cookies?</h2>
              <p>
                Cookies are small text files that are stored on your device when you visit a website. They are used to make websites work more efficiently and to provide information to the website owners.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. How We Use Cookies</h2>
              <p className="mb-4">
                We use cookies for several purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To enable certain functions of our services.</li>
                <li>To provide analytics and understand how you use our services.</li>
                <li>To store your preferences and settings.</li>
                <li>To deliver personalized advertisements.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Types of Cookies We Use</h2>
              <p className="mb-4">
                We use both session and persistent cookies. Session cookies are deleted when you close your browser, while persistent cookies remain on your device for a set period.
              </p>
              <p>
                We also use first-party and third-party cookies. First-party cookies are set by Let's Deal, while third-party cookies are set by our partners and service providers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Your Choices</h2>
              <p>
                You can control and manage cookies in your browser settings. You may also opt out of certain third-party cookies by visiting the relevant websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Cookie Policy, please contact us at cookies@letsdeal.ae.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
