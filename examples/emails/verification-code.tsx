import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@solidjs-email/components';

export interface VerificationCodeEmailProps {
  code?: string;
  validFor?: string;
}

export const VerificationCodeEmail = (props: VerificationCodeEmailProps) => {
  const code = () => props.code ?? '123456';
  const validFor = () => props.validFor ?? '10 minutes';

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body class="bg-white font-sans">
          <Preview>Your verification code: {code()}</Preview>
          <Container class="mx-auto my-0 max-w-[560px] px-4 pt-5 pb-12">
            <Heading class="text-[24px] tracking-tight leading-tight font-semibold text-[#1f2937] mb-4">
              Your verification code
            </Heading>
            <Text class="text-[#525f7f] text-base leading-6 mb-6">
              Enter the following code to verify your identity:
            </Text>
            <Section class="bg-[#f4f4f5] rounded-lg p-6 text-center mb-6">
              <code class="font-mono font-bold text-[32px] tracking-[0.25em] text-[#1f2937]">
                {code()}
              </code>
            </Section>
            <Text class="text-[#6b7280] text-sm leading-6">
              This code will only be valid for the next{' '}
              <strong>{validFor()}</strong>. If you didn't request this code,
              you can safely ignore this email.
            </Text>
            <Hr class="border-[#e5e7eb] my-6" />
            <Section class="text-center">
              <Button
                class="bg-[#1f2937] rounded-md text-white text-[14px] font-medium no-underline text-center py-3 px-6"
                href="https://example.com/verify"
              >
                Verify Now
              </Button>
            </Section>
            <Hr class="border-[#e5e7eb] my-6" />
            <Text class="text-[#9ca3af] text-xs leading-5 text-center">
              If the button above doesn't work, copy and paste this link into
              your browser:
            </Text>
            <Link
              href="https://example.com/verify"
              class="text-[#6366f1] text-xs block text-center"
            >
              https://example.com/verify
            </Link>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

VerificationCodeEmail.PreviewProps = {
  code: '847291',
  validFor: '10 minutes',
} satisfies VerificationCodeEmailProps;

export default VerificationCodeEmail;
