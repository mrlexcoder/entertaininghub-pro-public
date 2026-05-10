import { useAppSelector } from '../../hooks/useRedux';

export default function Header() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <header className="h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-6">
      <div className="text-gray-400 text-sm">
        Welcome back, <span className="text-white font-medium">{user?.username ?? 'Admin'}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-900/40 text-green-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          Live
        </span>
        <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm">
          {user?.username?.charAt(0).toUpperCase() ?? 'A'}
        </div>
      </div>
    </header>
  );
}
