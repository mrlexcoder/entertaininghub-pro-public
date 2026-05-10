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
  created_at: string;
}

const TYPE_COLORS: Record<string, string> = {
  movie:       'bg-blue-900/40 text-blue-400',
  series:      'bg-purple-900/40 text-purple-400',
  anime:       'bg-pink-900/40 text-pink-400',
  documentary: 'bg-yellow-900/40 text-yellow-400',
  gaming:      'bg-green-900/40 text-green-400',
  '18plus':    'bg-red-900/40 text-red-400',
};

export default function ContentList() {
  const token = useAppSelector((s) => s.auth.token);
  const [items, setItems] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchContent = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/content?page=1&page_size=50`, {
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Content</h1>
          <p className="text-gray-400 text-sm mt-1">{items.length} items total</p>
        </div>
        <Link
          to="/content/new"
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition"
        >
          ➕ Add Content
        </Link>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Search content..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-sm px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
      />

      {/* Table */}
      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-700 text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-5 py-4 text-left">Title</th>
              <th className="px-5 py-4 text-left">Type</th>
              <th className="px-5 py-4 text-left">Year</th>
              <th className="px-5 py-4 text-left">Rating</th>
              <th className="px-5 py-4 text-left">Views</th>
              <th className="px-5 py-4 text-left">Status</th>
              <th className="px-5 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {loading ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-500">Loading...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={7} className="px-5 py-10 text-center text-gray-500">No content yet. <Link to="/content/new" className="text-primary-400 hover:underline">Add some →</Link></td></tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-gray-750 transition">
                  <td className="px-5 py-4 text-white font-medium">{item.title}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${TYPE_COLORS[item.content_type] ?? 'bg-gray-700 text-gray-300'}`}>
                      {item.content_type}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{item.release_year || '—'}</td>
                  <td className="px-5 py-4 text-yellow-400">{item.imdb_rating ? `⭐ ${item.imdb_rating}` : '—'}</td>
                  <td className="px-5 py-4 text-gray-400">{item.views_count.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${item.is_published ? 'bg-green-900/40 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <Link to={`/content/edit/${item.id}`} className="text-primary-400 hover:text-primary-300 text-xs">Edit</Link>
                      <button onClick={() => handleDelete(item.id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
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
