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
  Text,
} from '@solidjs-email/components';

export interface CustomThemeEmailProps {
  username?: string;
  productName?: string;
}

export const CustomThemeEmail = (props: CustomThemeEmailProps) => {
  const username = () => props.username ?? 'there';
  const productName = () => props.productName ?? 'Acme';

  return (
    <Html>
      <Head />
      <Preview>Welcome to {productName()} - Your account is ready!</Preview>
      <Body class="bg-surface font-email">
        <Container class="mx-auto my-0 max-w-[560px] p-email">
          <Section class="bg-white rounded-lg p-email-lg">
            <Heading class="text-[28px] font-bold text-brand mb-4">
              Welcome to {productName()}, {username()}!
            </Heading>
            <Text class="text-muted text-base leading-6 mb-6">
              We're thrilled to have you on board. Your account has been
              successfully created and you're ready to get started.
            </Text>
            <Section class="bg-surface rounded-md p-6 mb-6">
              <Text class="text-[14px] text-muted mb-2">
                Here's what you can do next:
              </Text>
              <Text class="text-[14px] text-gray-800 mb-1">
                ✓ Complete your profile
              </Text>
              <Text class="text-[14px] text-gray-800 mb-1">
                ✓ Explore our features
              </Text>
              <Text class="text-[14px] text-gray-800 mb-1">
                ✓ Connect with the community
              </Text>
            </Section>
            <Section class="text-center mb-6">
              <Button
                class="bg-brand hover:bg-brand-dark rounded-md text-white text-[16px] font-semibold no-underline text-center py-3 px-8"
                href="https://example.com/dashboard"
              >
                Go to Dashboard
              </Button>
            </Section>
            <Hr class="border-gray-200 my-6" />
            <Text class="text-muted text-sm leading-6">
              Need help getting started? Check out our{' '}
              <Link class="text-brand" href="https://example.com/docs">
                documentation
              </Link>{' '}
              or{' '}
              <Link class="text-brand" href="https://example.com/support">
                contact support
              </Link>
              .
            </Text>
            <Text class="text-gray-400 text-xs leading-5 mt-8">
              You received this email because you signed up for {productName()}.
              <br />
              <Link class="text-gray-400" href="https://example.com/unsubscribe">
                Unsubscribe
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

CustomThemeEmail.PreviewProps = {
  username: 'Alex',
  productName: 'Acme',
} satisfies CustomThemeEmailProps;

export default CustomThemeEmail;
