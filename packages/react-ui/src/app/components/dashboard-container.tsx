import { t } from 'i18next';
import { AlertCircle, Link2, Logs, Workflow, Wrench } from 'lucide-react';
import { Navigate } from 'react-router-dom';

import { useEmbedding } from '@/components/embed-provider';
import { issueHooks } from '@/features/issues/hooks/issue-hooks';
import { useAuthorization } from '@/hooks/authorization-hooks';
import { platformHooks } from '@/hooks/platform-hooks';
import { isNil, Permission } from '@activepieces/shared';

import { authenticationSession } from '../../lib/authentication-session';

import { AllowOnlyLoggedInUserOnlyGuard } from './allow-logged-in-user-only-guard';
import { Sidebar, SidebarLink } from './sidebar';

type DashboardContainerProps = {
  children: React.ReactNode;
};

export function DashboardContainer({ children }: DashboardContainerProps) {
  const { platform } = platformHooks.useCurrentPlatform();
  const { data: showIssuesNotification } = issueHooks.useIssuesNotification(
    platform.flowIssuesEnabled,
  );

  const { embedState } = useEmbedding();
  const currentProjectId = authenticationSession.getProjectId();
  const { checkAccess } = useAuthorization();

  if (isNil(currentProjectId) || currentProjectId === '') {
    localStorage.setItem('projectRoutePath', location.pathname);
    return <Navigate to="/sign-in" replace />;
  }
  const embedFilter = (link: SidebarLink) =>
    !embedState.isEmbedded || !!link.showInEmbed;
  const permissionFilter = (link: SidebarLink) =>
    isNil(link.hasPermission) || link.hasPermission;
  const links: SidebarLink[] = [
    {
      to: authenticationSession.appendProjectRoutePrefix('/flows'),
      label: t('Flows'),
      icon: Workflow,
      showInEmbed: true,
      hasPermission: checkAccess(Permission.READ_FLOW),
    },
    {
      to: authenticationSession.appendProjectRoutePrefix('/runs'),
      label: t('Runs'),
      icon: Logs,
      showInEmbed: true,
      hasPermission: checkAccess(Permission.READ_RUN),
    },
    {
      to: authenticationSession.appendProjectRoutePrefix('/issues'),
      label: t('Issues'),
      icon: AlertCircle,
      notification: showIssuesNotification,
      showInEmbed: false,
      hasPermission: checkAccess(Permission.READ_ISSUES),
    },
    {
      to: authenticationSession.appendProjectRoutePrefix('/connections'),
      label: t('Connections'),
      icon: Link2,
      showInEmbed: true,
      hasPermission: checkAccess(Permission.READ_APP_CONNECTION),
    },
    {
      to: authenticationSession.appendProjectRoutePrefix('/settings/general'),
      label: t('Settings'),
      icon: Wrench,
    },
  ]
    .filter(embedFilter)
    .filter(permissionFilter);
  return (
    <AllowOnlyLoggedInUserOnlyGuard>
      <Sidebar
        isHomeDashboard={true}
        links={links}
        hideSideNav={embedState.hideSideNav}
      >
        {children}
      </Sidebar>
    </AllowOnlyLoggedInUserOnlyGuard>
  );
}
