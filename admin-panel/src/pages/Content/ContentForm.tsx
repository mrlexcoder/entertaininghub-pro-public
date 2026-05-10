import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const CONTENT_TYPES = ['movie', 'series', 'documentary', 'anime', 'gaming', '18plus'];
const MATURITY      = ['U', 'UA', 'A', '18+'];

const inputCls =
  'w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-sm';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
    {children}
  </div>
);

export default function ContentForm() {
  const token    = useAppSelector((s) => s.auth.token);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '', description: '', content_type: 'movie',
    release_year: new Date().getFullYear(), duration_minutes: 0,
    poster_url: '', trailer_url: '', maturity_rating: 'UA',
    imdb_rating: 0, genre: '', language: 'English', synopsis: '',
  });

  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        genre:            form.genre.split(',').map((g) => g.trim()).filter(Boolean),
        language:         [form.language],
        imdb_rating:      Number(form.imdb_rating),
        release_year:     Number(form.release_year),
        duration_minutes: Number(form.duration_minutes),
      };
      const res  = await fetch(`${API}/admin/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) { toast.success('Content created!'); navigate('/content'); }
      else               { toast.error(data.error || 'Failed to create'); }
    } catch {
      toast.error('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add New Content</h1>
        <p className="text-slate-500 text-sm mt-0.5">Fill in the details below</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-5">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Title *">
            <input className={inputCls} value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="e.g. Inception" required />
          </Field>

          <Field label="Content Type *">
            <select className={inputCls} value={form.content_type} onChange={(e) => set('content_type', e.target.value)}>
              {CONTENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>

          <Field label="Release Year">
            <input type="number" className={inputCls} value={form.release_year} onChange={(e) => set('release_year', e.target.value)} min={1900} max={2030} />
          </Field>

          <Field label="Duration (minutes)">
            <input type="number" className={inputCls} value={form.duration_minutes} onChange={(e) => set('duration_minutes', e.target.value)} min={0} />
          </Field>

          <Field label="IMDb Rating (0–10)">
            <input type="number" className={inputCls} value={form.imdb_rating} onChange={(e) => set('imdb_rating', e.target.value)} min={0} max={10} step={0.1} />
          </Field>

          <Field label="Maturity Rating">
            <select className={inputCls} value={form.maturity_rating} onChange={(e) => set('maturity_rating', e.target.value)}>
              {MATURITY.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Field>

          <Field label="Genre (comma separated)">
            <input className={inputCls} value={form.genre} onChange={(e) => set('genre', e.target.value)} placeholder="Action, Thriller, Sci-Fi" />
          </Field>

          <Field label="Language">
            <input className={inputCls} value={form.language} onChange={(e) => set('language', e.target.value)} placeholder="English" />
          </Field>

          <Field label="Poster URL">
            <input className={inputCls} value={form.poster_url} onChange={(e) => set('poster_url', e.target.value)} placeholder="https://…" />
          </Field>

          <Field label="Trailer URL">
            <input className={inputCls} value={form.trailer_url} onChange={(e) => set('trailer_url', e.target.value)} placeholder="https://youtube.com/…" />
          </Field>
        </div>

        <Field label="Description">
          <textarea className={`${inputCls} h-24 resize-none`} value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Short description…" />
        </Field>

        <Field label="Synopsis">
          <textarea className={`${inputCls} h-32 resize-none`} value={form.synopsis} onChange={(e) => set('synopsis', e.target.value)} placeholder="Full synopsis…" />
        </Field>

        <div className="flex gap-3 pt-2 border-t border-slate-100">
          <button type="submit" disabled={loading}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium rounded-lg transition shadow-sm text-sm">
            {loading ? 'Creating…' : 'Create Content'}
          </button>
          <button type="button" onClick={() => navigate('/content')}
            className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition text-sm">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
