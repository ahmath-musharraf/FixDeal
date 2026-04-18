import React from 'react';

export const PrivacyPolicy = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[40px] p-12 shadow-sm border border-zinc-100">
          <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-zinc-500 mb-8">Last updated: March 4, 2026</p>

          <div className="space-y-10 text-zinc-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an account, list a car for sale, or book a service appointment. This may include your name, email address, phone number, and vehicle details.
              </p>
              <p>
                We also automatically collect certain information when you visit our website, including your IP address, browser type, and how you interact with our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, maintain, and improve our services.</li>
                <li>To process transactions and send related information.</li>
                <li>To communicate with you about products, services, and events.</li>
                <li>To monitor and analyze trends, usage, and activities.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Sharing of Information</h2>
              <p>
                We do not share your personal information with third parties except as described in this policy, such as with your consent or to comply with legal obligations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Your Choices</h2>
              <p>
                You can access, update, or delete your account information at any time by contacting us. You may also opt out of receiving promotional communications from us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at privacy@letsdeal.ae.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
