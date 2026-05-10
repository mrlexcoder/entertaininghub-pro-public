export default function Settings() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Platform configuration</p>
      </div>
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-white">API Configuration</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          {[
            { label: 'Backend URL',   value: 'http://localhost:8080' },
            { label: 'Frontend URL',  value: 'http://localhost:3000' },
            { label: 'Admin URL',     value: 'http://localhost:3001' },
            { label: 'Database',      value: 'PostgreSQL 18' },
            { label: 'Cache',         value: 'Redis 5' },
            { label: 'Auth',          value: 'JWT + bcrypt' },
          ].map((s) => (
            <div key={s.label} className="flex justify-between items-center px-4 py-3 bg-gray-700 rounded-lg">
              <span className="text-gray-400">{s.label}</span>
              <span className="text-white font-mono text-xs">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
