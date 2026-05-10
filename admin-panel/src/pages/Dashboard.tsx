import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Health {
  status: string;
  services: { postgres: string; redis: string };
}

const StatCard = ({
  icon, label, value, sub, accent,
}: {
  icon: string; label: string; value: string | number; sub?: string; accent: string;
}) => (
  <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className={`inline-flex items-center justify-center w-11 h-11 rounded-xl text-xl mb-4 ${accent}`}>
      {icon}
    </div>
    <p className="text-2xl font-bold text-slate-900">{value}</p>
    <p className="text-sm font-medium text-slate-600 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
  </div>
);

const ServiceBadge = ({ label, ok }: { label: string; ok: boolean }) => (
  <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${
    ok
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : 'bg-red-50 text-red-600 border-red-200'
  }`}>
    <span className={`w-2 h-2 rounded-full ${ok ? 'bg-emerald-500' : 'bg-red-500'}`} />
    {label}
    <span className="font-semibold">{ok ? 'Online' : 'Offline'}</span>
  </div>
);

export default function Dashboard() {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/health')
      .then((r) => r.json())
      .then(setHealth)
      .catch(() => null);
  }, []);

  const pg    = health?.services?.postgres === 'healthy';
  const redis = health?.services?.redis    === 'healthy';
  const api   = health?.status             === 'healthy';

  return (
    <div className="space-y-6">

      {/* Page title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm mt-0.5">EntertainingHub Pro — Overview</p>
        </div>
        <Link
          to="/content/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition shadow-sm"
        >
          ➕ Add Content
        </Link>
      </div>

      {/* System status */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">System Status</p>
        <div className="flex flex-wrap gap-3">
          <ServiceBadge label="API Server"  ok={api}   />
          <ServiceBadge label="PostgreSQL"  ok={pg}    />
          <ServiceBadge label="Redis"       ok={redis} />
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon="🎬" label="Total Content"   value="0" sub="Movies, Series, Anime…" accent="bg-indigo-50" />
        <StatCard icon="👥" label="Registered Users" value="0" sub="Free & Premium"         accent="bg-pink-50"   />
        <StatCard icon="⭐" label="Reviews"          value="0" sub="User ratings"            accent="bg-amber-50"  />
        <StatCard icon="💰" label="Revenue (Month)"  value="$0" sub="Subscriptions"          accent="bg-emerald-50"/>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Quick actions */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-700 mb-4">Quick Actions</p>
          <div className="space-y-2">
            {[
              { to: '/content/new', icon: '➕', label: 'Add New Content'  },
              { to: '/users',       icon: '👥', label: 'Manage Users'     },
              { to: '/analytics',   icon: '📈', label: 'View Analytics'   },
            ].map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 text-slate-700 text-sm font-medium transition border border-slate-100 hover:border-indigo-200"
              >
                <span>{a.icon}</span>
                {a.label}
              </Link>
            ))}
          </div>
        </div>

        {/* API reference */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <p className="text-sm font-semibold text-slate-700 mb-4">Live API Endpoints</p>
          <div className="space-y-2 text-xs font-mono">
            {[
              { method: 'GET',  path: '/api/health',           ok: true  },
              { method: 'POST', path: '/api/auth/login',       ok: true  },
              { method: 'GET',  path: '/api/content',          ok: true  },
              { method: 'GET',  path: '/api/content/trending', ok: true  },
            ].map((e) => (
              <div key={e.path} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
                <span className={`font-bold text-xs px-1.5 py-0.5 rounded ${
                  e.method === 'GET'  ? 'bg-emerald-100 text-emerald-700' :
                  e.method === 'POST' ? 'bg-blue-100 text-blue-700'       :
                                        'bg-red-100 text-red-700'
                }`}>
                  {e.method}
                </span>
                <span className="text-slate-600">{e.path}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
