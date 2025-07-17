import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface MagicLinkEmailProps {
  magicLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const MagicLinkEmail = ({ magicLink }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Securely log in to your Ask Your Finances account.</Preview>
      <Container style={container}>
        <Img
          src={`https://n89a31h5y6.ufs.sh/f/If29UpP0kLGcVnWucrlU3vSC0jqMulWwXGyOFP6BgKHbfs94`}
          width={48}
          height={48}
          alt="Ask Your Finances"
        />
        <Heading style={heading}>🔐 Your secure login link</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            <Link style={link} href={magicLink}>
              👉 Click here to log in 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            If you didn't request this, you can safely ignore this email.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best regards,
          <br />– Ask Your Finances Team
        </Text>
        <Hr style={hr} />
        <Img
          src={`https://n89a31h5y6.ufs.sh/f/If29UpP0kLGcVnWucrlU3vSC0jqMulWwXGyOFP6BgKHbfs94`}
          width={32}
          height={32}
          style={{
            WebkitFilter: "grayscale(100%)",
            filter: "grayscale(100%)",
            margin: "20px 0",
          }}
        />
        <Text style={footer}>Ask Your Finances</Text>
        <Text style={footer}>Your privacy-focused financial assistant.</Text>
      </Container>
    </Body>
  </Html>
);

MagicLinkEmail.PreviewProps = {
  magicLink: "https://askyourfinance.site/sign-in",
} as MagicLinkEmailProps;

export default MagicLinkEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage: 'url"https://n89a31h5y6.ufs.sh/f/If29UpP0kLGcVnWucrlU3vSC0jqMulWwXGyOFP6BgKHbfs94")',
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
};

const heading = {
  fontSize: "28px",
  fontWeight: "bold",
  marginTop: "48px",
};

const body = {
  margin: "24px 0",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const link = {
  color: "#0070f3",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#dddddd",
  marginTop: "48px",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  marginLeft: "4px",
};
