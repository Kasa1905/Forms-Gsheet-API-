import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { FormBuilder } from './pages/FormBuilder';
import { FormResponses } from './pages/FormResponses';
import { Auth } from './pages/Auth';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="forms/new" element={<FormBuilder />} />
            <Route path="forms/:id/edit" element={<FormBuilder />} />
            <Route path="forms/:id/responses" element={<FormResponses />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;