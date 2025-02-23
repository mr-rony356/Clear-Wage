import React from "react";
import { Typography, Container, Box } from "@mui/material";
import DrawerAppBar from "./AppBar";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="full" sx={{ background: "black" }}>
      <DrawerAppBar />
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: "bold",
          mb: 4,
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        ClearWage.co Privacy Policy
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        <strong>Effective Date: 2/01/2025</strong>
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to ClearWage.co ("Company," "we," "our," or "us"). Your privacy
        is important to us, and we are committed to protecting your personal
        information. This Privacy Policy explains how we collect, use, disclose,
        and safeguard your information when you visit our website, ClearWage.co
        (the "Site").
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
         Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We may collect and process the following types of information:
        </Typography>
        <Box sx={{ pl: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            a. Information You Provide
          </Typography>
          <ul style={{ marginBottom: "1rem" }}>
            <li>When you submit salary data or other details voluntarily.</li>
            <li>When you contact us for inquiries, support, or feedback.</li>
            <li>
              When you sign up for an account or newsletter (if applicable).
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            b. Automatically Collected Information
          </Typography>
          <ul style={{ marginBottom: "1rem" }}>
            <li>IP addresses, browser type, and device information.</li>
            <li>Cookies and tracking technologies to analyze website usage.</li>
            <li>
              Log data, including pages visited and actions taken on the Site.
            </li>
          </ul>

          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            c. Third-Party Data
          </Typography>
          <Typography variant="body1" paragraph>
            Information from third-party services if you link or interact with
            them through our Site.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use collected information to:
        </Typography>
        <Box sx={{ pl: 3 }}>
          <Typography variant="body1" paragraph>
            Provide, operate, and improve ClearWage.co.
          </Typography>
          <Typography variant="body1" paragraph>
            Maintain and improve data accuracy and site functionality.
          </Typography>
          <Typography variant="body1" paragraph>
            Communicate with users regarding services, inquiries, or updates.
          </Typography>
          <Typography variant="body1" paragraph>
            Analyze usage patterns to improve user experience.
          </Typography>
          <Typography variant="body1" paragraph>
            Protect against fraudulent activities and ensure compliance with
            legal obligations.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
           Sharing of Information
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell, trade, or rent users' personal information. However,
          we may share information:
        </Typography>
        <Box sx={{ pl: 3 }}>
          <Typography variant="body1" paragraph>
            With service providers: Third-party vendors assisting in our
            operations (e.g., hosting, analytics).
          </Typography>
          <Typography variant="body1" paragraph>
            For legal reasons: If required by law, regulation, or legal process.
          </Typography>
          <Typography variant="body1" paragraph>
            With user consent: If you request or authorize us to share data.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
           Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          ClearWage.co uses cookies and similar tracking technologies to enhance
          user experience. You can manage cookie settings through your browser.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
         Data Security
        </Typography>
        <Typography variant="body1" paragraph>
          We implement industry-standard security measures to protect your data.
          However, no online transmission is 100% secure, and we cannot
          guarantee absolute security.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Your Rights and Choices
        </Typography>
        <Typography variant="body1" paragraph>
          Depending on your location, you may have rights regarding your
          personal data, such as:
        </Typography>
        <Box sx={{ pl: 3 }}>
          <Typography variant="body1" paragraph>
            Accessing or correcting your data.
          </Typography>
          <Typography variant="body1" paragraph>
            Requesting deletion of your data.
          </Typography>
          <Typography variant="body1" paragraph>
            Opting out of certain data collection or communications.
          </Typography>
        </Box>
        <Typography variant="body1" paragraph>
          To exercise these rights, please contact us at [Insert Contact Email].
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Third-Party Links
        </Typography>
        <Typography variant="body1" paragraph>
          Our Site may contain links to third-party websites. We are not
          responsible for the privacy practices of external sites.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
           Children's Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          ClearWage.co is not intended for individuals under 13. We do not
          knowingly collect personal information from children.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
           Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update this policy from time to time. Changes will be posted on
          this page with an updated "Effective Date."
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
           Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          For any questions about this Privacy Policy, please contact us at:
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          hey@clearwage.co
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontWeight: "bold", paddingBottom: "100px" }}
        >
          ClearWage.co
        </Typography>
      </Box>
    </Container>
  );
};

export default PrivacyPolicy;
