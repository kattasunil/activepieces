import { FullLogo } from '@/components/ui/full-logo';
import { AuthFormTemplate } from '@/features/authentication/components/auth-form-template';

const SignInPage: React.FC = () => {
  return (
    <div
      className="flex h-screen flex-col items-center justify-center gap-2"
      style={{ visibility: 'hidden' }}
    >
      <FullLogo />
      <AuthFormTemplate form={'signin'} />
    </div>
  );
};

SignInPage.displayName = 'SignInPage';

export { SignInPage };
