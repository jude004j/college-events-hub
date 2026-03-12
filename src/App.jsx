import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicSite from './PublicSite';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ManageEvents from './admin/ManageEvents';
import EventForm from './admin/EventForm';
import ManageGallery from './admin/ManageGallery';
import GalleryPage from './pages/Gallery';

function App() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState(null);

  React.useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      // For now, we assume token is valid. In production, verify with backend.
      setIsAdminAuthenticated(true);
      setAdminUser('Admin'); // Fallback or decode JWT to get email
    }
  }, []);

  const handleAdminLogin = (data) => {
    setIsAdminAuthenticated(true);
    setAdminUser(data.email);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAdminAuthenticated(false);
    setAdminUser(null);
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<PublicSite />} />
        <Route path="/gallery" element={<GalleryPage />} />

        {/* Admin Login Route */}
        <Route
          path="/admin"
          element={
            isAdminAuthenticated ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <AdminLogin onLogin={handleAdminLogin} />
            )
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            isAdminAuthenticated ? (
              <AdminLayout user={adminUser} onLogout={handleAdminLogout}>
                <AdminDashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        <Route
          path="/admin/manage-events"
          element={
            isAdminAuthenticated ? (
              <AdminLayout user={adminUser} onLogout={handleAdminLogout}>
                <ManageEvents />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        <Route
          path="/admin/add-event"
          element={
            isAdminAuthenticated ? (
              <AdminLayout user={adminUser} onLogout={handleAdminLogout}>
                <EventForm />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        <Route
          path="/admin/edit-event/:id"
          element={
            isAdminAuthenticated ? (
              <AdminLayout user={adminUser} onLogout={handleAdminLogout}>
                <EventForm isEdit={true} />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        <Route
          path="/admin/gallery"
          element={
            isAdminAuthenticated ? (
              <AdminLayout user={adminUser} onLogout={handleAdminLogout}>
                <ManageGallery />
              </AdminLayout>
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        />

        {/* Catch-all to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
