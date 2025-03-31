import { Container, Box } from "@mui/material";
import CompanyFooter from "./CompanyFooter";

const Privacy = () => {
  return (
    <div>
      <Box
        sx={{
          margin: "0 auto",
          color: "white",
        }}
      >
        <h1 className="lg:text-[80px] text-[46px] font-bold  my-24 text-center">
          What Privacy Policy
        </h1>
        <div className="flex justify-center bg-white">
          <div className="text-[20px] font-normal bg-white text-black max-w-[600px] mx-auto">
            <p className="lg:text-[56px] text-[36px] font-bold mb-10 mt-30 text-center">
              Effective Date: 2/01/2025
            </p>
          </div>
        </div>
      </Box>
      <div className="bg-white">
        <Container
          maxWidth="md"
          sx={{ color: "black", mb: 8, background: "white" }}
        >
          <p style={{ marginBottom: "1rem" }}>
            Welcome to ClearWage.co ("Company," "we," "our," or "us"). Your
            privacy is important to us, and we are committed to protecting your
            personal information. This Privacy Policy explains how we collect,
            use, disclose, and safeguard your information when you visit our
            website, ClearWage.co (the "Site").
          </p>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Information We Collect
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We may collect and process the following types of information:
            </p>
            <Box sx={{ pl: 3 }}>
              <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                a. Information You Provide
              </h3>
              <ul style={{ marginBottom: "1rem" }}>
                <li>
                  <p>
                    When you submit salary data or other details voluntarily.
                  </p>
                </li>
                <li>
                  <p>
                    When you contact us for inquiries, support, or feedback.
                  </p>
                </li>
                <li>
                  <p>
                    When you sign up for an account or newsletter (if
                    applicable).
                  </p>
                </li>
              </ul>

              <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                b. Automatically Collected Information
              </h3>
              <ul style={{ marginBottom: "1rem" }}>
                <li>
                  <p>IP addresses, browser type, and device information.</p>
                </li>
                <li>
                  <p>
                    Cookies and tracking technologies to analyze website usage.
                  </p>
                </li>
                <li>
                  <p>
                    Log data, including pages visited and actions taken on the
                    Site.
                  </p>
                </li>
              </ul>

              <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                c. Third-Party Data
              </h3>
              <p style={{ marginBottom: "1rem" }}>
                Information from third-party services if you link or interact
                with them through our Site.
              </p>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              How We Use Your Information
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We use collected information to:
            </p>
            <Box sx={{ pl: 3 }}>
              <p style={{ marginBottom: "0.5rem" }}>
                Provide, operate, and improve ClearWage.co.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Maintain and improve data accuracy and site functionality.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Communicate with users regarding services, inquiries, or
                updates.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Analyze usage patterns to improve user experience.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Protect against fraudulent activities and ensure compliance with
                legal obligations.
              </p>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Sharing of Information
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We do not sell, trade, or rent users' personal information.
              However, we may share information:
            </p>
            <Box sx={{ pl: 3 }}>
              <p style={{ marginBottom: "0.5rem" }}>
                With service providers: Third-party vendors assisting in our
                operations (e.g., hosting, analytics).
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                For legal reasons: If required by law, regulation, or legal
                process.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                With user consent: If you request or authorize us to share data.
              </p>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Cookies and Tracking Technologies
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              ClearWage.co uses cookies and similar tracking technologies to
              enhance user experience. You can manage cookie settings through
              your browser.
            </p>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Data Security
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We implement industry-standard security measures to protect your
              data. However, no online transmission is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Your Rights and Choices
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Depending on your location, you may have rights regarding your
              personal data, such as:
            </p>
            <Box sx={{ pl: 3 }}>
              <p style={{ marginBottom: "0.5rem" }}>
                Accessing or correcting your data.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Requesting deletion of your data.
              </p>
              <p style={{ marginBottom: "0.5rem" }}>
                Opting out of certain data collection or communications.
              </p>
            </Box>
            <p style={{ marginBottom: "1rem" }}>
              To exercise these rights, please contact us at hey@clearwage.co.
            </p>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Third-Party Links
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              Our Site may contain links to third-party websites. We are not
              responsible for the privacy practices of external sites.
            </p>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Children's Privacy
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              ClearWage.co is not intended for individuals under 13. We do not
              knowingly collect personal information from children.
            </p>
          </Box>

          <Box sx={{ mb: 4 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Changes to This Privacy Policy
            </h2>
            <p style={{ marginBottom: "1rem" }}>
              We may update this policy from time to time. Changes will be
              posted on this page with an updated "Effective Date."
            </p>
          </Box>

          <Box sx={{ mb: 8 }}>
            <h2 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
              Contact Us
            </h2>
            <p style={{ marginBottom: "0.5rem" }}>
              For any questions about this Privacy Policy, please contact us at:
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
              hey@clearwage.co
            </p>
            <p style={{ fontWeight: "bold", marginBottom: "3rem" }}>
              ClearWage.co
            </p>
          </Box>
        </Container>
      </div>
      <div className="bg-white -mt-16">
        <CompanyFooter />
      </div>
    </div>
  );
};

export default Privacy;
