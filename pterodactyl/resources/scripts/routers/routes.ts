import React, { lazy } from 'react';
import ServerConsole from '@/components/server/console/ServerConsoleContainer';
import DatabasesContainer from '@/components/server/databases/DatabasesContainer';
import ScheduleContainer from '@/components/server/schedules/ScheduleContainer';
import UsersContainer from '@/components/server/users/UsersContainer';
import BackupContainer from '@/components/server/backups/BackupContainer';
import NetworkContainer from '@/components/server/network/NetworkContainer';
import StartupContainer from '@/components/server/startup/StartupContainer';
import FileManagerContainer from '@/components/server/files/FileManagerContainer';
import SettingsContainer from '@/components/server/settings/SettingsContainer';
import AccountOverviewContainer from '@/components/dashboard/AccountOverviewContainer';
import AccountApiContainer from '@/components/dashboard/AccountApiContainer';
import AccountSSHContainer from '@/components/dashboard/ssh/AccountSSHContainer';
import ActivityLogContainer from '@/components/dashboard/activity/ActivityLogContainer';
import ServerActivityLogContainer from '@/components/server/ServerActivityLogContainer';
import * as Lang from '@/lang';
import * as Icon from 'react-feather';

// Each of the router files is already code split out appropriately — so
// all of the items above will only be loaded in when that router is loaded.
//
// These specific lazy loaded routes are to avoid loading in heavy screens
// for the server dashboard when they're only needed for specific instances.
const FileEditContainer = lazy(() => import('@/components/server/files/FileEditContainer'));
const ScheduleEditContainer = lazy(() => import('@/components/server/schedules/ScheduleEditContainer'));

interface RouteDefinition {
  path: string;
  // If undefined is passed this route is still rendered into the router itself
  // but no navigation link is displayed in the sub-navigation menu.
  name: string | undefined;
  component: React.ComponentType;
  icon?: React.ComponentType;
  exact?: boolean;
}

interface ServerRouteDefinition extends RouteDefinition {
  permission: string | string[] | null;
  nestId?: number;
  eggId?: number;
  nestIds?: number[];
  eggIds?: number[];
}

interface Routes {
  // All of the routes available under "/account"
  account: RouteDefinition[];
  // All of the routes available under "/server/:id"
  server: ServerRouteDefinition[];
}

export default {
  account: [
    {
      path: '/',
      name: Lang.Settings,
      icon: Icon.User,
      component: AccountOverviewContainer,
      exact: true,
    },
    {
      path: '/api',
      name: Lang.Apicredentials,
      icon: Icon.Code,
      component: AccountApiContainer,
    },
    {
      path: '/ssh',
      name: Lang.SSHkey,
      icon: Icon.Key,
      component: AccountSSHContainer,
    },
    {
      path: '/activity',
      name: Lang.Activity,
      icon: Icon.Eye,
      component: ActivityLogContainer,
    },
  ],
  server: [
    {
      path: '/',
      permission: null,
      name: Lang.Console,
      icon: Icon.Terminal,
      component: ServerConsole,
      exact: true,
    },
    {
      path: '/files',
      permission: 'file.*',
      name: Lang.Filemanager,
      icon: Icon.Folder,
      component: FileManagerContainer,
    },
    {
      path: '/files/:action(edit|new)',
      permission: 'file.*',
      name: undefined,
      component: FileEditContainer,
    },
    {
      path: '/databases',
      permission: 'database.*',
      name: Lang.Databases,
      icon: Icon.Database,
      component: DatabasesContainer,
    },
    {
      path: '/schedules',
      permission: 'schedule.*',
      name: Lang.Schedules,
      icon: Icon.Calendar,
      component: ScheduleContainer,
    },
    {
      path: '/schedules/:id',
      permission: 'schedule.*',
      name: undefined,
      component: ScheduleEditContainer,
    },
    {
      path: '/users',
      permission: 'user.*',
      name: Lang.Users,
      icon: Icon.Users,
      component: UsersContainer,
    },
    {
      path: '/backups',
      permission: 'backup.*',
      name: Lang.Backups,
      icon: Icon.Save,
      component: BackupContainer,
    },
    {
      path: '/network',
      permission: 'allocation.*',
      name: Lang.Network,
      icon: Icon.Globe,
      component: NetworkContainer,
    },
    {
      path: '/startup',
      permission: 'startup.*',
      name: Lang.Startup,
      icon: Icon.Sliders,
      component: StartupContainer,
    },
    {
      path: '/settings',
      permission: ['settings.*', 'file.sftp'],
      name: Lang.Settings,
      icon: Icon.Settings,
      component: SettingsContainer,
    },
    {
      path: '/activity',
      permission: 'activity.*',
      name: Lang.Activity,
      icon: Icon.Eye,
      component: ServerActivityLogContainer,
    },
  ],
} as Routes;

