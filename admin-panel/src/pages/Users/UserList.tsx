export default function UserList() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Users</h1>
        <p className="text-slate-500 text-sm mt-0.5">Manage platform users</p>
      </div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-100 text-3xl mb-4">👥</div>
        <p className="text-lg font-semibold text-slate-700">User management coming soon</p>
        <p className="text-sm text-slate-400 mt-1">Register users via the API to see them here</p>
      </div>
    </div>
  );
}
