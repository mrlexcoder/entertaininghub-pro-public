export default function Settings() {
  const config = [
    { label: 'Backend URL',  value: 'http://localhost:8080' },
    { label: 'Frontend URL', value: 'http://localhost:3000'  },
    { label: 'Admin URL',    value: 'http://localhost:3001'  },
    { label: 'Database',     value: 'PostgreSQL 18'          },
    { label: 'Cache',        value: 'Redis 5'                },
    { label: 'Auth',         value: 'JWT + bcrypt'           },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-500 text-sm mt-0.5">Platform configuration</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <p className="text-sm font-semibold text-slate-700">API Configuration</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {config.map((s) => (
            <div key={s.label} className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg border border-slate-100">
              <span className="text-sm text-slate-500">{s.label}</span>
              <span className="text-sm text-slate-900 font-mono font-medium">{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <p className="text-sm font-semibold text-slate-700 mb-3">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {['Go 1.26', 'Gin', 'PostgreSQL 18', 'Redis 5', 'Lit 3', 'React 18', 'Tailwind CSS', 'Vite 5', 'JWT', 'Docker'].map((t) => (
            <span key={t} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-medium border border-indigo-100">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
