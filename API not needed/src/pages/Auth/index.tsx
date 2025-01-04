import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bird as FalconIcon } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { signIn, signUp } from '../../lib/auth';
import { validatePassword } from '../../lib/validation';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/';

  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    // Validate password before submission
    if (isSignUp) {
      const passwordError = validatePassword(password);
      if (passwordError) {
        setError(passwordError);
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignUp) {
        await signUp(email, password);
        // Show success message and switch to sign in
        setError('Account created! Please sign in to continue.');
        setIsSignUp(false);
      } else {
        await signIn(email, password);
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <FalconIcon className="h-12 w-12 text-amber-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8">
          {isSignUp ? 'Create your account' : 'Sign in to FalconForms'}
        </h2>
        
        {error && (
          <div className={`mb-4 p-4 rounded-lg ${
            error.includes('created') 
              ? 'bg-green-900/50 border border-green-500 text-green-200'
              : 'bg-red-900/50 border border-red-500 text-red-200'
          }`}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-amber-500"
              required
              minLength={6}
            />
            {isSignUp && (
              <p className="mt-1 text-sm text-gray-400">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          <Button className="w-full" disabled={loading}>
            {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </Button>
        </form>

        <p className="mt-4 text-center text-gray-400">
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(undefined);
            }}
            className="text-amber-500 hover:text-amber-400"
          >
            {isSignUp ? 'Sign in' : 'Create one'}
          </button>
        </p>
      </div>
    </div>
  );
};