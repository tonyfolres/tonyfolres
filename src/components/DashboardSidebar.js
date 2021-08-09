import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  LogOut
} from 'react-feather';
import localUser from 'src/utils/localUser';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard',
    allowedUsers: ['admin']
  },
  {
    href: '/app/creators',
    icon: UsersIcon,
    title: 'Creators',
    allowedUsers: ['admin']
  },
  {
    href: '/app/appointments',
    icon: ShoppingBagIcon,
    title: 'Appointments',
    allowedUsers: ['admin', 'creator']
  },
  {
    href: '/login',
    icon: LogOut,
    title: 'Logout',
    onlyMobileView: true
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  const { firstName, lastName, userEmail, userType } = localUser.get();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const renderSideNav = (onMobileView) =>
    items.map((item) => {
      if (item.allowedUsers && !item.allowedUsers.includes(userType))
        return null;
      if (item.onlyMobileView && !onMobileView) return null;
      return (
        <NavItem
          href={item.href}
          key={item.title}
          title={item.title}
          icon={item.icon}
        />
      );
    });

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Typography color="textPrimary" variant="h5">
          {`${firstName} ${lastName}`}
        </Typography>
        <Typography color="textSecondary" variant="body1">
          {userEmail}
        </Typography>
        {userType && (
          <Typography color="textSecondary" variant="body2">
            Loged in as {userType.toUpperCase()}
          </Typography>
        )}
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>{renderSideNav(openMobile)}</List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          backgroundColor: 'background.default',
          m: 2,
          p: 2
        }}
      >
        <Typography align="center" gutterBottom variant="h4">
          SAM
        </Typography>
        <Typography align="center" variant="body2">
          Simple Appointment Manager
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
