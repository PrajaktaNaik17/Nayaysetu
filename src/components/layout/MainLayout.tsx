import React from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography, useTheme, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Chat, Group, Settings, Menu } from '@mui/icons-material';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const DRAWER_WIDTH = 280;

const GlassDrawer = styled(Drawer)(({ theme }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: DRAWER_WIDTH,
    boxSizing: 'border-box',
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  },
}));

const MenuButton = styled(IconButton)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: '8px 16px',
  borderRadius: '12px',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
  },
}));

const Logo = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #E5BEEC 30%, #917FB3 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '1.8rem',
  letterSpacing: '-0.02em',
  marginBottom: theme.spacing(4),
}));

interface MainLayoutProps {
  children?: React.ReactNode;
}

interface NavItemProps {
  active: boolean;
  onClick: () => void;
  icon: React.ElementType;
  text: string;
}

const NavItem: React.FC<NavItemProps> = ({ active, onClick, icon: Icon, text }) => {
  return (
    <StyledListItemButton
      onClick={onClick}
      sx={{
        background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
        backdropFilter: active ? 'blur(10px)' : 'none',
        border: active ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      }}
    >
      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
        <Icon />
      </ListItemIcon>
      <ListItemText
        primary={text}
        primaryTypographyProps={{
          sx: { fontWeight: active ? 600 : 400 }
        }}
      />
    </StyledListItemButton>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const menuItems = [
    { text: 'Chat Assistant', icon: Chat, path: '/chat' },
    { text: 'Find Lawyers', icon: Group, path: '/lawyers' },
    { text: 'Settings', icon: Settings, path: '/settings' },
  ];

  const drawer = (
    <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo variant="h1">NyaySetu</Logo>
      </motion.div>

      <List sx={{ flex: 1 }}>
        {menuItems.map((item, index) => (
          <motion.div
            key={item.text}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <NavItem
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              icon={item.icon}
              text={item.text}
            />
          </motion.div>
        ))}
      </List>

      <Box
        sx={{
          p: 2,
          borderRadius: 2,
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © 2024 NyaySetu
          <br />
          Legal Assistant Platform
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
      >
        {/* Mobile drawer */}
        <GlassDrawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', sm: 'none' } }}
        >
          {drawer}
        </GlassDrawer>

        {/* Desktop drawer */}
        <GlassDrawer
          variant="permanent"
          sx={{ display: { xs: 'none', sm: 'block' } }}
          open
        >
          {drawer}
        </GlassDrawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
        }}
      >
        <Box sx={{ display: { sm: 'none' }, mb: 2 }}>
          <MenuButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <Menu />
          </MenuButton>
        </Box>
        {children || <Outlet />}
      </Box>
    </Box>
  );
};

export default MainLayout; 