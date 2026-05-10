import { useState } from 'react';
import { useAppDispatch } from '../hooks/useRedux';
import { setCredentials } from '../store/slices/authSlice';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export default function Login() {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success && data.data?.user?.is_admin) {
        dispatch(setCredentials({ user: data.data.user, token: data.data.token }));
        toast.success('Welcome back!');
      } else if (data.success && !data.data?.user?.is_admin) {
        toast.error('Admin access required');
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch {
      toast.error('Connection failed — is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white font-heading">🎬 EntertainingHub</h1>
          <p className="text-gray-400 mt-2">Admin Dashboard</p>
        </div>

        {/* Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-semibold text-white mb-6">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="admin@entertainingzen.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white font-semibold rounded-lg transition duration-200"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-gray-500 text-sm text-center mt-6">
            Backend: <span className="text-primary-400">http://localhost:8080</span>
          </p>
        </div>
      </div>
    </div>
  );
}
