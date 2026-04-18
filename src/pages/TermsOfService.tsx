import React from 'react';

export const TermsOfService = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-zinc-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-[40px] p-12 shadow-sm border border-zinc-100">
          <h1 className="font-display text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-zinc-500 mb-8">Last updated: March 4, 2026</p>

          <div className="space-y-10 text-zinc-600 leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using Let's Deal, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">2. Use of Services</h2>
              <p className="mb-4">
                You must be at least 18 years old and have the legal capacity to enter into a contract to use our services. You are responsible for maintaining the confidentiality of your account information.
              </p>
              <p>
                You agree not to use our services for any illegal or unauthorized purpose, or to violate any laws in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">3. Listings and Transactions</h2>
              <p className="mb-4">
                Let's Deal provides a platform for buying, selling, and renting cars. We do not guarantee the accuracy of any listings or the quality of any vehicles.
              </p>
              <p>
                Users are responsible for verifying the condition and details of any vehicle before entering into a transaction. Let's Deal is not a party to transactions between users unless explicitly stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">4. Fees and Payments</h2>
              <p>
                Let's Deal may charge fees for certain services, such as listing a car or booking a service appointment. All fees are non-refundable unless otherwise stated.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">5. Limitation of Liability</h2>
              <p>
                Let's Deal is not liable for any indirect, incidental, special, or consequential damages arising out of or in connection with your use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-zinc-900 mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Service at any time. Your continued use of our services after any changes constitutes your acceptance of the new terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};
