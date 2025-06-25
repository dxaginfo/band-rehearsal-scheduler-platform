import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Theme and layouts
import { theme } from './theme';
import Layout from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

// Authentication and account pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ProfilePage from './pages/account/ProfilePage';
import NotificationsPage from './pages/account/NotificationsPage';

// Dashboard and main functionality pages
import DashboardPage from './pages/dashboard/DashboardPage';
import MyGroupsPage from './pages/groups/MyGroupsPage';
import GroupDetailsPage from './pages/groups/GroupDetailsPage';
import CreateGroupPage from './pages/groups/CreateGroupPage';
import EditGroupPage from './pages/groups/EditGroupPage';

// Rehearsal management pages
import RehearsalCalendarPage from './pages/rehearsals/RehearsalCalendarPage';
import RehearsalDetailsPage from './pages/rehearsals/RehearsalDetailsPage';
import CreateRehearsalPage from './pages/rehearsals/CreateRehearsalPage';
import EditRehearsalPage from './pages/rehearsals/EditRehearsalPage';

// Availability management pages
import AvailabilitySettingsPage from './pages/availability/AvailabilitySettingsPage';

// Error and utility pages
import NotFoundPage from './pages/errors/NotFoundPage';
import TermsPage from './pages/info/TermsPage';
import PrivacyPage from './pages/info/PrivacyPage';
import HelpPage from './pages/info/HelpPage';

// Redux actions
import { checkAuthState } from './redux/slices/authSlice';
import { RootState } from './redux/store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  // Check authentication state on app load
  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  if (loading) {
    // Could add a loading spinner here
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
            } />
            <Route path="/register" element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
            } />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/help" element={<HelpPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                
                {/* Groups */}
                <Route path="/groups" element={<MyGroupsPage />} />
                <Route path="/groups/create" element={<CreateGroupPage />} />
                <Route path="/groups/:groupId" element={<GroupDetailsPage />} />
                <Route path="/groups/:groupId/edit" element={<EditGroupPage />} />
                
                {/* Rehearsals */}
                <Route path="/calendar" element={<RehearsalCalendarPage />} />
                <Route path="/rehearsals/create" element={<CreateRehearsalPage />} />
                <Route path="/rehearsals/:rehearsalId" element={<RehearsalDetailsPage />} />
                <Route path="/rehearsals/:rehearsalId/edit" element={<EditRehearsalPage />} />
                
                {/* Account */}
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/availability" element={<AvailabilitySettingsPage />} />
              </Route>
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;