import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@monkedevlife/solidjs-email-components';

export interface WelcomeEmailProps {
  username?: string;
}

export const WelcomeEmail = (props: WelcomeEmailProps) => {
  const username = () => props.username ?? 'there';

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body class="bg-[#f6f9fc] font-sans">
          <Preview>Welcome to SolidJS Email!</Preview>
          <Container class="bg-white mx-auto py-5 px-12 mb-16">
            <Section>
              <Heading class="text-[24px] font-bold text-[#1f2937] mb-4">
                Welcome, {username()}!
              </Heading>
              <Text class="text-[#525f7f] text-base leading-6">
                Thanks for trying out SolidJS Email. We're thrilled to have you
                on board.
              </Text>
              <Text class="text-[#525f7f] text-base leading-6">
                SolidJS Email makes it easy to build beautiful, responsive
                emails using SolidJS components. You can use Tailwind CSS
                classes that get automatically inlined for email client
                compatibility.
              </Text>
              <Button
                class="bg-[#5850ec] rounded text-white text-[16px] font-semibold no-underline text-center block py-3 px-6 mt-4"
                href="https://github.com/example/solidjs-email"
              >
                Get Started
              </Button>
              <Hr class="border-[#e6ebf1] my-5" />
              <Text class="text-[#525f7f] text-base leading-6">
                Need help? Check out our{' '}
                <Link class="text-[#5850ec]" href="https://example.com/docs">
                  documentation
                </Link>{' '}
                or reach out to our support team.
              </Text>
              <Text class="text-[#8898aa] text-xs leading-4 mt-8">
                You received this email because you signed up for SolidJS Email.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

WelcomeEmail.PreviewProps = {
  username: 'John',
} satisfies WelcomeEmailProps;

export default WelcomeEmail;
