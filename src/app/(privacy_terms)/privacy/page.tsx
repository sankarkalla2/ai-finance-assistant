import React from "react";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy - FinPilot</title>
        <meta name="description" content="Privacy Policy for FinPilot" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1>FinPilot Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2>1. Information We Collect</h2>
            <h3>Personal Information</h3>
            <ul>
              <li>
                <strong>Account Information:</strong> Email address, name, and
                profile image URL obtained through Google or Apple
                authentication
              </li>
              <li>
                <strong>Financial Information:</strong> Financial data you
                provide through forms within the application
              </li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>Usage data and analytics</li>
              <li>Device information and IP address</li>
              <li>Browser type and version</li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Provide financial analysis and insights</li>
              <li>Maintain and improve the Service</li>
              <li>Communicate with you about your account</li>
              <li>Ensure security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <h2>3. Data Storage and Security</h2>
            <ul>
              <li>
                Your data is stored securely in Neon DB cloud infrastructure
              </li>
              <li>
                We implement appropriate technical and organizational measures
                to protect your data
              </li>
              <li>Financial data is encrypted in transit and at rest</li>
              <li>We do not share your data with third parties</li>
            </ul>
          </section>

          <section>
            <h2>4. Data Retention and Deletion</h2>
            <ul>
              <li>
                You can delete your account and all associated data at any time
              </li>
              <li>
                Upon deletion request, all personal and financial information is
                immediately removed from our servers and database
              </li>
              <li>No backup copies are retained after deletion</li>
            </ul>
          </section>

          <section>
            <h2>5. Contact Us</h2>
            <p>
              For questions about this Privacy Policy or to exercise your
              rights, contact us at:
              <br />
              <strong>Email:</strong>
              <a
                href="mailto:gowrisankarkalla4@gmail.com"
                className="text-blue-600 hover:underline"
              >
                gowrisankarkalla4@gmail.com
              </a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
