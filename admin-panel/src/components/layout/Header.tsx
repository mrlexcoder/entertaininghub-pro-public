import { useAppSelector } from '../../hooks/useRedux';

export default function Header() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shadow-sm">
      <div className="text-slate-500 text-sm">
        Welcome back,{' '}
        <span className="text-slate-900 font-semibold">{user?.username ?? 'Admin'}</span>
      </div>

      <div className="flex items-center gap-3">
        {/* Live badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
          {user?.username?.charAt(0).toUpperCase() ?? 'A'}
        </div>
      </div>
    </header>
  );
}
