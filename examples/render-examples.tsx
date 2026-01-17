import { render } from '@solidjs-email/render';
import { WelcomeEmail } from './emails/welcome';
import { VerificationCodeEmail } from './emails/verification-code';

async function main() {
  console.log('Rendering Welcome Email...\n');
  const welcomeHtml = await render(() => (
    <WelcomeEmail username="John" />
  ));
  console.log(welcomeHtml);

  console.log('\n\n---\n\n');

  console.log('Rendering Verification Code Email...\n');
  const verificationHtml = await render(() => (
    <VerificationCodeEmail code="123456" validFor="5 minutes" />
  ));
  console.log(verificationHtml);
}

main().catch(console.error);
