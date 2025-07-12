import Head from "next/head";

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms of Service - FinPilot</title>
        <meta name="description" content="Terms of Service for FinPilot" />
      </Head>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          <h1>FinPilot Terms of Service</h1>
          <p className="text-gray-600 mb-8">
            Last Updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using FinPilot ("the Service"), you agree to be
              bound by these Terms of Service ("Terms"). If you do not agree to
              these Terms, please do not use the Service.
            </p>
          </section>

          <section>
            <h2>2. Service Description</h2>
            <p>
              FinPilot is a web-based financial analysis platform that uses
              artificial intelligence to help users understand and analyze their
              financial information. The Service provides financial information
              and analysis based on data you provide through forms.
            </p>
          </section>

          <section>
            <h2>3. Eligibility</h2>
            <p>
              You must be at least 18 years old to use FinPilot. By using the
              Service, you represent and warrant that you meet this age
              requirement.
            </p>
          </section>

          <section>
            <h2>4. Account Registration</h2>
            <p>
              To use FinPilot, you must create an account using Google or Apple
              authentication providers. We collect your email address, name, and
              profile image URL from these providers.
            </p>
          </section>

          <section>
            <h2>5. Service Plans</h2>
            <ul>
              <li>
                <strong>Free Plan:</strong> Limited number of queries per month
              </li>
              <li>
                <strong>Premium Plan:</strong> Unlimited queries and advanced
                features
              </li>
            </ul>
          </section>

          <section>
            <h2>6. Financial Information Disclaimer</h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <p className="font-bold text-yellow-800">IMPORTANT:</p>
              <p className="text-yellow-700">
                FinPilot provides financial information and analysis for
                educational purposes only. This is NOT financial advice. Always
                consult with a qualified financial advisor before making any
                financial decisions. We are not licensed financial advisors and
                do not provide personalized financial advice.
              </p>
            </div>
          </section>

          <section>
            <h2>7. Data Processing</h2>
            <ul>
              <li>
                You provide financial information through forms within the
                application
              </li>
              <li>
                This data is processed using AI technology to generate insights
                and analysis
              </li>
              <li>All processing is done on our secure servers</li>
              <li>Your data is never shared with third parties</li>
            </ul>
          </section>

          <section>
            <h2>8. Data Deletion</h2>
            <p>
              You have the right to delete your account and all associated data
              at any time. Upon deletion request, all your personal and
              financial information will be immediately removed from our servers
              and database.
            </p>
          </section>

          <section>
            <h2>9. Contact Information</h2>
            <p>
              For questions about these Terms, contact us at:
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
