import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

interface Content {
  id: string;
  title: string;
  content_type: string;
  imdb_rating: number;
  views_count: number;
  is_published: boolean;
  release_year: number;
}

const TYPE_BADGE: Record<string, string> = {
  movie:       'bg-blue-100 text-blue-700',
  series:      'bg-violet-100 text-violet-700',
  anime:       'bg-pink-100 text-pink-700',
  documentary: 'bg-amber-100 text-amber-700',
  gaming:      'bg-emerald-100 text-emerald-700',
  '18plus':    'bg-red-100 text-red-700',
};

export default function ContentList() {
  const token = useAppSelector((s) => s.auth.token);
  const [items, setItems]   = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API}/content?page=1&page_size=50`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setItems(data.data ?? []);
    } catch {
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchContent(); }, []);

  const filtered = items.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this content?')) return;
    try {
      await fetch(`${API}/admin/content/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Deleted');
      fetchContent();
    } catch {
      toast.error('Delete failed');
    }
  };

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Content</h1>
          <p className="text-slate-500 text-sm mt-0.5">{items.length} items total</p>
        </div>
        <Link
          to="/content/new"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition shadow-sm"
        >
          ➕ Add Content
        </Link>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Search content…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      />

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr className="text-slate-500 text-xs uppercase tracking-wider">
              <th className="px-5 py-3.5 text-left font-semibold">Title</th>
              <th className="px-5 py-3.5 text-left font-semibold">Type</th>
              <th className="px-5 py-3.5 text-left font-semibold">Year</th>
              <th className="px-5 py-3.5 text-left font-semibold">Rating</th>
              <th className="px-5 py-3.5 text-left font-semibold">Views</th>
              <th className="px-5 py-3.5 text-left font-semibold">Status</th>
              <th className="px-5 py-3.5 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                    Loading…
                  </div>
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                  No content yet.{' '}
                  <Link to="/content/new" className="text-indigo-600 hover:underline font-medium">
                    Add some →
                  </Link>
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4 text-slate-900 font-medium">{item.title}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${TYPE_BADGE[item.content_type] ?? 'bg-slate-100 text-slate-600'}`}>
                      {item.content_type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500">{item.release_year || '—'}</td>
                  <td className="px-5 py-4 text-amber-600 font-medium">
                    {item.imdb_rating ? `⭐ ${item.imdb_rating}` : '—'}
                  </td>
                  <td className="px-5 py-4 text-slate-500">{item.views_count.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      item.is_published
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Link to={`/content/edit/${item.id}`} className="text-indigo-600 hover:text-indigo-800 text-xs font-medium">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 text-xs font-medium">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
