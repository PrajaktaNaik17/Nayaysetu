import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Button, AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Home, Chat as ChatIcon, Assessment } from '@mui/icons-material';
import { motion } from 'framer-motion';

const GlassAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: 'none',
}));

const NavButton = styled(Button)<{ active?: boolean }>(({ theme, active }) => ({
  color: active ? theme.palette.primary.light : 'rgba(255, 255, 255, 0.7)',
  padding: theme.spacing(1.5, 3),
  borderRadius: '12px',
  background: active ? 'rgba(255, 255, 255, 0.05)' : 'transparent',
  backdropFilter: active ? 'blur(10px)' : 'none',
  border: active ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.1)',
  },
}));

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/chat', label: 'Chat', icon: ChatIcon },
    { path: '/case-tracker', label: 'Case Tracker', icon: Assessment },
  ];

  return (
    <GlassAppBar position="sticky">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={motion.div}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            background: 'linear-gradient(45deg, #E5BEEC 30%, #917FB3 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 700,
          }}
        >
          NyaySetu
        </Typography>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{ display: 'flex', gap: 2 }}
        >
          {navItems.map((item) => (
            <NavButton
              key={item.path}
              active={location.pathname === item.path}
              onClick={() => navigate(item.path)}
              startIcon={<item.icon />}
            >
              {item.label}
            </NavButton>
          ))}
        </Box>
      </Toolbar>
    </GlassAppBar>
  );
};

export default Navigation; 