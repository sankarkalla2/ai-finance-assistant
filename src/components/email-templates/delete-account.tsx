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

interface DeleteAccountEmailProps {
  deleteLink?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const DeleteAccountEmail = ({ deleteLink }: DeleteAccountEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Confirm deletion of your Ask Your Finances account</Preview>
      <Container style={container}>
        <Img
          src="https://n89a31h5y6.ufs.sh/f/If29UpP0kLGcVnWucrlU3vSC0jqMulWwXGyOFP6BgKHbfs94"
          width={48}
          height={48}
          alt="Ask Your Finances"
        />
        <Heading style={heading}>⚠️ Confirm Account Deletion</Heading>
        <Section style={body}>
          <Text style={paragraph}>
            You’ve requested to delete your Ask Your Finances account. This
            action is permanent and cannot be undone.
          </Text>
          <Text style={paragraph}>
            <Link style={link} href={deleteLink}>
              👉 Click here to delete your account 👈
            </Link>
          </Text>
          <Text style={paragraph}>
            If you did not request this, please ignore this email and your
            account will remain active.
          </Text>
        </Section>
        <Text style={paragraph}>
          Best regards,
          <br />– Ask Your Finances Team
        </Text>
        <Hr style={hr} />
        <Img
          src="https://n89a31h5y6.ufs.sh/f/If29UpP0kLGcVnWucrlU3vSC0jqMulWwXGyOFP6BgKHbfs94"
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

DeleteAccountEmail.PreviewProps = {
  deleteLink: "https://askyourfinance.site/delete-account",
} as DeleteAccountEmailProps;

export default DeleteAccountEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 25px 48px",
  backgroundImage:
    'url("https://n89a31h5y6.ufs.sh/f/If29UpP0kLGcVnWucrlU3vSC0jqMulWwXGyOFP6BgKHbfs94")',
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
  color: "#d32f2f",
  textDecoration: "underline",
  fontWeight: "bold",
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
