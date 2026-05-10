import { useEffect, useState } from 'react';

interface Stats {
  status: string;
  services: { postgres: string; redis: string };
}

const StatCard = ({ icon, label, value, color }: { icon: string; label: string; value: string | number; color: string }) => (
  <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
    <div className={`text-3xl mb-3`}>{icon}</div>
    <p className="text-gray-400 text-sm">{label}</p>
    <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
  </div>
);

export default function Dashboard() {
  const [health, setHealth] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/health')
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => null);
  }, []);

  return (
    <div className="space-y-6">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">EntertainingHub Pro — Overview</p>
      </div>

      {/* System status */}
      <div className="bg-gray-800 rounded-xl p-5 border border-gray-700">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">System Status</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'API Server',  value: health?.status === 'healthy' ? '✅ Online' : '⏳ Checking...', ok: health?.status === 'healthy' },
            { label: 'PostgreSQL',  value: health?.services?.postgres === 'healthy' ? '✅ Connected' : '❌ Offline', ok: health?.services?.postgres === 'healthy' },
            { label: 'Redis',       value: health?.services?.redis === 'healthy' ? '✅ Connected' : '❌ Offline', ok: health?.services?.redis === 'healthy' },
          ].map((s) => (
            <div key={s.label} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${s.ok ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
              {s.label}: {s.value}
            </div>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎬" label="Total Content"    value="0"   color="text-primary-400" />
        <StatCard icon="👥" label="Total Users"      value="0"   color="text-secondary-400" />
        <StatCard icon="⭐" label="Reviews"          value="0"   color="text-yellow-400" />
        <StatCard icon="💰" label="Revenue (Month)"  value="$0"  color="text-green-400" />
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { href: '/content/new', label: '➕ Add New Content' },
              { href: '/users',       label: '👥 Manage Users'    },
              { href: '/analytics',   label: '📈 View Analytics'  },
            ].map((a) => (
              <a key={a.href} href={a.href} className="flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm transition">
                {a.label}
              </a>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">API Endpoints</h2>
          <div className="space-y-2 text-sm font-mono">
            {[
              { method: 'GET',  path: '/api/health',   color: 'text-green-400' },
              { method: 'POST', path: '/api/auth/login', color: 'text-blue-400' },
              { method: 'GET',  path: '/api/content',  color: 'text-green-400' },
              { method: 'GET',  path: '/api/content/trending', color: 'text-green-400' },
            ].map((e) => (
              <div key={e.path} className="flex items-center gap-3 px-3 py-2 rounded bg-gray-700">
                <span className={`font-bold text-xs ${e.color}`}>{e.method}</span>
                <span className="text-gray-300">{e.path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
