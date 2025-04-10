import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme';
import MainLayout from './components/layout/MainLayout';

// Lazy load pages for better performance
const ChatPage = React.lazy(() => import('./pages/Chat/index'));
const LawyersPage = React.lazy(() => import('./pages/Lawyers/index'));
const SettingsPage = React.lazy(() => import('./pages/Settings/index'));

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route element={<MainLayout />}>
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/lawyers" element={<LawyersPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App; 