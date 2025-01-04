import { useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange } from '../lib/auth';
import { useNavigate } from 'react-router-dom';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    // Get initial user state
    getCurrentUser()
      .then(user => {
        if (mounted) {
          setUser(user);
          setLoading(false);
        }
      })
      .catch(error => {
        if (mounted) {
          // Handle session errors by redirecting to auth
          if (error.name === 'AuthSessionMissingError') {
            navigate('/auth');
          }
          setLoading(false);
        }
      });

    // Subscribe to auth changes
    const subscription = onAuthStateChange(user => {
      if (mounted) {
        setUser(user);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate]);

  return { user, loading };
}